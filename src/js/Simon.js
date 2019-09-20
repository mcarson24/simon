export default class Simon {

	constructor(gameLength = 2) {
		this.order = [];
		this.round = 1;
		this.gameOver = '';
		this.playersSelections = [];
		this.gameLength = gameLength;
		this.guessesAreCorrect =  true;
		this.choices = ['red', 'yellow', 'green', 'blue'];
	}

	makeChoices() {
		for (let i = 0; i < this.gameLength; i++) {
			this.order.push(
				this.choices[
					Math.floor(Math.random() * 4)
				]
			);
		}
	}

	reset() {
	    this.order = [];
	    this.round = 1;
		this.gameOver = false;
	    this.playersSelections = [];
	}

	playerSelected(color) {
		this.playersSelections.push(color);
	}

	playerGuessedIncorrectly() {
		this.gameOver = true;
		this.guessesAreCorrect = false;
	}

	wasGuessCorrect() {
		return this.playersSelections[this.playersSelections.length - 1] === this.order[this.playersSelections.length - 1]
	}

	wasGuessIncorrect() {
		return !this.wasGuessCorrect();
	}

	resetPlayerSelections() {
		this.playersSelections = [];	       
	}

	isLastGuessOfRound() {
		return this.round == this.playersSelections.length;
	}

	isFinalRound() {
		return this.playersSelections.length == this.gameLength;
	}
}
