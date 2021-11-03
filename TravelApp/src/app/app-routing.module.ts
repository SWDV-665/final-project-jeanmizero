// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: 'places',
//     loadChildren: () =>
//       import('./places/places.module').then((m) => m.PlacesPageModule),
//   },
//   {
//     path: '',
//     redirectTo: 'places',
//     pathMatch: 'full',
//   },
//   {
//     path: 'splash-screen',
//     loadChildren: () =>
//       import('./splash-screen/splash-screen.module').then(
//         (m) => m.SplashScreenPageModule
//       ),
//   },

//   {
//     path: 'places',
//     loadChildren: () =>
//       import('./places/places.module').then((m) => m.PlacesPageModule),
//   },

//   {
//     path: 'bookings',
//     loadChildren: () =>
//       import('./bookings/bookings.module').then((m) => m.BookingsPageModule),
//   },
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
//   ],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./bookings/bookings.module').then((m) => m.BookingsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
