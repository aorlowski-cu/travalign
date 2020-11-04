import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Trip } from '../trip';
import { TripsService } from '../services/trips.service';
import { addDays, formatDate } from '../utils';

interface Ideas {
  restaurants?: string[],
  hotels?: string[],
  spots?: string[]
}

interface DateNode {
  date: string,
  ideas: Ideas
}

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  panelOpenState: boolean = false;
  trips: Trip[];
  trip: Trip;
  itinerary: DateNode[] = [
    {
      date: "02/02/2020",
      ideas: {}
    },
    {
      date: "02/03/2020",
      ideas: {}
    }
  ];
  dates: string[];

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
