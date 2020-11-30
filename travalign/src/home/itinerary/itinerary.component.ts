import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { Activity } from '../activity';
import { FormControl, FormGroup} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from '../utils';
import { TripsService } from '../services/trips.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {
  //https://angular-2-training-book.rangle.io/components/app_structure_with_components/passing_data_into_components
  @Input() activities: Activity[] = [];
  @Input() startDate = "";
  @Input() endDate = "";
  @Input() tripId: string = "";

  userName: string;
  showForm: boolean = false;
  createActivity: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private tripService: TripsService) {
    this.authService.user$.subscribe(user => this.userName = user.email);
  }

  ngOnInit(): void {
    this.createActivity = this.formBuilder.group({
      date: '',
      name: '',
      link: ''
    })
  }

  filterActivities(date: string): Activity[] {
    return this.activities.filter(
      activity => {
        const d = new Date(activity['date']);
        return date == d.toDateString();
      }
      
    );
  }

  getDatesArray(): string[] {
    let start = new Date(this.startDate);
    const end = new Date(this.endDate);
    //https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
    const numDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    const dateArray = [];
    for(let i = 0; i<=numDays; i++){
      dateArray.push(start.toDateString());
      //https://stackoverflow.com/questions/563406/add-days-to-javascript-date
      start.setDate(start.getDate() + 1);
    }
    return dateArray;
  }

  addActivity(): void{
    this.showForm = !this.showForm;
  }

  onCreateActivity(activity) {
    const newActivity: Activity = {
      id: uuidv4(),
      name: activity['name'],
      date: formatDate(activity['date']),
      upvoted: [],
      downvoted: [],
      link: activity['link'],
      confirmed: false,
      owner: this.userName
    }
    console.log(newActivity);
    this.tripService.addActivity(this.tripId, newActivity);
    this.showForm = !this.showForm;
    this.createActivity.reset();
  }
}
