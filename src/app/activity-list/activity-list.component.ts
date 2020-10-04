import { Component, OnInit } from '@angular/core';
import { StravaApiService } from '../services/strava-api.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  activities: number[] = [1, 2, 3];

  constructor(private api: StravaApiService) { }

  ngOnInit() {
    this.api.getStats().subscribe(_ => console.log(_))
  }
}