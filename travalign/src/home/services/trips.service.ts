import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../trip';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { AuthService } from '../../shared/services/auth.service';
import { firestore } from 'firebase';
import { ActivityService } from './activity.service';
import { Activity, ActivityType } from '../activity';
import { v4 as uuidv4 } from 'uuid';

//Singleton pattern
@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private tripsCollection: AngularFirestoreCollection<Trip>;

  // Dependency injection
  constructor(private db: AngularFireDatabase,
              private readonly authService: AuthService,
              private fireStore: AngularFirestore) {
    this.tripsCollection = fireStore.collection<Trip>('trips');
  }

  //https://www.mode2.com/news/part-two-angular-with-firestore-intro/
  getTripObserver(id: string): Observable<Trip> {
    return this.tripsCollection.doc(id).snapshotChanges().pipe(
      map((a) => {
        const data = a.payload.data() as Trip;
        console.log(data);
        return data;
      }));
  }

  //Observer pattern
  getTrips(): Observable<Trip[]> {
    return this.tripsCollection.valueChanges();
  }


  getTrip(id: string): Observable<any> {
    // return this.fireStore.collection<Trip>('trips').valueChanges( {'id': id} )

    return this.tripsCollection.doc(id).get();
  }

// API: https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md

  addTrip(trip: Trip): void {
    console.log('added trip here');

    const id = this.fireStore.createId();
    trip['id'] = id;
    trip['activities'] = []

    this.tripsCollection.doc(id).set(trip);
  }
  removeTrip(trip: Trip): void{

    this.tripsCollection.doc(trip.id).delete();

  }

  removeMember(trip: Trip, name): void{
    this.tripsCollection.doc(trip.id).update({
      members: trip.members.splice(trip.members.indexOf(name,1))
    });
  }

  addMember(trip: Trip, name): void{
    this.tripsCollection.doc(trip.id).update({
      members: trip.members.concat(name)
    });
  }

  updateActivity(tripId: string, activityId: string, activity: Activity) {
    this.tripsCollection.doc(tripId).get().subscribe(
      t => {
        const trip = t.data() as Trip;
        var i;
        for (i = 0; i < trip.activities.length; i++) {
          if (trip['activities'][i]['id'] == activityId) {
            trip['activities'][i] = activity;
            break;
          }
        }
        this.tripsCollection.doc(tripId).set(trip);
      }
    );
  }

  addActivity(tripId: string, activity: Activity) {
    this.tripsCollection.doc(tripId).get().subscribe(
      t => {
        const trip = t.data() as Trip;
        trip['activities'].push(activity);
        this.tripsCollection.doc(tripId).set(trip);
      }
    )
  }
}
