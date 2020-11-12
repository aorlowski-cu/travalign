import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Trip } from '../trip';
import { TripsService } from '../services/trips.service';
import { addDays, formatDate } from '../utils';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  panelOpenState: boolean = false;
  trip: Trip;
  dates: string[];

  constructor(private route: ActivatedRoute,
              private tripsService: TripsService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getTrip(id);
    });
  }

  getTrip(id: string): void {
    this.tripsService.getTrip(id)
      .subscribe(trip => {
        this.trip = trip.data();
      });
  }

}
