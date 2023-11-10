import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from "./../../models/game";
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  fireStore: Firestore = inject(Firestore);
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  newGame() {
    let game = new Game();
    const colRef = collection(this.fireStore, 'games');
    addDoc(colRef, game.toJson()).then((gameData: any) => {
      console.log(gameData['id']);
      this.router.navigateByUrl('/game/' + gameData['id']);
    })
  }
}
