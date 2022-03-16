import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './component/details/details.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { HomeComponent } from './component/home/home.component';
import { MapComponent } from './component/map/map.component';
import { TodoComponent } from './component/todo/todo.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'search/:game-search', component:HomeComponent},
  {path: 'details/:id', component:DetailsComponent},
  {path: 'todo', component:TodoComponent},
  {path: 'employee', component:EmployeeComponent},
  {path: 'map', component:MapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
