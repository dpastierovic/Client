import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marker } from '../entities/marker';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private markers: Marker[] = new Array<Marker>()
  private markersSubject: BehaviorSubject<Marker[]> = new BehaviorSubject<Marker[]>(this.markers)

  constructor(api: ApiService) {
    this.markersObservable = this.markersSubject.asObservable()

    api.getMarkers().subscribe(response => {
      (response as object[]).forEach(marker => {
        this.markers.push(this.deserializeMarker(marker))
      })
      this.markersSubject.next(this.markers)
    })
  }

  public markersObservable: Observable<Marker[]>;

  public addMarker(marker: Marker): void {
    this.markers.push(marker)
    this.markersSubject.next(this.markers)
  }

  private deserializeMarker(marker: object): Marker {
    let lat = marker['Latitude']
    let lon = marker['Longitude']
    let name = marker['Name']

    return new Marker(lat, lon, name)
  }
}
