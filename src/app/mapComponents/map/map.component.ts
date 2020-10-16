import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { Marker } from 'src/app/entities/marker';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'] 
})
export class MapComponent implements OnInit {
  @Input() showMarkers: boolean;
  @ViewChild('AddMarkerDialog', {static: false}) component : Component;

  private map: mapboxgl.Map;
  constructor(private markerService: MarkerService) {

  }

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13,
      center: [17.107748, 48.148598]
    });

    if (this.showMarkers) {
      this.markerService.addedMarkerObservable.subscribe(this.addMarker);
      this.markerService.removedMarkerObservable.subscribe(this.removeMarker);
    }
  }

  // returns coordinates of the center of the current map view
  public getCenter(): mapboxgl.LngLat{
    return this.map.getCenter();
  }

  private addMarker = (marker: Marker): void => {
    if(marker == null){
      return;
    }
    marker.mapMarker.addTo(this.map);
  }

  private removeMarker = (marker: Marker): void => {
    if(marker == null){
      return;
    }
    marker.mapMarker.remove();
  }
}