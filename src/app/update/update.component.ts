import { Component, Injectable, OnInit } from '@angular/core';
import { UpdateService } from './update-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class UpdateComponent implements OnInit {

  private _updateService: UpdateService;

  constructor(updateService: UpdateService) {
    this._updateService = updateService;
  }

  private _lastUpdate: string = "";
  get lastUpdate(): string {
    return this._lastUpdate;
  }

  private _updateStatus: string = "";
  get updateStatus(): string {
    return this._updateStatus;
  }

  ngOnInit() {
    this._updateService.lastUpdate().subscribe(update => this._lastUpdate = update);
    this._updateService.updateStatus().subscribe(status => this._updateStatus = status);
  }

  onUpdateClick(): void {
    this._updateService.update();
  }

  onUpdateEverythingClick(): void {
    this._updateService.updateEverything();
  }
}
