import { HttpRequest } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { StravaApiService } from '../services/strava-api.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  @ViewChild('goToInput', {static: false}) goToInput;

  private activityCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)  
  activityCountObservable = this.activityCountSubject.asObservable();
  pageSize: number = 10
  pageCurrent: number = 1
  currentPage: BehaviorSubject<number> =  new BehaviorSubject<number>(1)
  activities
  pageRequest: Subscription

  constructor(private api: StravaApiService) { }

  ngOnInit() {
    this.api.getStats().subscribe(_ =>  this.activityCountSubject.next(_['all_ride_totals']['count']))
    this.pageRequest = this.api.getActivities(1, this.pageSize).subscribe(_ => this.activities = _)
    this.currentPage.subscribe(_ => this.loadPage(_))
  }

  onRenameClicked(item):void{
    console.log(item)
  }

  loadPage(pageNumber: number): void {
    if(this.pageRequest != undefined) this.pageRequest.unsubscribe()

    this.pageRequest = this.api.getActivities(pageNumber, this.pageSize).subscribe(_ => {
      this.activities = _
      this.pageCurrent = pageNumber
    })
  }
}