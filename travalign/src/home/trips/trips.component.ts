import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TripsService } from '../services/trips.service';
import { Trip } from '../trip';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { formatDate } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  showForm: boolean = false;

  trips: Trip[];

  createTripForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  userName: string;
  members = []

  constructor(private tripsService: TripsService,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.userName = user.email;
      this.members.push(this.userName);
    }
    );
  }

  ngOnInit(): void {
    this.tripsService.getTrips()
      .subscribe(trips => this.trips = trips);

    console.log(this.trips);
    this.createTripForm = this.formBuilder.group({
      name: '',
      startDate: '',
      endDate: '',
      members: [this.userName]
    })
  }

  clickAdd(): void {
    this.showForm = !this.showForm;
    console.log('add clicked');
  }

  returnUser(): string {
    return this.userName;
  }

  //https://material.angular.io/components/chips/overview
  addMember(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.members.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  //https://material.angular.io/components/chips/overview
  removeMember(member: string): void {
    const index = this.members.indexOf(member);

    if (index >= 0) {
      this.members.splice(index, 1);
    }
  }
  //Remove trip method, only works if the user was the one who created it
  //This is done by making sure the userName is the last name in the list (always added last in creation of trip)
  removeTrip(trip) {
    if (this.userName === trip.creator) {
      let placeHolder = this.trips.indexOf(trip);
      if (placeHolder !== -1) {
        this.trips.splice(placeHolder, 1);
        this.tripsService.removeTrip(trip);
      }
    }
  }

  onCreateTrip(trip) {
    console.log(trip['members']);
    const newTrip: Trip = {
      id: uuidv4(),
      name: trip['name'],
      startDate: formatDate(trip['startDate']),
      endDate: formatDate(trip['endDate']),
      creator: this.userName,
      members: this.members,
      activities: []
    };
    console.log(newTrip);
    this.tripsService.addTrip(newTrip);
    console.log("new trip created");
    this.createTripForm.reset();
    console.log('Reset')
    this.showForm = !this.showForm;
  }

}
