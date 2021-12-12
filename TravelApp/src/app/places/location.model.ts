export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PlaceLocation extends Coordinates {
  addressLocation: string;
  staticMapImageUrl: string;
}
