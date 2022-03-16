import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/model';

@Component({
  selector: 'app-games-tab',
  templateUrl: './games-tab.component.html',
  styleUrls: ['./games-tab.component.css']
})
export class GamesTabComponent implements OnInit {

  @Input() gametab: Game;
  constructor() { }

  ngOnInit() {
    console.log(this.gametab);
  }

}
