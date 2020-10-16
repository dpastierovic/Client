import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marker } from '../entities/marker';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private markers: Marker[] = new Array<Marker>();
  private markersSubject: BehaviorSubject<Marker[]> = new BehaviorSubject<Marker[]>(this.markers);
  private addedMarkersSubject: BehaviorSubject<Marker> = new BehaviorSubject<Marker>(null);
  private removedMarkersSubject: BehaviorSubject<Marker> = new BehaviorSubject<Marker>(null);
  private updatedMarkersSubject: BehaviorSubject<Marker> = new BehaviorSubject<Marker>(null);

  constructor(api: ApiService) {
    this.markersObservable = this.markersSubject.asObservable();
    this.addedMarkerObservable = this.addedMarkersSubject.asObservable();
    this.removedMarkerObservable = this.removedMarkersSubject.asObservable();
    this.updatedMarkerObservable = this.updatedMarkersSubject.asObservable();

    // get markers from server on contruction, later everything is kept in memory
    api.getMarkers().subscribe(response => {
      (response as object[]).forEach(marker => {
        let deserializedMarker = this.deserializeMarker(marker);
        this.markers.push(deserializedMarker);
        this.addedMarkersSubject.next(deserializedMarker);
      });
      this.markersSubject.next(this.markers);
    });
  }

  // entire collection of markers
  public markersObservable: Observable<Marker[]>;

  // notifies when new marker is added
  public addedMarkerObservable: Observable<Marker>;

  // notifies when marker is updated
  public updatedMarkerObservable: Observable<Marker>;

  // notifies which marker has been removed
  public removedMarkerObservable: Observable<Marker>;

  // adds marker and notifies subscribers about addition
  public addMarker(lat: number, lon: number, name: string): void{
    let marker = new Marker(this, lat, lon, name);
    this.markers.push(marker);
    this.markersSubject.next(this.markers);
    this.addedMarkersSubject.next(marker);
  }

  // updates marker and notifies subscribers about update
  public updateMarker(marker: Marker): void {
    this.updatedMarkersSubject.next(marker);
    this.markersSubject.next(this.markers);
  }

  // removed marker and notifies subscribers about removal
  public removeMarker(marker: Marker): void {
    let index = this.markers.indexOf(marker);
    this.markers.splice(index, 1);
    this.removedMarkersSubject.next(marker);
    this.markersSubject.next(this.markers);
  }

  private deserializeMarker(marker: object): Marker {
    let lat = marker['Latitude'];
    let lon = marker['Longitude'];
    let name = marker['Name'];

    return new Marker(this, lat, lon, name);
  }
}