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
    let lastUpdateDate: Date;

    if (this._lastUpdateSubject.value === 'Never') {
      lastUpdateDate = this._utcStart;
    }
    else {
      lastUpdateDate = new Date(this._lastUpdateSubject.value);
    }

    this._updateStatusSubject.next('Updating...');
    this.fetchPage(1, 50, lastUpdateDate);
  }

  updateEverything(): void {
    this._updateStatusSubject.next('Updating...');
    this.fetchPage(1, 50, this._utcStart);
  }

  private fetchPage(pageNumber: number, pageSize: number, until: Date) : void {
    this._apiService.getActivities(pageNumber, pageSize).subscribe(activities => {
      let finished = (activities.length == 0);

      activities.forEach(activity => {
        if (activity.date < until) {
          finished = true;
        }
        else {
          this._apiService.postActivity(activity).subscribe();
        }
      });
      
      if (!finished) {
        this.fetchPage(pageNumber + 1, pageSize, until);
        this._updateStatusSubject.next(pageNumber * pageSize + ' activities updated');
      }
      else {
        this._updateStatusSubject.next('Updating finished.');
      }
    })
  }

  private refreshLastUpdate(): void {
    this._apiService.lastUpdate().subscribe(
      update => {
        // this value means user did not update yet
        if (update.toString() === '01/01/0001 00:00:00') {
          this._lastUpdateSubject.next('Never');
        }
        else {
          this._lastUpdateSubject.next(update.toString());
        }
      }
    )
  }
}
