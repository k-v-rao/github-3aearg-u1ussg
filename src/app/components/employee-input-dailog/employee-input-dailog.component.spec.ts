import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInputDailogComponent } from './employee-input-dailog.component';

describe('EmployeeInputDailogComponent', () => {
  let component: EmployeeInputDailogComponent;
  let fixture: ComponentFixture<EmployeeInputDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeInputDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeInputDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
