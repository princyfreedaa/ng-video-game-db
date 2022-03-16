import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatDialogRef, MatTableDataSource} from "@angular/material";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { PeriodicElement } from 'src/app/employee';
import { ApiService } from 'src/app/services/api.service';
import { user } from './user.dashboard';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  myForm: FormGroup;
  description:string;
  userObj = new user();

  constructor( private fb: FormBuilder, private dialogRef: MatDialogRef<UserProfileComponent>,private apiServe:ApiService,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  editMode:boolean = false;

  ngOnInit() {

  console.log(this.data)
  if(this.data){
    this.editMode = true;
    this.myForm = this.fb.group({
      firstName: [this.data.firstName],
      lastName:[this.data.lastName],
      email:[this.data.email],
      salary:[this.data.salary],
      mobile:[this.data.mobile],
      id:[this.data.id]
    })
  }
  else{
    this.editMode = false;
    this.myForm = this.fb.group({
      firstName: [''],
      lastName:[''],
      email:[''],
      salary:[''],
      mobile:[''],
      id:['']
    })
  }

  }
  save() {
    this.dialogRef.close(this.myForm.value);
}

close() {
  this.editMode = false;
    this.dialogRef.close();
}

reactiveForm() {
  this.myForm = this.fb.group({
    firstName: [''],
    lastName:[''],
    email:[''],
    salary:[''],
    mobile:[''],
    id:['']
  })
}

submitForm() {



  this.userObj.firstName = this.myForm.value.firstName;
  this.userObj.lastName = this.myForm.value.lastName;
  this.userObj.email = this.myForm.value.email;
  this.userObj.salary = this.myForm.value.salary;
  this.userObj.mobile = this.myForm.value.mobile;

  if(this.editMode == true){
    this.apiServe.updateEmployee(this.userObj,this.data.id).subscribe(res => {
      this.dialogRef.close();
    }, err => console.log(err))
  }

  else{
    this.apiServe.postEmployee(this.userObj).subscribe(res => {
      this.dialogRef.close();
    }, err => console.log(err))

  }
  this.editMode == false;
  this.apiServe.getEmployee().subscribe((data:PeriodicElement[]) => {
    return this.dataSource.data = data;
  });
}


}
