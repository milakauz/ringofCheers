import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from "@angular/material/dialog";
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, query, collection, addDoc, onSnapshot, updateDoc, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
// import { query } from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  fireStore: Firestore = inject(Firestore);
  pickCardAnimation = false;
  currentCard: string = '';
  name!: string;
  game!: Game;
  gameId!: string;

  constructor(private firestore: Firestore, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.newGame();
    //subscribing to the Observable (params) of route. Everytime they change this arrow function will be executed
    this.route.params.subscribe(async (params) => {
      console.log(params['id']);

      const unsub = onSnapshot(doc(this.fireStore, 'games', params['id']), (game: any) => {
        if (game.id === params['id']) {
          console.log('Update:', game.data());
          this.game.currentPlayer = game.data().currentPlayer;
          this.game.playedCards = game.data().playedCards;
          this.game.players = game.data().players;
          this.game.stack = game.data().stack;
          console.log(game.data().players);
        }
        
      })
    })
  }

  async newGame() {
    this.game = new Game();
    // console.log(this.game.players[0]);
    
    // let colRef = collection(this.fireStore, 'games');
    // let docRef = await addDoc(colRef, this.game.toJson());
    // // await updateDoc(docRef, this.game.toJson())
    // console.log(docRef.id);
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
