import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import * as moment from 'moment';
import { Item, ItemId } from './item';
import { AuthService } from './auth.service';

@Injectable()
export class ItemsService {

  private allItemsCollection: AngularFirestoreCollection<Item>;
  private allItems$: Observable<ItemId[]>;

  constructor(private readonly afs: AngularFirestore, private authService: AuthService) {
    // if (!authService.loggedUser) {
    //   return;
    // }
  }

  private getAllItemsCollection(): AngularFirestoreCollection<Item> {
    if (!this.allItemsCollection) {
      this.allItemsCollection = this.afs.collection<Item>('items',
        ref => ref
          .where('userId', '==', this.authService.loggedUser.uid)
          .orderBy('date', 'desc')
      );
    }
    return this.allItemsCollection;
  }

  private getItemsCollectionByDateRange(startDate?: Date, endDate?: Date): AngularFirestoreCollection<Item> {
    startDate = startDate ? startDate : moment().year(1700).month(0).day(0).toDate();
    endDate = endDate ? endDate : moment().year(3001).month(0).day(0).toDate();
    const startTimestamp = firebase.firestore.Timestamp.fromDate(startDate);
    const endTimestamp = firebase.firestore.Timestamp.fromDate(endDate);
    return this.afs.collection<Item>('items',
      ref => ref
        .where('userId', '==', this.authService.loggedUser.uid)
        .where('date', '>=', startTimestamp)
        .where('date', '<=', endTimestamp)
        .orderBy('date', 'desc')
    );
  }

  private buildItemIdObservableFromCollection(collection: AngularFirestoreCollection<Item>): Observable<ItemId[]> {
    return collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // PUBLIC METHODS //

  createItem(itemValues: any): Promise<firebase.firestore.DocumentReference> {
    return this.getAllItemsCollection().add(itemValues);
  }

  updateItem(itemId: string, itemValues: any): Promise<void> {
    return this.getAllItemsCollection().doc(itemId).update(itemValues);
  }

  deleteItem(itemId: string): Promise<void> {
    return this.getAllItemsCollection().doc(itemId).delete();
  }

  getItem(itemId: string): Observable<ItemId> {
    return from(
        this.getAllItemsCollection().doc(itemId).ref.get()
      )
      .pipe(map(snapshot => {
          const data = snapshot.data() as Item;
          const id = snapshot.id;
          return { id, ...data };
        }
      ));
  }

  getAllItems(): Observable<ItemId[]> {
    if (!this.allItems$) {
      this.allItems$ = this.buildItemIdObservableFromCollection(this.getAllItemsCollection());
    }
    return this.allItems$;
  }

  getItemsByDateRange(startDate: Date, endDate: Date): Observable<ItemId[]> {
    return this.buildItemIdObservableFromCollection(this.getItemsCollectionByDateRange(startDate, endDate));
  }

}
