import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IEmployee } from '../Interfaces/Employee.interface';
import {  FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-employee',
  templateUrl: 'employee.page.html',
  styleUrls: ['employee.page.scss']
})
// tslint:disable-next-line: class-name
export class EmployeePage {

submitted = false;
empForm: FormGroup;
emp: IEmployee = { id: '', FirstName: '', LastName: '', ContactNumber: '', Skills: ''};

  constructor(public router: Router,
              public db: AngularFirestore,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController
  ) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.empForm = this.formBuilder.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    ContactNumber: [0, Validators.required],
    Skills: ['', Validators.required]
    });

      }
     async  onSubmit(emp: NgForm) {
        const loading = await this.loadingCtrl.create();
        this.submitted = true;

        if (emp.valid) {
         this.db.collection(`Employee`).add({
            FirstName: this.emp.FirstName ,
            LastName: this.emp.LastName ,
            ContactNumber: Number( this.emp.ContactNumber ),
            Skills: this.emp.Skills
          }).then(() => {
        
            loading.dismiss().then(() => {
             // this.empForm.reset()
              this.submitted = false;
              this.emp.FirstName ='';
              this.emp.LastName ='';
              this.emp.ContactNumber ='';
              this.emp.Skills ='';
             this.router.navigateByUrl('tabs/employeelist');
                
            });
          }, error => {
            console.error(error);
          }
          );
        }

        return await loading.present();
       
      }

}
