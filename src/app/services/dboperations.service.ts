import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';  // Firebase modules for Database, Data list and Single object

export interface Employee {
  id:string;
  emp_id:number;
  name: string;
  email:string;
}

@Injectable({
  providedIn: 'root'
})
export class DboperationsService {
  
  employeesRef!: AngularFireList<any>;    // Reference to emoloyee data object
  employeeRef!: AngularFireObject<any>;
  constructor(private db:AngularFireDatabase) { 
    // this.databaseRef = db.database.ref();
  }


  //create a employee
  Addemoloyee(emoloyee: Employee) {
    this.employeesRef.push({
      id:emoloyee.id,
      name: emoloyee.name,
      email: emoloyee.email,
      emp_id: emoloyee.emp_id
    })
  }

 // Fetch Single employee Object
  GetEmployee(id: string) {
    this.employeeRef = this.db.object('employees-list/' + id);
    console.log(this.employeeRef,"get employee")
    return this.employeeRef;
  }

  // Fetch employees List
  GetEmployeesList() {
    this.employeesRef = this.db.list('employees-list');
    return this.employeesRef;
  }  

  //  Update Student Object
  UpdateEmployee(employee: Employee) {
    console.log("update emp")
    this.employeeRef.update({
      name: employee.name,
      email: employee.email,
      emp_id: employee.emp_id
    })
  }  

  // Delete Student Object
  Deleteemployee(id: string) { 
    this.employeeRef = this.db.object('employees-list/'+id);
    this.employeeRef.remove();
  }
  
}
