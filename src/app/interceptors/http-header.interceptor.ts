import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrow } from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor{
  constructor(){}
  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    req = req.clone({
      setHeaders:{
       // 'x-rapidapi-key':'20fdb408a9f04bcc978755dfcd059902',
        'x-rapidapi-key': 'hFzFag2ZrvtCtmY9H6VuqoP6koaTWsMX',
        'x-rapidapi-host':'rawg-video-games-database.p.rapidapi.com',
      },
      setParams:{
        key:'20fdb408a9f04bcc978755dfcd059902'
      }
    });
    return next.handle(req);
  }
}
