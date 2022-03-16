import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { GaugeModule } from 'angular-gauge';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/List';
import { MatDialogContent, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { HomeComponent } from './component/home/home.component';
import { HttpHeaderInterceptor } from './interceptors/http-header.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

import { CommonModule } from '@angular/common';
import { DetailsComponent } from './component/details/details.component';
import { GamesTabComponent } from './component/games-tab/games-tab.component';
import { TodoComponent } from './component/todo/todo.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule, MatTableModule } from '@angular/material';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { MapComponent } from './component/map/map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    DetailsComponent,
    GamesTabComponent,
    TodoComponent,
    EmployeeComponent,
    UserProfileComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    GaugeModule.forRoot(),
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHKauSSlrF3asDS3G70yqItxzJ6Ow6dzg'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi:true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi:true,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [UserProfileComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
