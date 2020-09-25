const deck = {
  aceSpades: [1, 11],
  aceHearts: [1, 11],
  aceDiamonds: [1, 11],
  aceClubs: [1, 11],
  kingSpades: 10,
  kingHearts: 10,
  kingDiamonds: 10,
  kingClubs: 10,
  queenSpades: 10,
  queenHearts: 10,
  queenDiamonds: 10,
  queenClubs: 10,
  jackSpades: 10,
  jackHearts: 10,
  jackDiamonds: 10,
  jackClubs: 10,
  tenSpades: 10,
  tenHearts: 10,
  tenDiamonds: 10,
  tenClubs: 10,
  nineSpades: 9,
  nineHearts: 9,
  nineDiamonds: 9,
  nineClubs: 9,
  eightSpades: 8,
  eightHearts: 8,
  eightDiamonds: 8,
  eightClubs: 8,
  sevenSpades: 7,
  sevenHearts: 7,
  sevenDiamonds: 7,
  sevenClubs: 7,
  sixSpades: 6,
  sixHearts: 6,
  sixDiamonds: 6,
  sixClubs: 6,
  fiveSpades: 5,
  fiveHearts: 5,
  fiveDiamonds: 5,
  fiveClubs: 5,
  fourSpades: 4,
  fourHearts: 4,
  fourDiamonds: 4,
  fourClubs: 4,
  threeSpades: 3,
  threeHearts: 3,
  threeDiamonds: 3,
  threeClubs: 3,
  twoSpades: 2,
  twoHearts: 2,
  twoDiamonds: 2,
  twoClubs: 2,
};

////START OF GAME FUNCTIONALITY////
const endGame = () => {
  alert(`Maybe next time!`);
  window.stop();
};

