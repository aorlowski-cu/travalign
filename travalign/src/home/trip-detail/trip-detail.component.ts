import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Trip } from '../trip';
import { TripsComponent } from '../trips/trips.component';
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
  userName: string;

  constructor(private route: ActivatedRoute,
              private tripsService: TripsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.trip$ = this.tripsService.getTripObserver(id);
    });
  }

  removeMember(trip, name){
  // && this.trips.userName === trip.creator
    if(trip.members.indexOf(name) !== -1){
      trip.members.splice(trip.members.indexOf(name),1);
    }
    // this.tripsService.removeMember(trip,name);
  }

  addMember(trip, name){
    trip.members.concat(name);
    this.tripsService.addMember(trip,name);
   }

  leaveTrip(trip){
    // if(trip.members.indexOf(this.tripsService.userName) !== -1){
    //   trip.members.splice(trip.members.indexOf(this.tripsService.userName),1);
    // }
    this.tripsService.removeMember(trip,trip.returnUser());
    if(trip.members.length === 0) {
      this.tripsService.removeTrip(trip);
    }
  }

}


