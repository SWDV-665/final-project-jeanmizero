import { Injectable } from '@angular/core';

import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    // Add data places
    new Place(
      'l1',
      'Bisate Lodge - Rwanda',
      'Bisate Lodge is located in the natural amphitheater of an eroded volcanic cone – in Kinyarwanda, the word bisate means ‘pieces’ describing how the once-whole cone was worn away by natural erosion',
      'https://mybestplace.com/uploads/2020/12/Bisate-Lodge-Rwanda-Africa-COVER.jpg',
      1499
    ),
    new Place(
      'l2',
      "Cottar's Safaris",
      'Cottar’s Bush Villa - Kenya',
      'https://lh3.googleusercontent.com/proxy/59txRJvR4Vfm6sPQ4qs9ZhZanFXl0L6ERgfFIwHsJZMDsBQWQ6bNO0YP-JZgNJBWPjnfH1SzmjyuI_CUJt5mY8Wab35Dpx7gjRl4vv--Sl63h47nqSCgBW4KDZL8CVt2qaizCOqnCZEFghwgJnYEAGOWKFdh3rc=w592-h404-n-k-rw-no-v1',
      1899
    ),
    new Place(
      'l3',
      'The Foggy Palace',
      'Ngorongoro Crater Lodge - Tanzania',
      'https://lh3.googleusercontent.com/p/AF1QipNyTkbN9VCTMTUnCzHHWSJ6hBDfbftQB76314A=w592-h404-n-k-rw-no-v1',
      2499
    ),
  ];

  get places() {
    return [...this._places];
  }

  constructor() {}
}
