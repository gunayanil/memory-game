/* DOM Elements */
let cards = document.getElementsByClassName('card');
let card = [...cards];
let deck = document.querySelector('.deck');
const modal = document.getElementById('myModal');
let moveFinal = document.querySelector('.moveFinal');
let timeFinal = document.querySelector('.timeFinal');
let starFinal = document.querySelector('.starFinal');
const close = document.querySelector('.close');
let moveHTML = document.querySelector('.moves');
let timer = document.querySelector(".timer");
let stars = document.querySelector('.stars').children;

/* Variables */
let openedCards = [];
let moves = 0;
let matchCounter = 0;
let second = 0, minute = 0;
let interval;


// Knutch Shuffle
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

/** RESTART **/
function restartRes(){
	modal.style.display = "none";
	shuffle(card);
	
	while(deck.firstChild) { // First delete all items.
		deck.removeChild(deck.firstChild);
	}

	for(let i = 0; i < card.length; i++) { // Add shuffled card to the page
		deck.appendChild(card[i]);
		cards[i].classList.remove('show', 'open', 'match', 'disabled', 'animated', 'rubberBand');
	}

	if(stars[0].style.visibility === "hidden") { stars[0].style.visibility = "visible" }
	if(stars[1].style.visibility === "hidden") { stars[1].style.visibility = "visible" }
		
		moves = 0; matchCounter = 0; openedCards = []; second = 0; minute= 0;
		timer.innerHTML = "O mins 0 secs";
		moveHTML.textContent = moves;
		clearInterval(interval);
	}

/** DISPLAY - OPEN - CHECK - MOVE **/
	for(let i = 0; i < card.length; i++) {
		card[i].addEventListener('click', display);
		card[i].addEventListener('click', open);
	}

	function display() {
		this.classList.add('open', 'show', 'disabled');
	}

	function open() {
	openedCards.push(this);
	if(openedCards.length > 1) {
		check();
	}
}

function check() {
	move();

	if(openedCards[0].innerHTML === openedCards[1].innerHTML) {
		matched();
	} else {
		unmatched();
	}
}

function matched() {
	openedCards[0].classList.add('match', 'animated', 'rubberBand');
	openedCards[1].classList.add('match', 'animated', 'rubberBand');
	matchCounter++;
	openedCards = [];
	if (matchCounter === 8) {
		final();
	}
}

function unmatched() {
	openedCards[0].classList.add('animated', 'pulse');
	openedCards[1].classList.add('animated', 'pulse');
	openedCards[0].classList.remove('disabled');
	openedCards[1].classList.remove('disabled');
	Array.prototype.filter.call(card, function(cards){
		cards.classList.add('disabled');
	});
	
	setTimeout(function() {
		openedCards[0].classList.remove('animated', 'pulse', 'open', 'show');
		openedCards[1].classList.remove('animated', 'pulse', 'open', 'show');
		Array.prototype.filter.call(card, function(cards){
			cards.classList.remove('disabled');
		});
		openedCards = [];
	}, 700);
}

function move() {
	moves++;
	
	if (moves == 1) { // When moves = 1 start!
		startTimer();
	}

	if(moves > 8 && moves < 12) { 
		stars[0].style.visibility = "hidden";
	}

	if(moves > 12) {
		stars[1].style.visibility = "hidden";
	}
	moveHTML.textContent = moves;
}

function startTimer(){
	interval = setInterval(function(){
		timer.innerHTML = minute+" mins "+second+" secs";
		second++;
		if(second === 60){
			minute++;
			second=0;
		}
	},1000);
}

/** FINAL STATUS WITH MODAL **/
function final() {
	clearInterval(interval);
	
	modal.style.display = "block";
	moveFinal.innerHTML = moves;
	timeFinal.innerHTML = minute + " minutes " + second + " seconds";

	if(moves > 8 && moves < 12) { 
		starFinal.innerHTML = stars[1].innerHTML + stars[2].innerHTML;
	} else if(moves >= 12) {
		starFinal.innerHTML = stars[2].innerHTML;
	} else {
		starFinal.innerHTML = stars[0].innerHTML + stars[1].innerHTML + stars[2].innerHTML;
	}
	
	close.onclick = function() {
		modal.style.display = "none";
	};
}