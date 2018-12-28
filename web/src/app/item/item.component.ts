import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  itemForm: FormGroup;
  id$: Observable<string>;
  item$: Observable<Item>;

  constructor(private route: ActivatedRoute, private router: Router, private itemsService: ItemsService, private authService: AuthService) {
  }

  ngOnInit() {
    // init the reactive form
    this.itemForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      date: new FormControl(new Date(), [Validators.required])
    });

    // get the logged user id and set it as an hidden form field
    this.authService.loggedUserObs.subscribe((user: firebase.User) => {
      this.itemForm.get('userId').setValue(user.uid);
    });

    // Handle EDIT mode in case and item id is passed as url parameter
    this.id$ = this.route.paramMap.pipe(map(params => params.get('id')));
    // eventually load item info into form fields
    this.item$ = this.id$.pipe(switchMap(id => id ? this.itemsService.getItem(id) : empty()));
    this.item$.subscribe((item: Item) => {
      this.itemForm.get('title').setValue(item.title);
      this.itemForm.get('date').setValue(item.date.toDate());
    });
  }

  onSubmit() {
    // on submit create a new item or update the existing one (if in edit mode)
    this.id$.subscribe(id => {
      if (id) {
        this.itemsService.itemsCollection.doc(id).update(this.itemForm.value);
      } else {
        this.itemsService.itemsCollection.add(this.itemForm.value);
      }
    });
    // redirect the user to the item list screen
    this.router.navigate(['/list']);
  }
}
