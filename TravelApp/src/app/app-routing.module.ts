import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreenGuard } from './splash-screen/splash-screen.guard';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  {
    path: 'splash-screen',
    loadChildren: () =>
      import('./splash-screen/splash-screen.module').then(
        (m) => m.SplashScreenPageModule
      ),
  },
  {
    path: 'places',
    loadChildren: () =>
      import('./places/places.module').then((m) => m.PlacesPageModule),
    canLoad: [SplashScreenGuard],
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./bookings/bookings.module').then((m) => m.BookingsPageModule),
    canLoad: [SplashScreenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
