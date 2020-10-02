import { Component, OnInit } from '@angular/core';
import { accessToken } from 'mapbox-gl';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  activities: number[] = [1, 2, 3];

  constructor() { }

  ngOnInit() {
  }

}
