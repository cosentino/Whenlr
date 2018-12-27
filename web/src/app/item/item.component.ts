import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, empty } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { ItemsService } from '../items.service';
import { Item } from '../item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ItemsService]
})
export class ItemComponent implements OnInit {

  // loggedUserId: Observable<string>;
  id$: Observable<string>;
  item$: Observable<Item>;

  itemForm = new FormGroup({
    userId: new FormControl(''),
    title: new FormControl(''),
    date: new FormControl(new Date())
  });

  constructor(private route: ActivatedRoute, private router: Router, private itemsService: ItemsService, private authService: AuthService) {
    this.authService.loggedUserObs.subscribe((user: firebase.User) => {
      this.itemForm.get('userId').setValue(user.uid);
    });
  }

  ngOnInit() {
    this.id$ = this.route.paramMap.pipe(map(params => params.get('id')));
    this.item$ = this.id$.pipe(switchMap(id => id ? this.itemsService.getItem(id) : empty()));
    this.item$.subscribe((item: Item) => {
      this.itemForm.get('title').setValue(item.title);
      this.itemForm.get('date').setValue(item.date.toDate());
    });
  }

  onSubmit() {
    this.id$.subscribe(id => {
      if (id) {
        this.itemsService.itemsCollection.doc(id).update(this.itemForm.value);
      } else {
        this.itemsService.itemsCollection.add(this.itemForm.value);
      }
    });
    this.router.navigate(['/list']);
  }
}
