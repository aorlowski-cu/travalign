import { Component, OnInit } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { Trip } from '../trip';
import { FormControl, FormGroup} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { formatDate } from '../utils';

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

  constructor(private tripsService: TripsService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.trips = this.tripsService.getTrips();
    this.createTripForm = this.formBuilder.group({
      name: '',
      startDate: '',
      endDate: '',
      hotels: [],
      members: []
    })
  }

  clickAdd(): void {
    this.showForm = !this.showForm;
    console.log('add clicked');
  }

  onCreateTrip(trip) {
    console.log(trip['members']);
    const newTrip: Trip = {
      id: 100,
      name: trip['name'],
      startDate: formatDate(trip['startDate']),
      endDate: formatDate(trip['endDate']),
      hotels: [],
      members: trip['members']
    };
    console.log(newTrip);
    this.tripsService.addTrip(newTrip);
    console.log("new trip created");
    this.createTripForm.reset();
    console.log('Reset')
    this.showForm = !this.showForm;
  }
}
