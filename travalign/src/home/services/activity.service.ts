import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Activity } from '../activity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  // https://medium.com/madhash/how-to-crud-in-angular-firebase-firestore-456353d7c62
  private activitiesCollection: AngularFirestoreCollection;

  activities: String[] = ["msg1", "msg2"];

  constructor(private fireStore: AngularFirestore) { 
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

  getActivities(): String[] {
    return this.activities;
  }
}
