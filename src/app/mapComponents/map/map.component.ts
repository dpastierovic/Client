import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { Marker } from 'src/app/entities/marker';
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
  }

  addNewMarker(): Marker {
    let marker = new Marker(this.map.getCenter().lat, this.map.getCenter().lng, "Undefined")
    this.AddMarker(marker)
    return marker
  }

  AddMarker(marker: Marker)
  {
    new mapboxgl.Marker({ color: '#fc4c02'}).setLngLat([marker.Longitude, marker.Latitude]).setDraggable(false).setPopup(
      new mapboxgl.Popup().setHTML('<b>' + marker.Name + '</b><br/>Radius: 500 m'))
      .addTo(this.map);
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