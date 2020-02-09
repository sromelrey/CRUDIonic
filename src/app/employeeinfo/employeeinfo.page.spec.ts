import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmployeeinfoPage } from './employeeinfo.page';

describe('Tab3Page', () => {
  let component: EmployeeinfoPage;
  let fixture: ComponentFixture<EmployeeinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeinfoPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
