import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from "@angular/material/dialog";
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, query, collection, addDoc, onSnapshot, updateDoc, doc, getDoc, getDocs, deleteDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
// import { query } from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  fireStore: Firestore = inject(Firestore);

  name!: string;
  game!: Game;
  gameId!: string;
  unsubGames;

  constructor(private firestore: Firestore, public dialog: MatDialog, private route: ActivatedRoute) {
    this.setGameId();
    this.unsubGames = this.subGame();
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  setGameId() {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];;
    })
  }

  subGame() {
    return onSnapshot(doc(this.fireStore, 'games', this.gameId), (game: any) => {
      console.log('Update:', game.data());
      this.game.currentPlayer = game.data().currentPlayer;
      this.game.playedCards = game.data().playedCards;
      this.game.players = game.data().players;
      this.game.stack = game.data().stack;
      this.game.pickCardAnimation = game.data().pickCardAnimation;
      this.game.currentCard = game.data().currentCard;
    })
  }

  async updateGame() {
    if (this.gameId) {
      let docRef = doc(collection(this.fireStore, 'games'), this.gameId);
      await updateDoc(docRef, this.game.toJson()).catch((error) => {
        console.log(error);
      })
    }
  }

  ngOnDestroy() {
    this.unsubGames();
  }

  takeCard() {
    //only clicking on stack and picking card if boolean is false. It's only possible every 1.5s.
    if (!this.game.pickCardAnimation) {
      // last value from array will be returned and deleted
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      // current Player should start from beginning after reaching last player. 
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.updateGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGame();
      }
    });
  }

}
