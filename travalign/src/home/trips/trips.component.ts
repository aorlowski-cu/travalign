import { Component, OnInit } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { Trip } from '../trip';
import { FormControl, FormGroup} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { formatDate } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  showForm: boolean = false;
  // t: Trip = {
  //   startDate: "2020/02/02",
  //   endDate: "2020/02/08",
  //   hotels: ["hotel1", "hotel2"]
  // }

  trips: Trip[];

  createTripForm: FormGroup;

  friends: String[] = ["Alex", "Lincoln"];

  userName: String;

  constructor(private tripsService: TripsService,
              private formBuilder: FormBuilder,
              private readonly authService: AuthService) {
    this.authService.user$.subscribe(user => this.userName = user.displayName);
  }

  ngOnInit(): void {
    this.tripsService.getTrips()
      .subscribe(trips => this.trips = trips);

    console.log(this.trips);
    this.createTripForm = this.formBuilder.group({
      name: '',
      startDate: '',
      endDate: '',
      members: []
    })
  }

  clickAdd(): void {
    this.showForm = !this.showForm;
    console.log('add clicked');
  }

  //Remove trip method, only works if the user was the one who created it
  //This is done by making sure the userName is the last name in the list (always added last in creation of trip)
  removeTrip(trip){
    if(this.userName === trip.members[trip.members.length-1]) {
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
      members: trip['members'].concat([this.userName]),
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
