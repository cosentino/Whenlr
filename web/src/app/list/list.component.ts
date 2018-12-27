import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public itemsService: ItemsService, public dialog: MatDialog, private router: Router) {}

  deleteItem(itemId: string): void {
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

  navigateToEditItem(itemId: string): void {
    this.router.navigate(['item', itemId]);
  }

}
