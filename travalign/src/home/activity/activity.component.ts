import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  activities: String[];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.activities = this.activityService.getActivities();
  }

}
