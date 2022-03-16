import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { PeriodicElement } from '../employee';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  empAdded = new Subject<PeriodicElement[]>();
  private getallEmployees: PeriodicElement[] = [];
  constructor(private http: HttpClient) { }

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


}
