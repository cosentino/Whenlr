import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms';

import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss'],
  providers: [ItemsService]
})
export class ItemEditorComponent {

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
