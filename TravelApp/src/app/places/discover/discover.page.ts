import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { SplashScreenService } from '../../splash-screen/splash-screen.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  isLoading = false;
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private splashScreenService: SplashScreenService
  ) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe((places) => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  segmentChanged(event: Event) {
    const customEvent = event as CustomEvent<SegmentChangeEventDetail>;
    console.log(customEvent.detail);
    // if (Event.detail.value === 'all') {
    //   this.relevantPlaces = this.loadedPlaces;
    //   this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    // } else {
    //   this.relevantPlaces = this.loadedPlaces.filter(
    //     (place) => place.userId !== this.splashScreenService.userId
    //   );
    //   this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    // }
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
