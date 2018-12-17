import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule],
})
export class MyMaterialModule { }
