import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Item, ItemId } from './item';
import { AuthService } from './auth.service';

@Injectable()
export class ItemsService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<ItemId[]>;

  constructor(private readonly afs: AngularFirestore, private authService: AuthService) {
    if (!authService.loggedUser) {
      return;
    }
    this.itemsCollection = afs.collection<Item>('items', ref => ref.where('userId', '==', authService.loggedUser.uid));
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

}
