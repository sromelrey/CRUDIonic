import { Component } from '@angular/core';
import { Router, ActivatedRoute , NavigationExtras} from '@angular/router';
import { IEmployee } from '../Interfaces/Employee.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-employeeinfo',
  templateUrl: 'employeeinfo.page.html',
  styleUrls: ['employeeinfo.page.scss']
})
export class EmployeeinfoPage {



emps = { id: '', FirstName: '', LastName: '', ContactNumber: '', Skills: ''};
public data: any;

constructor(private route: ActivatedRoute,
            private router: Router,
            public db: AngularFirestore,
            public alertController: AlertController) {

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
// Delete Employee
async delete(id: any) {
   const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'Are you sure want to delete this info?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('cancel');
        }
      }, {
        text: 'Okay',
        handler: () => {
         this.db.doc('Employee/' + id).delete();
         this.router.navigateByUrl('tabs/employeelist');
        }
      }
    ]
  });

   await alert.present();
}
// Update Employee
 edit(data: any) {
   const navigationExtras: NavigationExtras = {
   state: {
    id: data.id,
    FirstName: data.FirstName,
    LastName: data.LastName,
    Skills: data.Skills,
    ContactNumber: data.ContactNumber,
         }
     };


   this.router.navigate([`tabs/employeeinfoedit/`], navigationExtras);
   }

}
