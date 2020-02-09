import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'employee',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../employee/employee.module').then(m => m.EmployeePageModule)
          }
        ]
      },
      {
        path: 'employeelist',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../employeelist/employeelist.module').then(m => m.EmployeelistPageModule)
          }
        ]
      },
      {
        path: 'employeeinfo',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../employeeinfo/employeeinfo.module').then(m => m.EmployeeinfoPageModule)
          }
        ]
      },{
        path: 'employeeinfoedit',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../employeeinfoedit/employeeinfoedit.module').then(m => m.EmployeeinfoeditPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/employeelist',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/employeelist',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
