const images = ['resources/charmander.svg', 'resources/gameboy.svg', 'resources/master-ball.svg', 'resources/multiple-pokeballs.svg', 'resources/phone.svg', 'resources/pikachu.svg', 'resources/pokeball.svg', 'resources/pokestop.svg', 'resources/squirtle.svg']
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
			let display = images[i - 1]
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
		this._score = 0
		this._lives = 8
		this._gameOver = false
		this._timer = 90
	}

	get gameDeck (){
		return this._gameDeck
	}
	get storage (){
		return this._storage
	}
	get lives(){
		return this._lives
	}
	get countdown(){
		if (this._timer > 0 && this._gameOver === false){
			this._timer -=1
			$('#timeRemaining').text(`Time Remaining: ${this._timer}`)
		}
	}

	// get score
	display(){
		$('#livesRemaining').text(`Lives Remaining: ${this.lives}`)
		this.gameDeck.cards.forEach(card =>{
			this.gameBoard.append(`
				<div class="card" title="${card.value}">
					<div class="back"><img src="${card.display}" class="cardPics"/></div>
					<div class="front"><img src="resources/snorlax.svg" class="snorlax"/></div>
				</div>
				`)
		})
	}
	cardclick(filterNum){
		 this._storage.push(this.gameDeck.cards.filter(card => card.value === parseInt(filterNum))[0])
	}
	compare(){
		$('.open').flip(true)
		if (this.storage.length === 2){
			if (this.storage[0].value === this.storage[1].value){
				console.log($('.correct').siblings('.back'))
				$('.open').addClass('correct').removeClass('open')
				$('.correct').off(".flip")
				$('.correct .back').css('background-color', 'rgb(100,202,87)')

			} else {
				setTimeout(function(){
					$('.card').siblings('.open').flip(false).removeClass('open')
				}, 1000)
				this._lives -= 1
				
			}
			this._storage = []
			console.log(this._lives)
			console.log(this.storage)
		}
	
		
	}
	gamestatus(){
		$('#livesRemaining').text(`Lives Remaining: ${this.lives}`)

		if($('.correct').length === this.gameDeck.cards.length){
			$('body').css('background-color', '#7EF0BA') 
			if(this._gameOver === false){
				$('#mainContainer').append(`<button id="restartGood">Play Again?</button>`)
				$('#restartGood').on('click', function(e){
					e.preventDefault()
					window.location.reload(true);
				})
			}
			this._gameOver = true
		}
		if(this._lives === 0 || this._timer === 0){
			$('body').css('background-color', '#f00') 
			setTimeout(()=>{
				$('.card').flip(true)
				$('.card').addClass('open')
			}, 1001)
			if(this._gameOver === false){
				$('#mainContainer').append(`<button id="newGame">Try Again?</button>`)
				$('#newGame').on('click', function(e){
					e.preventDefault()
					window.location.reload(true);
				})
			}
			this._gameOver = true
		}
	}
}

// let aDeck = new Deck()
// let game = new Memory()

// aDeck.shuffle()
// game.display()
let aDeck


$( document ).ready(function() {

	$('#newGame').on('click', function(e){
		e.preventDefault()
		aDeck = new Deck()
		let game = new Memory()

		aDeck.shuffle()
		game.display()

		$('.card').flip({
			trigger: 'manual'
		})
	
		setInterval(()=> {	
			game.countdown
			game.gamestatus()
		}, 1000)

	    $("#gameContainer").on('click', '.card', function(){
	    	if(!$(this).hasClass('open') && !$(this).hasClass('correct') ){
				game.cardclick($(this).attr('title'))
				$(this).addClass('open')
			}   	
	    	game.compare()
	    	game.gamestatus()
	    })
	    $('#newGame').remove()
	})
});