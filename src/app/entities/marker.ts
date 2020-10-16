export class Marker {
  constructor(lat: number, lon: number, name: string) {
    this.Latitude = lat;
    this.Longitude = lon;
    this.Name = name;
  }

  public Latitude: number;

  public Longitude: number;

  public Name: string;
}
