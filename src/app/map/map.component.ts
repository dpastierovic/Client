import { environment } from '../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'] 
})
export class MapComponent implements OnInit {
  @ViewChild('AddMarkerDialog', {static: false}) component : Component;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 48.148598;
  lon = 17.107748;
  constructor() { }
  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lon, this.lat]
    });

    new mapboxgl.Marker().setLngLat([this.lon, this.lat]).setDraggable(true).addTo(this.map);
  }

  AddMarker()
  {
    console.log('NYI')
  }

  OnKeypress(e)
  {
    var key = 'which' in e ? e.which : e.keyCode;
    if (key == 13) 
    {
      document.getElementById('addMarkerButton').click();
    }
  }
}