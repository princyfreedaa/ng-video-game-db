import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrow } from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor{
  constructor(){}
  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error);
        return observableThrow(error);
      })
    )
  }
}
