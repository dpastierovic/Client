import { Component, Injectable, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class UpdateComponent implements OnInit {

  private _apiService: ApiService;

  constructor(apiService: ApiService) {
    this._apiService = apiService;
  }

  private _lastUpdate: string = "";
  get lastUpdate(): string {
    return this._lastUpdate;
  }

  ngOnInit() {
    this.checkLastUpdate();
  }

  onClick(){
    console.log('hint button clicked');
  }

  private checkLastUpdate(): void {
    this._apiService.lastUpdate().subscribe(
      update => {
        console.log(update);
        // this value means user did not update yet
        if (update.toString() === '01/01/0001 00:00:00'){
          this._lastUpdate = 'Never';
        }
        else {
          this._lastUpdate = update.toString();
        }
      }
    )
  }
}
