import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Activity } from '../activity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private activitiesCollection: AngularFirestoreCollection;

  activities: String[] = ["msg1", "msg2"];

  constructor(private fireStore: AngularFirestore) { 
    // this.tripsCollection = fireStore.collection<>('');
    this.activitiesCollection = fireStore.collection('activities');
  }

  getActivityObserver(id: string) {
    return this.activitiesCollection.doc(id).snapshotChanges().pipe(
      map((a) => {
        const data = a.payload.data() as Activity;
        console.log(data);
        return data;
      })
    )
  }

  addActivity() {
    // this.activities.push(message);
    

    // trip['id'] = id;

  }

  getActivities(): String[] {
    return this.activities;
  }
}


// <activity_id>
// [
//   {
//     'activity_type': 'restaurant',
//     'date': '2020-02-02',
//     'link': 'http://www.google.com'
//   }
// ]

