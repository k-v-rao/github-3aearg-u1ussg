import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';
import { DboperationsService } from 'src/app/services/dboperations.service';
import {MatDialog} from '@angular/material/dialog';
import { EmployeeInputDailogComponent } from '../employee-input-dailog/employee-input-dailog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface Employee {
  id:string|null;
  emp_id:number;
  name: string;
  email:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Employee!: Employee[]; //this variable for push the get data from api response
  
  

  constructor(private api:DboperationsService,
    public dialog: MatDialog,private _snackBar: MatSnackBar) { }
    openSnackBar(message:string) {
      this._snackBar.open(message, 'close', {
        horizontalPosition:'right' ,
        verticalPosition: 'bottom',
        duration:5000,
        panelClass: ['blue-snackbar']
      });
    }

  @ViewChild(MatTable) table: MatTable<any> | undefined;

   ngOnInit():void {
    //to load the data on init state
   let e = this.api.GetEmployeesList(); 
   e.snapshotChanges().subscribe(data => {
      this.Employee = [];
      console.log()
      data.forEach((item) => {
        let a = item.payload.toJSON() as Employee;
        a.id=item.key;
        this.Employee.push(a);
      });
      this.dataSource = this.Employee;
    })

  }

  allUsers:Employee[]=[];
  displayedColumns: string[] = ['emp_id', 'name','email','actions'];
  dataSource = this.Employee;

 async addEmployeeData(){
     const dialogRef = this.dialog.open(EmployeeInputDailogComponent,{width:"300px",data:{name:"",email:"",isEdit:false},disableClose:true});
     let lastData;
     let newEmployeeId;
    dialogRef.afterClosed().subscribe(result => {
      //to generate the id auto
      if(this.dataSource.length>0){
        lastData=this.dataSource[this.dataSource.length-1];
        newEmployeeId=lastData.emp_id+1
      }else{
        newEmployeeId=1
      }
      this.api.Addemoloyee({name:result.name,email:result.email,emp_id:newEmployeeId,id:""})
    this.openSnackBar("Employee added")
    });
}

deleteEmployee(element:any){
  this.api.Deleteemployee(element.id)
  this.openSnackBar("Employee deleted")
}

async editEmployee(e:any){
  const dialogRef = this.dialog.open(EmployeeInputDailogComponent,{width:"300px",data:{name:e.name,email:e.email,isEdit:true,id:e.id,emp_id:e.emp_id},disableClose:true});
    dialogRef.afterClosed().subscribe(result => {
      //to generate the id auto
      this.api.GetEmployee(e.id);
    this.api.UpdateEmployee(result) 
    this.openSnackBar("Updated sucessfully")  
   });
 
}

}
