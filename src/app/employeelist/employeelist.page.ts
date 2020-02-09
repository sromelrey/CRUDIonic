import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IEmployee } from '../Interfaces/Employee.interface';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';
import { Router, ActivatedRoute, NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-employeelist',
  templateUrl: 'employeelist.page.html',
  styleUrls: ['employeelist.page.scss']
})
export class EmployeelistPage {
  public employeeList;
  groups: any = [];
  emps = [];
  emp = { id: '', FirstName: '', LastName: '', ContactNumber: '', Skills: ''};
    constructor(private db: AngularFirestore,
                private router: Router) {

               }
               
               ngOnInit() {
   
                this.db.collection(`Employee`, q => q.orderBy('LastName', 'desc'))
              .snapshotChanges().subscribe(serverEmps => {
                this.emps = [];
                serverEmps.forEach(a => {
                  const emp: any = a.payload.doc.data();
                  emp.id = a.payload.doc.id;
                  this.emps.push(emp);
                });
              });
          
                }
          
            Edit(data: any) {
               let navigationExtras: NavigationExtras = {
                state: {
                id: data.id,
                 FirstName: data.FirstName,
                 LastName: data.LastName,
                 Skills: data.Skills,
                 ContactNumber: data.ContactNumber,
                      }
                  };
           
                  
                  this.router.navigate([`tabs/employeeinfo/`],navigationExtras);
                }
              

}
