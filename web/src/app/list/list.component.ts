import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';

import { Item, ItemId } from '../item';
import { ItemsService } from '../items.service';
import { ItemDeleteDialogComponent, ItemDeleteDialogData } from '../item-delete-dialog/item-delete-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ItemsService]
})
export class ListComponent {

  public DATE_RANGE_ANY = 'any';
  public DATE_RANGE_LAST_YEAR = 'last-year';
  public DATE_RANGE_LAST_MONTH = 'last-month';
  public DATE_RANGE_THIS_MONTH = 'this-month';
  public DATE_RANGE_THIS_YEAR = 'this-year';

  public startDate: Date;
  public endDate: Date;
  public range: string;
  public listItems$: Observable<ItemId[]>;

  constructor(public itemsService: ItemsService, public dialog: MatDialog, private router: Router) {
    this.changeDateRange(this.DATE_RANGE_ANY);
    this.updateListItems();
  }

  changeDateRange(range: string) {
    this.range = range;
    switch (range) {
      case this.DATE_RANGE_LAST_YEAR:
        this.startDate = moment().subtract(1, 'year').startOf('year').toDate();
        this.endDate = moment().subtract(1, 'year').endOf('year').toDate();
        break;
      case this.DATE_RANGE_LAST_MONTH:
        this.startDate = moment().subtract(1, 'month').startOf('month').toDate();
        this.endDate = moment().subtract(1, 'month').endOf('month').toDate();
        break;
      case this.DATE_RANGE_THIS_MONTH:
        this.startDate = moment().startOf('month').toDate();
        this.endDate = moment().endOf('month').toDate();
        break;
      case this.DATE_RANGE_THIS_YEAR:
        this.startDate = moment().startOf('year').toDate();
        this.endDate = moment().endOf('year').toDate();
        break;
      default:
        this.startDate = this.endDate = null;
        break;
    }
    this.updateListItems();
  }

  updateListItems(): void {
    this.listItems$ = this.itemsService.getItemsByDateRange(this.startDate, this.endDate);
  }

  deleteItem(itemId: string): void {
    const dialogRef = this.dialog.open<ItemDeleteDialogComponent, ItemDeleteDialogData>(ItemDeleteDialogComponent, {
      width: '250px',
      data: { itemId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirmed) {
        this.itemsService.deleteItem(result.itemId);
      }
    });
  }

  navigateToEditItem(itemId: string): void {
    this.router.navigate(['item', itemId]);
  }

}
