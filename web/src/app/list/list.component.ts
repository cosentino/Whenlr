import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ItemsService } from '../items.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ItemsService]
})
export class ListComponent {

  constructor(private itemsService: ItemsService, public dialog: MatDialog) {}

  deleteItem(itemId): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialog, {
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

export interface DeleteConfirmDialogData {
  itemId: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: '<div mat-dialog-content><p>Are you sure?</p></div>\
    <div mat-dialog-actions>\
      <button mat-button (click)="onAnswerClick(false)" cdkFocusInitial>No</button>\
      <button mat-button (click)="onAnswerClick(true, data.itemId)">Yes</button>\
    </div>'
})
export class DeleteConfirmDialog {
  constructor(
      public dialogRef: MatDialogRef<DeleteConfirmDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DeleteConfirmDialogData
    ) {}

  onAnswerClick(answer: boolean, itemId: string): void {
    this.dialogRef.close({
      confirmed: answer,
      itemId: itemId
    });
  }
}
