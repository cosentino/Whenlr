import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';

import { ItemsService } from '../items.service';
import { ItemDeleteDialogComponent, ItemDeleteDialogData } from '../item-delete-dialog/item-delete-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ItemsService]
})
export class ListComponent {

  constructor(public itemsService: ItemsService, public dialog: MatDialog) {}

  deleteItem(itemId): void {
    const dialogRef = this.dialog.open<ItemDeleteDialogComponent, ItemDeleteDialogData>(ItemDeleteDialogComponent, {
      width: '250px',
      data: { itemId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmed) {
        this.itemsService.itemsCollection.doc(result.itemId).delete();
      }
    });
  }
}
