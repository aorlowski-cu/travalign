import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../trip';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { AuthService } from '../../shared/services/auth.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private tripsCollection: AngularFirestoreCollection<Trip>;
  // trips: Trip[];
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

  getTrips(): Observable<Trip[]> {
    return this.tripsCollection.valueChanges();
  }

  
  getTrip(id: string): Observable<any> {
    // return this.fireStore.collection<Trip>('trips').valueChanges( {'id': id} )

    return this.tripsCollection.doc(id).get();
  }

// API: https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md

  addTrip(trip: Trip): void {
    // this.trips.push(trip);

    // var updates = {}
    // updates['/trips/' + this.db.database.ref().child('trips').push().key] = trip;

    // this.db.database.ref().update(updates);

    // this.db.database.ref('trips/' + trip['id']).set(trip);
    console.log('added trip here');

    const id = this.fireStore.createId();
    
    trip['id'] = id;

    this.tripsCollection.doc(id).set(trip);
    
    this.tripsCollection.doc(id).get().subscribe(trip => console.log(trip.data()));

    // this.fireStore.collection('trips').add(trip);
      
    // this.db.database.ref('trips/1').once('value').then(
    //   x => console.log(x.val())
    // );

  }
}
