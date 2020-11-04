import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {AppComponent} from './app.component';
import { TripDetailComponent } from 'src/home/trip-detail/trip-detail.component';
import { TripsComponent } from 'src/home/trips/trips.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'trip',
    pathMatch: 'full'
  },
  {
    path: 'trip',
    component: TripsComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'trip/detail/:id',
    component: TripDetailComponent,
    canActivate: [AngularFireAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
