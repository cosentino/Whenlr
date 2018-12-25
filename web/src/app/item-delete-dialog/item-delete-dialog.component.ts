import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ItemDeleteDialogData {
  itemId: string;
}

@Component({
  selector: 'app-item-delete-dialog',
  templateUrl: './item-delete-dialog.component.html',
  styleUrls: ['./item-delete-dialog.component.scss']
})
export class ItemDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ItemDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemDeleteDialogData
  ) {}

  onAnswerClick(answer: boolean, itemId?: string): void {
    this.dialogRef.close({
      confirmed: answer,
      itemId: itemId
    });
  }
}
