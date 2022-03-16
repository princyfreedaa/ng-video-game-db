import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  gameRating = '0';
  gameId: string;
  game:Game;
  routeSub:Subscription;
  gameSub:Subscription;

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }


  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params:Params) => {
      this.gameId = params.id;
      this.gameGameDetails(this.gameId);
    })
  }
  gameGameDetails(gameId: string) {
    this.gameSub = this.httpService.getGameDetails(gameId).subscribe((data:Game) => {
        this.game = data;
        console.log(this.game);
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        },1000)
    })
  }

  getColor(value: number): string {
    if(value > 75)
    return '#5ee432';
    else if(value > 50)
    return 'fffa50';
    else if(value > 30)
    return 'f7aa38';
    else return '#ef4655';
  }
  ngOnDestroy(){
    if(this.routeSub)
    this.routeSub.unsubscribe();
    if(this.gameSub)
    this.gameSub.unsubscribe();
  }
}
