import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { DboperationsService, Employee } from 'src/app/services/dboperations.service';

export interface dailogData{
  emp_id?:string;
  isEdit:boolean;
  name:string;
  email:string;
}
@Component({
  selector: 'app-employee-input-dailog',
  templateUrl: './employee-input-dailog.component.html',
  styleUrls: ['./employee-input-dailog.component.css']
})
export class EmployeeInputDailogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<EmployeeInputDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:dailogData,private api:DboperationsService) { }
    dailogData:dailogData={name:this.data.name,email:this.data.email,isEdit:this.data.isEdit,emp_id:this.data.emp_id};

    employeeEmail = new FormControl('', [Validators.required, Validators.email]);

    employeeName=new FormControl('',[Validators.required,Validators.maxLength(20),Validators.minLength(2)])

    getNameErrorMessage(){
      if(this.employeeName.hasError('required')){
        return 'Name is reuired'
      } 
      if(this.employeeName.hasError('minlength')){
        return 'Name should contain minimum 2 charectors'
      }
      return this.employeeName.hasError('maxLength')?'max length 20' : ''
    }
    getEmailErrorMessage() {
      if (this.employeeEmail.hasError('required')) {
        return 'You must enter a value';
      }
  
      return this.employeeEmail.hasError('email')?"enter a proper email": '';
    }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  onNoClick(): void {
    this.dialogRef.close();
  }

}
