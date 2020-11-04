import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Trip } from '../trip';
import { TripsService } from '../services/trips.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  trips: Trip[];
  trip: Trip;

  constructor(private route: ActivatedRoute,
              private tripsService: TripsService) {
  }

  ngOnInit(): void {
    this.trips = this.tripsService.getTrips();
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id'));
      console.log(id);
      this.trip = this.getTrip(id);
    });
  }

  getTrip(id: Number): Trip {
    return this.trips.filter(trip => trip.id == id)[0];
  }

}
