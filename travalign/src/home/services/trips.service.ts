import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Trip } from '../trip';
import { TRIPS } from '../mock-trips';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  trips: Trip[];
  constructor() {
    this.trips = TRIPS;
  }

  getTrips(): Trip[] {
    return this.trips;
  }

  addTrip(trip): void {
    this.trips.push(trip);
  }
}
