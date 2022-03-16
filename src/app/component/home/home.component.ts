import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/model';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sortval:string;
  public games:Array<Game>;

  private routeSub:Subscription;
  private gameSub: Subscription;


  constructor(public httpService: HttpService,
    private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe((params:Params) => {
      if(params['game-search']){
          this.searchGame('metacrit',params['game-search']);
      }
      else{
        this.searchGame('metacrit');
      }
    })
  }
  searchGame(sort:string, search?:string){
    this.gameSub = this.httpService.getGameList(sort,search).subscribe((gameList:APIResponse<Game>) => {
      this.games = gameList['results'];
      console.log(this.games);
    })
  }
  openGameDetails(gameId:number){
    this.router.navigate(['details',gameId]);
  }

  ngOnDestroy() {
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
    if(this.gameSub){
      this.gameSub.unsubscribe();
    }
  }

}
