<template>
	<div id="gameboard">
		<div id="green" class="game-section" :class="classes['green']" @click="playerPressed('green')"></div>
		<div id="red" class="game-section" :class="classes['red']" @click="playerPressed('red')"></div>
		<div id="yellow" class="game-section" :class="classes['yellow']" @click="playerPressed('yellow')"></div>
		<div id="blue" class="game-section" :class="classes['blue']" @click="playerPressed('blue')"></div>
		<div id="controls">
			<div id="title">SIMON</div>
			<div id="switches">
				<label for="power" class="toggle">
	            	<input type="checkbox" id="power" class="toggle__input" @click="togglePower">
	            	<span class="toggle__button"></span>
	          	</label>
				<button class="button" id="start" @click="startGame">Start</button>
				<label for="sound" class="toggle">
	            	<input type="checkbox" id="sound" class="toggle__input" @click="muted = !muted">
	            	<span class="toggle__button"></span>
	          	</label>
			</div>
			<div class="text">
				<span>POWER</span>
				<span>SOUND</span>
			</div>
			<div id="display" v-text="display"></div>
			<div class="text">
				<span class="center">ROUND</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Simon from '../Simon.js';

	export default {
		data() {
			return {
				simon: new Simon(10),
    			display: '',
 				muted: true,
    			power: false,
    			intervalId: '',
    			allowPlayerInput: false,
    			lightsFlashedThisRound: 0,
    			colors: {
    				green: {
    					flashed: false,
    					sound: new Audio('/sounds/green.mp3')
    				},
	    			red: {
    					flashed: false,
    					sound: new Audio('/sounds/red.mp3')
    				},
	    			blue:  {
    					flashed: false,
    					sound: new Audio('/sounds/blue.mp3')
    				},
	    			yellow:  {
    					flashed: false,
    					sound: new Audio('/sounds/yellow.mp3')
    				}	
    			}
			}
		},
		methods: {
			startGame() {
				if (!this.power) return;

				this.resetGame();
    
			    this.simon.makeChoices();

			    this.intervalId = setInterval(this.lightSequence, 800);
			},
			playerPressed(color) {
				if (!this.allowPlayerInput) return;
    
		    	this.simon.playerSelected(color);
			    this.checkPlayersInput();
			    this.flash(color);

			    setTimeout(() => {
			        this.clearColors();
			    }, 300);
			},
			lightSequence() {
			    this.allowPlayerInput = false;

			    this.clearColors();

			    if (this.allColorsShownForRound()) {
			        clearInterval(this.intervalId);
			        this.allowPlayerInput = true;

			        return;
			    }

			    setTimeout(() => {
			       this.flash(this.simon.order[this.lightsFlashedThisRound]);
			       this.lightsFlashedThisRound++;
			    }, 200);
			},
			checkPlayersInput() {
			    if (this.simon.wasGuessIncorrect()) {
			    	this.simon.playerGuessedIncorrectly();

			        this.display = ":-(";
			    	this.flashAllColors();
			        this.allowPlayerInput = false;

			        return;
			    }

			    if (this.simon.isFinalRound() && this.simon.guessesAreCorrect) {
			        this.playerWins();

			        return;
			    }

			    if (this.simon.isLastGuessOfRound() && this.simon.guessesAreCorrect) {
			        this.simon.resetPlayerSelections();
			        this.lightsFlashedThisRound = 0;
			        this.display = ++this.simon.round;
			        this.intervalId = setInterval(this.lightSequence, 800);
			    }
			},
			playerWins() {
			    this.display = ':-)';
			    this.allowPlayerInput = false;
			    this.simon.gameOver = true;
			},
			togglePower() {
				this.power = !this.power;
				if (!this.power) {
					this.display = '';
					this.allowPlayerInput = false;
					this.simon.playerGuessedIncorrectly();

					return;
				}
				this.display = '--';
			},
			resetGame() {
				this.simon.reset();
			    
			    this.clearColors();
			    this.lightsFlashedThisRound = 0;
			    this.intervalId = 0;
			    this.display = this.simon.round;
			},
			flash(color) {
			    if (!this.muted) this.colors[color]['sound'].play();
			    
			    this.colors[color]['flashed'] = true;
			},
			flashAllColors(status = true) {
	            this.colors['green']['flashed'] = status;
	            this.colors['red']['flashed'] = status;
	            this.colors['blue']['flashed'] = status;
	            this.colors['yellow']['flashed'] = status;
			},
			clearColors() {
			    this.flashAllColors(false);
			},
			allColorsShownForRound() {
				return this.lightsFlashedThisRound === this.simon.round;
			}
		},
		computed: {
			classes() {
				return {
					green: {
						flash: this.colors['green']['flashed'], 
						win: this.simon.gameOver && this.simon.guessesAreCorrect,  
					},
    				red: {
    					flash: this.colors['red']['flashed'], 
    					win: this.simon.gameOver && this.simon.guessesAreCorrect,  
    				},
    				yellow: {
    					flash: this.colors['yellow']['flashed'], 
    					win: this.simon.gameOver && this.simon.guessesAreCorrect,  
    				},
    				blue: {
    					flash: this.colors['blue']['flashed'], 
    					win: this.simon.gameOver && this.simon.guessesAreCorrect,  
    				}
				}
			}
		}
	}
</script>
