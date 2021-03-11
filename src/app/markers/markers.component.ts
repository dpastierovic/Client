import { Component, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { BehaviorSubject } from 'rxjs';
import { Marker } from '../entities/marker';
import { MapComponent } from '../mapComponents/map/map.component';
import { MarkerService } from '../services/marker.service';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.scss']
})
export class MarkersComponent implements OnInit {
  @ViewChild(MapComponent, { static: false }) map: MapComponent

  private markersCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private allMarkers: Marker[] = new Array<Marker>()
  markersCountObservable = this.markersCountSubject.asObservable();
  currentPage: BehaviorSubject<number> =  new BehaviorSubject<number>(1)
  pageSize: number = 10
  markers: Marker[]
  pageCurrent: number = 1

  constructor(private markersService: MarkerService) {
  }

  ngOnInit() {
    this.currentPage.subscribe(pageNumber => {
      this.pageCurrent = pageNumber
      this.markers = this.allMarkers.slice((this.pageCurrent - 1) * this.pageSize, this.pageCurrent * this.pageSize)
    })
    this.markersService.markersObservable.subscribe(markers => {
      console.log(markers)
      this.allMarkers = markers;
      this.markersCountSubject.next(this.allMarkers.length)
      this.markers = this.allMarkers.slice((this.pageCurrent - 1) * this.pageSize, this.pageCurrent * this.pageSize)
    })
  }

  public addMarker(): void {
    let coordinates = this.map.getCenter();
    this.markersService.addMarker(coordinates.lat, coordinates.lng, 500, 'Undefined');
  }

  public modifyMarker(marker: Marker): void {
    marker.enableModifications();
  }

  public lockMarker(marker: Marker): void {
    marker.disableModifications();
  }

  public discardMarker(marker: Marker): void {
    marker.discard();
  }

  public removeMarker(marker: Marker): void {
    this.markersService.removeMarker(marker);
  }
}