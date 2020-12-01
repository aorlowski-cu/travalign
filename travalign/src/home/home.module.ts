import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsComponent } from './trips/trips.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ActivityComponent } from './activity/activity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ItineraryComponent } from './itinerary/itinerary.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [TripsComponent, TripDetailComponent, ActivityComponent, ItineraryComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatListModule
  ],
  exports: [
    ItineraryComponent,
    TripsComponent,
    TripDetailComponent,
    ActivityComponent
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class HomeModule { }
