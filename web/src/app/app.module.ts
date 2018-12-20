import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MyMaterialModule } from './material-theme/material-theme.module';
import { AppComponent } from './app.component';
import { AccessGuard } from './access.guard';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListComponent, DeleteConfirmDialog } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create',
    component: ItemComponent,
    data: { requiresLogin: true },
    canActivate: [ AccessGuard ]
  },
  //{
    // path: 'item/:id',
    // component: ItemDetailComponent,
    // data: { requiresLogin: true },
    // canActivate: [ AccessGuard ]
  //},
  {
    path: 'list',
    component: ListComponent,
    data: { requiresLogin: true },
    canActivate: [ AccessGuard ]
  },
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ListComponent,
    DeleteConfirmDialog,
    ItemComponent,
    LoginComponent,
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
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MyMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
