import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

import { forkJoin, Observable } from 'rxjs';
import { APIResponse, Game } from '../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  getGameList(ordering:string,search?:string):Observable<APIResponse<Game>>{

    let paramValue = new HttpParams();
    paramValue = paramValue.set('ordering',ordering);
    if(search){
      paramValue = paramValue.set('search',search);
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`,{
      params:paramValue
    });

  }

  getGameDetails(id):Observable<Game> {
    const gameInfoRequest =  this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games/${id}`);
    const gameTrailorRequest =  this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotRequest =  this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games/${id}/screenshots`);

    var a = {};

    return forkJoin([
      gameInfoRequest,gameTrailorRequest,gameScreenshotRequest
    ]).pipe(map((res:any) => {
      return {
        ...res[0],
        trailors: res[1].results,
        screenshots: res[2].results,
      }
    }));
  }
}