const runGame = () => {
  let roundsCompleted = 0;

  class UserCreator {
    constructor(name) {
      this.name = name;
      this.roundsWon = 0;
      this.roundsLost = 0;
      this.hand = [];
      this.currentValue = 0;
    }

    deal() {
      let keys = Object.keys(deck);
      let drawnCard = deck[keys[(keys.length * Math.random()) << 0]];
      delete deck[keys[(keys.length * Math.random()) << 0]];
      this.hand.push(drawnCard);
    }

    check21() {
      if (player.currentValue === 21) {
        return player.win();
      } else if (robot.currentValue === 21) {
        return player.lost();
      }
    }

    bust() {
      if (this.currentValue > 21) {
        if (this === robot) {
          alert(`${this.name} busted!`);
          return player.win();
        } else if (this === player) {
          alert(`${this.name} you busted!`);
          return this.lost();
        }
      }
    }

    lost() {
      if (roundsCompleted < 3) {
        alert(`I am sorry ${this.name}!\n You have lost this hand!\n
          Your hand was ${player.hand} valued at ${player.currentValue}.\n
          The Dealer's hand was ${robot.hand} valued at ${robot.currentValue}`);
      } else {
        alert(
          `I am very sorry ${this.name}!\n You have lost the game!\n You lost ${this.roundsLost} rounds this game!`
        );
        let playAgain = confirm(`Would you like to play again ${this.name}?`);
        if (playAgain === true) {
          runGame();
        } else {
          endGame();
        }
      }
      this.roundsLost++;
      roundsCompleted++;
      player.hand = [];
      robot.hand = [];
      robot.currentValue = 0;
      player.currentValue = 0;
      alert(`This round is over. Get ready for the next round!`);
      return startRound();
    } //lost end bracket

    win() {
      if (roundsCompleted < 3) {
        alert(`Congratulations ${this.name}!\n You have won this hand! Your hand was ${player.hand} valued at ${player.currentValue}.\n
          The Dealer's hand was ${robot.hand} valued at ${robot.currentValue}`);
      } else {
        alert(
          `Congratulations ${this.name}!\n You have won the game!\n You won ${this.roundsWon} rounds this game!`
        );
        let playAgain = confirm(`Would you like to play again ${this.name}?`);
        if (playAgain === true) {
          runGame();
        } else {
          endGame();
        }
      }
      this.roundsWon++;
      roundsCompleted++;
      player.hand = [];
      robot.hand = [];
      robot.currentValue = 0;
      player.currentValue = 0;
      alert(`This round is over. Get ready for the next round!`);
      return startRound();
    } //win end bracket

    updateCardValue() {
      if (this === player) {
        for (let i = 0; i < this.hand.length; i++) {
          let elem = this.hand[i];
          if (Array.isArray(elem)) {
            let chosenNum = parseInt(
              prompt(
                `${this.name} you were dealt an ace! Choose between the value of 1 or 11`,
                `1 or 11`
              ),
              10
            );
            this.hand.splice(i, 1, chosenNum);
          }
        }
        this.currentValue = this.hand.reduce((a, b) => a + b);
      } else if (this === robot) {
        if (Array.isArray(this.hand[0]) && Array.isArray(this.hand[1])) {
          this.currentValue = 12;
        } else {
          for (let i = 0; i < this.hand.length; i++) {
            if (Array.isArray(this.hand[i])) {
              let indexOfAce = i;
              let copyHand = this.hand.slice().flat();
              let chooseOneSum = copyHand.reduce((a, b) => a + b) - 11;
              let choose11Sum = copyHand.reduce((a, b) => a + b) - 1;
              if (choose11Sum >= 17 && choose11Sum <= 21) {
                this.currentValue = choose11Sum;
                this.hand.splice(indexOfAce, 1, 11);
              } else {
                this.currentValue = chooseOneSum;
                this.hand.splice(indexOfAce, 1, 1);
              }
            }
          }
        }
      }
      this.currentValue = this.hand.reduce((a, b) => a + b);
    } //updateCardValue end bracket
  } //UserCreator end bracket

  const playerName = prompt(
    "Let's play Manchego BlackJack!\n Enter your name.",
    "name"
  );
  const player = new UserCreator(playerName);
  const robot = new UserCreator("Dealer");
  const firstResponse = confirm(
    `Ready to play Manchego BlackJack ${player.name}? Remember you are trying to get as close to 21 without busting. Aces are worth 1 or 11 and you get to pick! Ready?`
  );
  if (firstResponse) {
    alert(`Good luck ${player.name}!!!`);
    startRound();
  } else {
    endGame();
  }

  function startRound() {
    if (roundsCompleted === 3) {
      if (player.roundsWon > robot.roundsWon) {
        player.win();
      } else {
        player.lost();
      }
    }

    player.deal();
    player.deal();
    alert(`You were dealt ${player.hand}`);
    player.updateCardValue();
    player.check21();
    robot.deal();
    robot.deal();
    robot.updateCardValue();
    robot.check21();
    let hitOrStay = prompt(
      `${player.name} this is you hand: ${player.hand}.\nThis is the ${robot.name} hand: ${robot.hand[0]}\n Would you like to hit or stay?`,
      "hit or stay?"
    );

    while (hitOrStay === "hit" && player.currentValue < 21) {
      player.deal();
      player.updateCardValue();
      player.bust();
      hitOrStay = prompt(
        `${player.name} this is you hand: ${player.hand}.\nThis is the ${robot.name} hand: ${robot.hand[0]}\n Would you like to hit or stay?`,
        "hit or stay?"
      );
    }

    if (hitOrStay === "stay" && hitOrStay !== "hit") {
      while (robot.currentValue < 16) {
        robot.deal();
        robot.updateCardValue();
        alert(
          `${player.name} this is your hand: ${player.hand}.\nThis is the ${robot.name} hand: ${robot.hand}`
        );
        robot.bust();
        // if (robot.currentValue > 21) {
        //   alert(`Dealer busted!`);
        //   return startRound();
      }
      if (robot.currentValue < 21 && robot.currentValue >= 16) {
        if (player.currentValue > robot.currentValue) {
          alert(`${player.hand} vs. ${robot.hand}`);
          return player.win();
        } else return player.lost();
      }
    }
  } // <---- runGame curly bracket
}; // <----- runGame();

runGame();
