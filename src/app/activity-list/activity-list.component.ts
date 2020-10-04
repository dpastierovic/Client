import { Component, OnInit, ViewChild } from '@angular/core';
import { parse } from 'querystring';
import { StravaApiService } from '../services/strava-api.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  @ViewChild('goToInput', {static: false}) goToInput;
  activityCount;
  activities;
  pageCurrent
  pageCount
  pageSize = 10
  goToNumber = 1

  constructor(private api: StravaApiService) { }

  ngOnInit() {
    this.api.getStats().subscribe(_ => {
      this.activityCount = _['all_ride_totals']['count']
      this.pageCount = Math.round(parseInt(this.activityCount) / this.pageSize)
      this.pageCurrent = 1
    })
    this.api.getActivities(1, this.pageSize).subscribe(_ => this.activities = _)
  }

  onRenameClicked(item):void{
    console.log(item)
  }

  onPageChanged(pageNumber: number){

    if (pageNumber < 1) pageNumber = 1
    if (pageNumber > this.pageCount) pageNumber = this.pageCount

    console.log(pageNumber)
    this.api.getActivities(pageNumber, this.pageSize).subscribe(_ => {
      this.activities = _
      this.pageCurrent = pageNumber
    })
  }

  onKey(event){
    console.log(event)
    this.goToNumber = event.target.value
  }

  navigateToPage() {
    this.onPageChanged(this.goToNumber)
  }
}