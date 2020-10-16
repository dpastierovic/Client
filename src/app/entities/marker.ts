import * as mapboxgl from 'mapbox-gl';

export class Marker {
  constructor(lat: number, lon: number, name: string) {
    this.latitude = lat;
    this.longitude = lon;
    this.name = name;
    this.radius = 500;

    this.mapMarker = new mapboxgl.Marker({ color: '#fc4c02'})
      .setLngLat([lon, lat])
      .setDraggable(false)
      .setPopup(new mapboxgl.Popup().setHTML('<b>' + name + '</b><br/>Radius: ' + this.radius + ' m'));
  }

  public mapMarker: mapboxgl.Marker

  public latitude: number;

  public longitude: number;

  public name: string;

  public radius: number;
}
