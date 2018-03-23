class Card {
	constructor(value, display){
		this._value = value
		this._display = display
	}
	get value (){
		return this._value
	}
	get display(){
		return this._display
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
		this._storage = []
	}

	get gameDeck (){
		return this._gameDeck
	}
	get storage (){
		return this._storage
	}
	display(){
		this.gameDeck.cards.forEach(card =>{
			this.gameBoard.append(`
				<div class="card" title="${card.value}">
					<div class="back">${card.display}</div>
					<div class="front">Back</div>
				</div>
				`)
		})
	}
	cardclick(filterNum){
		 this._storage.push(this.gameDeck.cards.filter(card => card.value === parseInt(filterNum))[0])
	}
	compare(){
		if (this.storage.length === 2){
			if (this.storage[0].value === this.storage[1].value){
				$('.open').addClass('correct')
			} else {
				console.log(false)
				
			}
			this._storage = []
			console.log(this.storage)
			$("#gameContainer").find('.open').removeClass('open')
		}
	}
}
let aDeck = new Deck()
let game = new Memory()

aDeck.shuffle()
game.display()


$( document ).ready(function() {
	$('.card').flip({
		trigger: 'click'
	})
    $("#gameContainer").on('click', '.card', function(){
    	if(!$(this).hasClass('open') && !$(this).hasClass('correct') ){
			game.cardclick($(this).attr('title'))
			$(this).addClass('open')
		}   	
    	game.compare()
    })
});