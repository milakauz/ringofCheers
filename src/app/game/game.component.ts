import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from "@angular/material/dialog";
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  name!: string;
  game!: Game;

  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
    this.newGame();
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
      this.game.currentPlayer++;
      // current Player should start from beginning after reaching last player. 
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

}
