import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { IEmployee } from '../Interfaces/Employee.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {  FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-employeeinfoedit',
  templateUrl: './employeeinfoedit.page.html',
  styleUrls: ['./employeeinfoedit.page.scss'],
})

export class EmployeeinfoeditPage  {
submitted = false;
empForm: FormGroup;
emps = { id: '', FirstName: '', LastName: '', ContactNumber: '', Skills: ''};
public data: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public db: AngularFirestore,
              public alertController: AlertController,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController) {

              this.route.queryParams.subscribe(params => {
                if (this.router.getCurrentNavigation().extras.state) {
                this.emps.id = this.router.getCurrentNavigation().extras.state.id;
                this.emps.FirstName = this.router.getCurrentNavigation().extras.state.FirstName;
                this.emps.LastName = this.router.getCurrentNavigation().extras.state.LastName;
                this.emps.Skills = this.router.getCurrentNavigation().extras.state.Skills;
                this.emps.ContactNumber = this.router.getCurrentNavigation().extras.state.ContactNumber;

                    }
                return this.emps;

                  });
            }
            // tslint:disable-next-line: use-lifecycle-interface
            ngOnInit() {
              this.empForm = this.formBuilder.group({
              FirstName: ['', Validators.required],
              LastName: ['', Validators.required],
              ContactNumber: [0, Validators.required],
              Skills: ['', Validators.required]
              });
                }

                async onSubmitEdit(emp: NgForm) {
                  const loading = await this.loadingCtrl.create();
                  this.submitted = true;

                  if (emp.valid) {
                   this.db.doc(`Employee/${this.emps.id}`).update({
                      FirstName: this.emps.FirstName ,
                      LastName: this.emps.LastName ,
                      ContactNumber: Number( this.emps.ContactNumber ),
                      Skills: this.emps.Skills
                    }).then(() => {

                      loading.dismiss().then(() => {
                          this.submitted = false;
                          this.emps.FirstName = '';
                          this.emps.LastName = '';
                          this.emps.ContactNumber = '';
                          this.emps.Skills = '';
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
