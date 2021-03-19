import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private _apiService: ApiService;
  private _lastUpdateSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private _updateStatusSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  private _utcStart: Date = new Date(Date.UTC(0, 0, 0, 0, 0, 0));
  private _lastUpdate: Date;
  private _lastUpdateLocal: Date;
  private _updating: boolean;

  constructor(apiService: ApiService) { 
    this._apiService = apiService;

    this.refreshLastUpdate();
  }

  lastUpdate(): Observable<string> {
    return this._lastUpdateSubject.asObservable();
  }

  updateStatus(): Observable<string> {
    return this._updateStatusSubject.asObservable();
  }

  update(): void {
    if (this._updating) {
      return;
    }

    this._updating = true;
    this._updateStatusSubject.next('Updating...');
    this.fetchPage(1, 50, this._lastUpdate);
  }

  updateEverything(): void {
    if (this._updating) {
      return;
    }

    this._updateStatusSubject.next('Updating...');
    this.fetchPage(1, 50, this._utcStart);
  }

  private fetchPage(pageNumber: number, pageSize: number, until: Date) : void {
    this._apiService.getActivities(pageNumber, pageSize).subscribe(activities => {
      let finished = (activities.length == 0);
      let updatedCount = pageSize * (pageNumber - 1);
      
      activities.forEach(activity => {
        if (activity.date <= until) {
          finished = true;
        }
        else {
          if (activity.date >= this._lastUpdate || this._lastUpdate == null) {
            this._lastUpdate = activity.date;
            this._lastUpdateLocal = activity.localDate;
          }
          updatedCount++;         
          this._updateStatusSubject.next(updatedCount + ' activities updated');
          this._apiService.postActivity(activity).subscribe();
        }
      });

      if (!finished) {
        this.fetchPage(pageNumber + 1, pageSize, until);
      }
      else {
        this._updateStatusSubject.next(`Updating finished.`);
        this._apiService.postUpdateDate(this._lastUpdate, this._lastUpdateLocal).subscribe(_ => this.refreshLastUpdate());
        this._updating = false;
      }
    })
  }

  private refreshLastUpdate(): void {
    this._apiService.lastUpdate().subscribe(
      update => {
        this._lastUpdate = new Date(update[0]);
        this._lastUpdateLocal = new Date(update[1]);

        // this value means user did not update yet
        if (this._lastUpdateLocal.toString() === '01/01/0001 00:00:00') {
          this._lastUpdateSubject.next('Never');
        }
        else {
          this._lastUpdateSubject.next(`${this._lastUpdateLocal.toLocaleDateString()}, ${this._lastUpdateLocal.toLocaleTimeString()}`);
        }
      }
    )
  }
}
