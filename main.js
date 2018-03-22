class Card {
	constructor(value, display){
		this._value = value
		this._display = display
	}
	get value (){
		return this._value
	}
}
class Deck {
	constructor(){
		this._cards = []
		
		for (let i = 1; i <= 9; i++){
			let value = i
			let display = i
			this._cards.push(new Card(value,display))
			this._cards.push(new Card(value,display))
		}
	}

	get cards (){
		return this._cards
	}
	shuffle() {
	    for (let i = this._cards.length - 1; i > 0; i--) {
	        let j = Math.floor(Math.random() * (i + 1))
	        let x = this._cards[i]
	        this._cards[i] = this._cards[j]
	        this._cards[j] = x
    }
  }
}
class Memory {
	constructor(){
		this.gameBoard = $('#gameContainer')
		this._gameDeck = aDeck
	}

	get gameDeck (){
		return this._gameDeck
	}
	display(){
		this.gameDeck.cards.forEach(card =>{
			// console.log(card)
			this.gameBoard.append(`
				<div class="card">
					<div class="front">${card.value}</div>
					<div class="back">Back</div>
				</div>
				`)
		})
	}
	cardclick(){
		console.log('working')
	}
}
let aDeck = new Deck()
let game = new Memory()

aDeck.shuffle()
game.display()

$( document ).ready(function() {
    $("#gameContainer").on('click', '.back', function(){
    	game.cardclick()
    })
});