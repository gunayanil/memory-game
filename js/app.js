let cards = document.getElementsByClassName('card'); // HTML collection
let card = [...cards];  // Array
let deck = document.querySelector('.deck');
const modal = document.getElementById('myModal');
const modalContent = document.querySelector('.modal-content');
let moveFinal = document.querySelector('.moveFinal');
let timeFinal = document.querySelector('.timeFinal');
let starFinal = document.querySelector('.starFinal');
const close = document.querySelector('.close');
const again = document.querySelector('.again');
const restart = document.querySelector('.restart');
let moveHTML = document.querySelector('.moves');
let timer = document.querySelector(".timer");
let stars = document.querySelector('.stars').children; // HTML collection, use it like an array
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

/* Restart */

function restartRes(){
	modal.style.display = "none";
	shuffle(card);
	while(deck.firstChild) { // First delete all items.
		deck.removeChild(deck.firstChild);
	}
	for(let i = 0; i < card.length; i++) { // Add shuffled card to the page
		deck.appendChild(card[i]);
		cards[i].classList.remove('show', 'open', 'match', 'disabled', 'animated');
	}

	moves = 0; matchCounter = 0; openedCards = []; second = 0; minute= 0;
	timer.innerHTML = "O mins 0 secs";
	moveHTML.textContent = moves;
	clearInterval(interval);

};


for(let i = 0; i < card.length; i++) {
	card[i].addEventListener('click', display);
	card[i].addEventListener('click', open);

}

function display() {
	this.classList.add('open', 'show'); // cannot use i anymore, that's why we use this
}

function open() {
	openedCards.push(this); //innerHTML returns a text
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
	
	setTimeout(function() {
		openedCards[0].classList.remove('animated', 'pulse', 'open', 'show');
		openedCards[1].classList.remove('animated', 'pulse', 'open', 'show');
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
	}if(moves > 12) {
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

function final() {
	clearInterval(interval);
	modal.style.display = "block";
	moveFinal.innerHTML = moves;
	timeFinal.innerHTML = minute + " minutes " + second + " seconds";

	if(moves > 8 && moves < 12) { 
		starFinal.innerHTML = stars[1].innerHTML + stars[2].innerHTML;
	}else if(moves >= 12) {
		starFinal.innerHTML = stars[2].innerHTML;
	}else {
		starFinal.innerHTML = stars[0].innerHTML + stars[1].innerHTML + stars[2].innerHTML;
	}
	
	close.onclick = function() {
		modal.style.display = "none";
	}
}
