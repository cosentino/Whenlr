import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms';

import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ItemsService]
})
export class ItemComponent {

  itemForm = new FormGroup({
    title: new FormControl(''),
    date: new FormControl(new Date())
  });

  constructor(private router: Router, private itemsService: ItemsService) {
  }

  onSubmit() {
    this.itemsService.itemsCollection.add(this.itemForm.value);
    this.router.navigate(['/list']);
  }
}
