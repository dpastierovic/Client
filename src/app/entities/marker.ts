import * as mapboxgl from 'mapbox-gl';
import { MarkerService } from '../services/marker.service';

export class Marker {
  private lockedMarker: mapboxgl.Marker;
  private unlockedMarker: mapboxgl.Marker;
  private markerService: MarkerService;
  private oldName: string;

  constructor(markerService: MarkerService, lat: number, lon: number, radius: number, name: string, id: number) {
    this.latitude = lat;
    this.longitude = lon;
    this.name = name;
    this.radius = radius;
    this.markerService = markerService
    this.id = id

    this.lockedMarker = new mapboxgl.Marker({ color: '#fc4c02'})
      .setLngLat([lon, lat])
      .setDraggable(false);
    this.setPopup(this.lockedMarker);

    this.unlockedMarker = new mapboxgl.Marker({ color: '#32cd32'})
    .setLngLat([lon, lat])
    .setDraggable(true);
    this.setPopup(this.unlockedMarker);

    this.mapMarker = this.lockedMarker;
    this.inactiveMarker = this.unlockedMarker;
    this.locked = true;
  }

  public mapMarker: mapboxgl.Marker

  public inactiveMarker: mapboxgl.Marker

  public id: number;

  public latitude: number;

  public longitude: number;

  public name: string;

  public radius: number;

  public locked: boolean;

  public enableModifications(): void {
    this.mapMarker = this.unlockedMarker;
    this.inactiveMarker = this.lockedMarker;
    this.locked = false;
    this.oldName = this.name;
    this.markerService.updateMarker(this);
  }

  public disableModifications(): void {
    this.lockedMarker.setLngLat(this.unlockedMarker.getLngLat());
    this.mapMarker = this.lockedMarker;
    this.setPopup(this.mapMarker);
    this.inactiveMarker = this.unlockedMarker;
    this.setPopup(this.inactiveMarker);
    this.locked = true;
    this.markerService.updateMarker(this);
  }

  public discard(): void {
    this.mapMarker = this.lockedMarker;
    this.unlockedMarker.setLngLat(this.lockedMarker.getLngLat());
    this.locked = true;
    this.name = this.oldName;
    this.setPopup(this.mapMarker);
    this.setPopup(this.inactiveMarker);
    this.markerService.updateMarker(this);
  }

  private setPopup(marker: mapboxgl.Marker): mapboxgl.Marker {
    marker.setPopup(new mapboxgl.Popup().setHTML('<b>' + this.name + '</b><br/>Radius: ' + this.radius + ' m'));
    return marker;
  }
}
