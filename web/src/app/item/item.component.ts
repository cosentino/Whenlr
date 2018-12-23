import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ItemsService]
})
export class ItemComponent {

  loggedUserId: Observable<string>;

  itemForm = new FormGroup({
    userId: new FormControl(''),
    title: new FormControl(''),
    date: new FormControl(new Date())
  });

  constructor(private router: Router, private itemsService: ItemsService, private authService: AuthService) {
    this.loggedUserId = this.authService.loggedUserObs.pipe(map(function(user: firebase.User) {
      return user ? user.uid : '';
    }));
  }

  onSubmit() {
    this.itemsService.itemsCollection.add(this.itemForm.value);
    this.router.navigate(['/list']);
  }
}
