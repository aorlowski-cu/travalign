import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Trip } from '../trip';
import { TripsService } from '../services/trips.service';
import { addDays, formatDate } from '../utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  panelOpenState: boolean = false;
  trip$: Observable<Trip>;
  dates: string[];
  trips: any;

  constructor(private route: ActivatedRoute,
              private tripsService: TripsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.trip$ = this.tripsService.getTripObserver(id);
    });
  }

  // addMember(){
  //   console.log(string);
  // }

}


