import { Component, OnInit, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Item, ItemId } from '../item';
import { ItemsService }     from '../items.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ItemsService]
})
export class CreateComponent {

  constructor(private itemsService:ItemsService, private readonly afs: AngularFirestore) {
  }

  /**
   * Create an item document
   */
  addItem(name: string) {
    const id = this.afs.createId();
    const item: ItemId = { id, name };
    this.itemsService.itemsCollection.doc(id).set(item);
  }

}
