import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MyMaterialModule } from './material-theme/material-theme.module';
import { AppComponent } from './app.component';

import { ListComponent, DeleteConfirmDialog } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ItemEditorComponent } from './item-editor/item-editor.component';

const appRoutes: Routes = [
  { path: 'create', component: CreateComponent },
  // { path: 'item/:id',      component: ItemDetailComponent },
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'List' }
  },
  { path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DeleteConfirmDialog,
    CreateComponent,
    PageNotFoundComponent,
    ItemEditorComponent
  ],
  entryComponents: [DeleteConfirmDialog],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    BrowserAnimationsModule,
    MyMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
