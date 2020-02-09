import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { EmployeeinfoeditPage } from './employeeinfoedit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
   ReactiveFormsModule   ,
    RouterModule.forChild([{ path: '', component: EmployeeinfoeditPage }])
  ],
  declarations: [EmployeeinfoeditPage]
})
export class EmployeeinfoeditPageModule {}
