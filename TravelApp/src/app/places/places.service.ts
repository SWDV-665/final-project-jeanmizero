import { Injectable } from '@angular/core';

import { Place } from './place.model';
import { SplashScreenService } from '../splash-screen/splash-screen.service';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlaceLocation } from './location.model';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
  location: PlaceLocation;
}

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);
  // Add data places
  //   new Place(
  //     'p1',
  //     'Bisate Lodge - Rwanda',
  //     'Bisate Lodge is located in the natural amphitheater of an eroded volcanic cone – in Kinyarwanda, the word bisate means ‘pieces’ describing how the once-whole cone was worn away by natural erosion',
  //     'https://mybestplace.com/uploads/2020/12/Bisate-Lodge-Rwanda-Africa-COVER.jpg',
  //     1499,
  //     new Date('2021-01-01'),
  //     new Date('2021-12-31'),
  //     'abc'
  //   ),
  //   new Place(
  //     'p2',
  //     "Cottar's Safaris",
  //     'Cottar’s Bush Villa - Kenya',
  //     'https://lh3.googleusercontent.com/proxy/59txRJvR4Vfm6sPQ4qs9ZhZanFXl0L6ERgfFIwHsJZMDsBQWQ6bNO0YP-JZgNJBWPjnfH1SzmjyuI_CUJt5mY8Wab35Dpx7gjRl4vv--Sl63h47nqSCgBW4KDZL8CVt2qaizCOqnCZEFghwgJnYEAGOWKFdh3rc=w592-h404-n-k-rw-no-v1',
  //     1899,
  //     new Date('2021-01-01'),
  //     new Date('2021-12-31'),
  //     'abc'
  //   ),
  //   new Place(
  //     'p3',
  //     'The Foggy Palace',
  //     'Ngorongoro Crater Lodge - Tanzania',
  //     'https://lh3.googleusercontent.com/p/AF1QipNyTkbN9VCTMTUnCzHHWSJ6hBDfbftQB76314A=w592-h404-n-k-rw-no-v1',
  //     2499,
  //     new Date('2021-01-01'),
  //     new Date('2021-12-31'),
  //     'abc'
  //   ),
  // ]);

  get places() {
    return this._places.asObservable();
  }

  constructor(
    private splashService: SplashScreenService,
    private http: HttpClient
  ) {}
  // Get Method/ Fetch places
  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        'https://ionic-project-c2ba9-default-rtdb.firebaseio.com/offered-places.json'
      )
      .pipe(
        map((resData) => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId,
                  resData[key].location
                )
              );
            }
          }
          return places;
          // return [];
        }),
        tap((places) => {
          this._places.next(places);
        })
      );
  }
  // Add place method
  getPlace(id: string) {
    return this.http
      .get<PlaceData>(
        `https://ionic-project-c2ba9-default-rtdb.firebaseio.com/offered-places/${id}.json`
      )
      .pipe(
        map((placeData) => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId,
            placeData.location
          );
        })
      );
  }
  // Add get service
  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    location: PlaceLocation
  ) {
    let generatedId: string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://mybestplace.com/uploads/2020/12/Bisate-Lodge-Rwanda-Africa-COVER.jpg',
      price,
      dateFrom,
      dateTo,
      this.splashService.userId,
      location
    );
    // Post Method Firebase database
    return this.http
      .post<{ name: string }>(
        'https://ionic-project-c2ba9-default-rtdb.firebaseio.com/offered-places.json',
        { ...newPlace, id: null }
      )
      .pipe(
        switchMap((resData) => {
          // console.log(resData);
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
  }
  // Update
  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId,
          oldPlace.location
        );
        // Put method
        return this.http.put(
          `https://ionic-project-c2ba9-default-rtdb.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
