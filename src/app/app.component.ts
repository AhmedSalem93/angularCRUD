import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/employee';

@Component({
  selector: 'app-root',
  imports: [ ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parsData = JSON.parse(oldData);
      this.employeeList = parsData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      PinCode: new FormControl(this.employeeObj.PinCode, [
        Validators.required,
        Validators.minLength(6),
      ]),
      address: new FormControl(this.employeeObj.address),
      city: new FormControl(this.employeeObj.city),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailId: new FormControl(this.employeeObj.emailId),
      name: new FormControl(this.employeeObj.name, [Validators.required]),
      state: new FormControl(this.employeeObj.state),
    });
  }
  onSave() {
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parsData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parsData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
   this.reset()
  }
  onEdit(item: EmployeeModel) {
    this.employeeObj = item;
    this.createForm();
  }
  onUpdate() {
    const record = this.employeeList.find(
      (m) => m.empId == this.employeeForm.controls['empId'].value
    );
    if (record != undefined) {
      record.PinCode = this.employeeForm.controls['PinCode'].value;
      record.address = this.employeeForm.controls['address'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.state = this.employeeForm.controls['state'].value;
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.reset()
  }

  reset() {this.employeeObj = new EmployeeModel();
    this.createForm();}

  onDelete(id: number) {
    const isDeleted = confirm('Are you sure?');
    if (isDeleted) {
      const index = this.employeeList.findIndex((m) => m.empId == id);
      this.employeeList.splice(index, 1);
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    }
  }
}
