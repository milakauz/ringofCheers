import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Waterfall of Compliments', description: 'Everyone starts by giving a compliment to the person on their right, and this goes around in a circle until it reaches back to the starting person. The compliments should be sincere and can be about anything positive you have noticed about the person.' },
    { title: 'Two Truths and a Lie', description: 'The player who draws picks three things to share about themselves: two truths and one lie. The others guess which is the lie.' },
    { title: 'Three Wishes', description: 'The drawer of the card states three wishes they would make if they had a magic lamp. The crazier the better :)' },
    { title: 'Floor is Lava', description: 'As soon as the card is drawn, everyone must elevate their feet off the ground. The last person to do so must share an embarrassing story.' },
    { title: 'Hive Mind', description: 'The drawer chooses a category (e.g., animals, movies). Everyone must go around the circle naming items in that category. The first person to hesitate or repeat an item has to do a silly dance.' },
    { title: 'Six Picks', description: 'The player draws six random items from a bag filled with miscellaneous objects and must create a quick story involving all items.' },
    { title: 'Seventh Heaven', description: 'When this card is drawn, everyone must raise their hands to "seventh heaven". The last person to raise their hands must lead a group stretch or yoga pose for 5 minutes.' },
    { title: 'Mate of Fate', description: 'The drawer chooses a "mate", and whenever they have to do a task from a card, their mate has to do it with them until someone else draws an 8.' },
    { title: 'Rhyme Time', description: 'The drawer says a word, and players must go around the circle giving words that rhyme with it. The first who breaks the rhyme sequence must then share a positive life goal with the group.' },
    { title: 'Tent of Giving', description: 'Create a "tent" with your hands. each player takes a turn to share an act of kindness or service they plan to perform in the coming week for someone else. This could be helping a neighbor, volunteering, or any gesture that contributes to the well-being of another person or the community.' },
    { title: 'Jumping Jacks', description: 'Everyone must do ten jumping jacks.' },
    { title: 'Queen´s Decree', description: 'The drawer becomes "Queen" and makes a rule that all players must follow for the rest of the game, such as speaking in accents, not using personal names, or standing up whenever they talk.' },
    { title: 'Kind King', description: 'The drawer of the King card chooses someone to be kind to. This can involve giving a genuine compliment, offering a helping hand with something after the game, or simply sharing why that person is appreciated.' },
  ];

  title: string = '';
  description: string = '';
  @Input() card!: string;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
      console.log(cardNumber);
    }
  }
}
