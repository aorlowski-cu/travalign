import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activities: String[] = ["msg1", "msg2"];

  constructor() { }

  addActivity(message: String) {
    this.activities.push(message);
  }

  getActivities(): String[] {
    return this.activities;
  }
}
