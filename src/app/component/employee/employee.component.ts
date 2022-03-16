import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { PeriodicElement } from 'src/app/employee';
import { ApiService } from 'src/app/services/api.service';
import { HttpService } from 'src/app/services/http.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  dialogValues

  empAdded = new Subject<PeriodicElement>();

   ELEMENT_DATA: PeriodicElement[] = [];

  value : any = {};

  displayedColumns: string[] = ['EmployeeId', 'firstName','lastName', 'email_id', 'mobile','salary', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  constructor(public dialog: MatDialog, private apiService : ApiService) {}

  ngOnInit() {

this.getEmp();
  }


  onDelete(id:number){
    this.apiService.deleteEmployee(id).subscribe((data) => {
      console.log(data);
      console.log(`Employee with Id = ${id}deleted`)
    });
    //this.getEmp();
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(UserProfileComponent,dialogConfig);
  }


  onEdit(id:number){

    this.apiService.getEmployeeById(id).subscribe((data) => {
     this.dialogValues = data;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      email: this.dialogValues.email || '',
      firstName: this.dialogValues.firstName || '',
      id: this.dialogValues.id || '',
      lastName: this.dialogValues.lastName || '',
      mobile: this.dialogValues.mobile || '',
      salary: this.dialogValues.salary || '',
  };
  let dialogRef = this.dialog.open(UserProfileComponent,dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    this.value = result;
  });

  });
  }

  getEmp(){
     this.apiService.getEmployee().subscribe((data:PeriodicElement[]) => {
      return this.dataSource.data = data;
  });
  }


}


