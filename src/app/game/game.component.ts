import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);

  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    //only clicking on stack and picking card if boolean is false. It's only possible every 1.5s.
    if (!this.pickCardAnimation) {
      // last value from array will be returned and deleted
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        console.log('new card:' + this.currentCard);
        console.log(this.game);
      }, 1000);
    }
  }

}
