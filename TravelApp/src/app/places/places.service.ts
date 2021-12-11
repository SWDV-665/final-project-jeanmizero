import { Injectable } from '@angular/core';

import { Place } from './place.model';
import { SplashScreenService } from '../splash-screen/splash-screen.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    // Add data places
    new Place(
      'p1',
      'Bisate Lodge - Rwanda',
      'Bisate Lodge is located in the natural amphitheater of an eroded volcanic cone – in Kinyarwanda, the word bisate means ‘pieces’ describing how the once-whole cone was worn away by natural erosion',
      'https://mybestplace.com/uploads/2020/12/Bisate-Lodge-Rwanda-Africa-COVER.jpg',
      1499,
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      "Cottar's Safaris",
      'Cottar’s Bush Villa - Kenya',
      'https://lh3.googleusercontent.com/proxy/59txRJvR4Vfm6sPQ4qs9ZhZanFXl0L6ERgfFIwHsJZMDsBQWQ6bNO0YP-JZgNJBWPjnfH1SzmjyuI_CUJt5mY8Wab35Dpx7gjRl4vv--Sl63h47nqSCgBW4KDZL8CVt2qaizCOqnCZEFghwgJnYEAGOWKFdh3rc=w592-h404-n-k-rw-no-v1',
      1899,
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Ngorongoro Crater Lodge - Tanzania',
      'https://lh3.googleusercontent.com/p/AF1QipNyTkbN9VCTMTUnCzHHWSJ6hBDfbftQB76314A=w592-h404-n-k-rw-no-v1',
      2499,
      new Date('2021-01-01'),
      new Date('2021-12-31'),
      'abc'
    ),
  ]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private splashService: SplashScreenService) {}
  // Add place method
  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === id) };
      })
    );
  }
  // Add get service
  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://mybestplace.com/uploads/2020/12/Bisate-Lodge-Rwanda-Africa-COVER.jpg',
      price,
      dateFrom,
      dateTo,
      this.splashService.userId
    );
    // this._places.push(newPlace);
    this.places.pipe(take(1)).subscribe((places) => {
      this._places.next(places.concat(newPlace));
    });
  }
  // Update
  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      // delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
