import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.scss']
})
export class MarkersComponent implements OnInit {
  
  private markersCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)  
  markersCountObservable = this.markersCountSubject.asObservable();
  pageSize: number = 10

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getMarkers().subscribe(_ => console.log(_))
  }
}