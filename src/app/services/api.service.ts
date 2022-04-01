import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { PeriodicElement } from '../employee';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  empAdded = new Subject<PeriodicElement[]>();
  private getallEmployees: PeriodicElement[] = [];
  constructor(private http: HttpClient) { }

  private subjectName = new Subject<any>(); //need to create a subject

  postEmployee(data:any){
    return this.http.post<any>('http://localhost:3000/posts', data).pipe(map((res:any) => {
      return res;
    }))
}
getEmployee(){
   return this.http.get<any>('http://localhost:3000/posts').pipe(map((res:PeriodicElement[]) => {
    this.getallEmployees = res;
    this.empAdded.next(this.getallEmployees.slice());
     return this.getallEmployees
  }))
}
updateEmployee(data,id){
  return this.http.put<any>('http://localhost:3000/posts/'+id,data).pipe(map((res:any) => {
    return res;
  }))
}

getEmployeeById(id){
  return this.http.get<any>('http://localhost:3000/posts/'+id).pipe(map((res:any) => {
    return res;
  }))
}

deleteEmployee(id){
  return this.http.delete<any>('http://localhost:3000/posts/'+id).pipe(map((res:any) => {
    return res
  }))
}



sendUpdate(emp: PeriodicElement[] ) { //the component that wants to update something, calls this fn
    this.subjectName.next(emp); //next() will feed the value in Subject
}

getUpdate(): Observable<any> { //the receiver component calls this function
  return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
}

}
