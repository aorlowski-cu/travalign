import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { Activity } from '../activity';
import { ActivityService } from '../services/activity.service';
import { TripsService } from '../services/trips.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  // @Input() activities: String[];
  @Input() activity: Activity;
  @Input() tripId: string;

  userName: string;

  constructor(private activityService: ActivityService,
              private authService: AuthService,
              private tripsService: TripsService) { 
    this.authService.user$.subscribe(user => this.userName = user.email);
}

  ngOnInit(): void {
    // this.activities = this.activityService.getActivities();
  }

  clickUpvote(): void{
    if (this.activity.upvoted.includes(this.userName)) {
      console.log('You already voted!');
    } else {
      console.log('upvote!');
      this.activity.upvoted.push(this.userName);
      // https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
      var idx = this.activity.downvoted.indexOf(this.userName);
      if (idx !== -1) {
        this.activity.downvoted.splice(idx, 1);
      }
    }
    this.tripsService.updateActivity(this.tripId, this.activity.id, this.activity);
  }

  clickDownvote(): void{
    if (this.activity.downvoted.includes(this.userName)) {
      console.log('You already voted!');
    } else {
      console.log('downvote!');
      this.activity.downvoted.push(this.userName);
      // https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
      var idx = this.activity.upvoted.indexOf(this.userName);
      if (idx !== -1) {
        this.activity.upvoted.splice(idx, 1);
      }
    }
    this.tripsService.updateActivity(this.tripId, this.activity.id, this.activity);
  }

  clickConfirm(): void {
    console.log('confirmed!');
    this.activity.confirmed = true;
    this.tripsService.updateActivity(this.tripId, this.activity.id, this.activity);
  }

  showConfirm(): boolean {
    return this.userName == this.activity.owner && !this.activity.confirmed;
  }

}
