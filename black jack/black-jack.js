// Challenge-1 Age in days

function ageInDays() {
	var birthYear = prompt("What is your birth year");
	var ageInDays = (2020 - birthYear) * 365
	var h1 = document.createElement("h1");
	var textAnswer = document.createTextNode('You are ' + ageInDays + ' days old');
	h1.setAttribute('id', 'ageInDays');
	h1.appendChild(textAnswer);
	document.getElementById("flex-box-result").appendChild(h1);
};

function reset() {
	document.getElementById("ageInDays").remove();
}


// Cat Generator
function generateCat() {
	var image= document.createElement('img')
	var div = document.getElementById('flex-cat-gen')
	image.src = 'https://i.pinimg.com/736x/a7/71/26/a77126ed93bff8d24aaa4aa44c77a9b8.jpg'
	div.appendChild(image)
}



// Rock Paper Scissors

function rpsGame(yourChoise) {
	console.log(yourChoise);
	var humanChoise, botChoise;
	humanChoise= yourChoise.id;

	botChoise = numberToChoise(randToRpsInt());
	console.log('Computer Choose:', botChoise);

	var results = decideWinner(humanChoise, botChoise);
	console.log(results);

	 var message = finalMessage(results); 
	console.log(message);

	rpsFrontEnd(humanChoise, botChoise, message)
}

function randToRpsInt() {
	return Math.floor(Math.random() * 3);
};

function numberToChoise(number) {
	return ['rock', 'paper', 'scissors'][number];
};

function decideWinner(yourChoise, computerChoise) {
	var rpsDatabase = {
		'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
		'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
		'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
	};

	var yourScore = rpsDatabase[yourChoise][computerChoise];
	var computerScore = rpsDatabase[computerChoise][yourChoise];

	return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
	if(yourScore === 0) {
		return {'message': 'You LOST !' , 'color': 'red'};
	}else if(yourScore === 0.5) {
		return {'message': 'You TIED !', 'color' :'#00ffa1'};
	} else {
		return {'message': 'You WON !', 'color':'#007eff'}
	}
}

// FrontEnd of Rock Paper Scissors

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage) {
	var imagesDatabase = {
		'rock' : document.getElementById('rock').src,
		'paper' : document.getElementById('paper').src,
		'scissors' : document.getElementById('scissors').src,
	}
	// document.getElementById('rock').remove();
	// document.getElementById('paper').remove();
	// document.getElementById('scissors').remove();

// Customised
var resultDiv = document.createElement('div')
resultDiv.setAttribute('id', 'gameResult');
document.querySelector('.container-3').appendChild(resultDiv)
// END

	var humanDiv = document.createElement('div');
	var botDiv = document.createElement('div');
	var messageDiv = document.createElement('div');

	humanDiv.innerHTML= `<img src='${imagesDatabase[humanImageChoice]}' height=150px width=150px style='box-shadow:0px 10px 50px rgba(37,50,233,1)' >`
	
	botDiv.innerHTML = `<img src='${imagesDatabase[botImageChoice]}' height=150px width=150px style='box-shadow:0px 10px 50px rgba(243,38,24,1)' >`

	messageDiv.innerHTML= `<h1 style='color: ${finalMessage['color']}; font-size:60px; padding:30px'> ${finalMessage['message']}</h1>`

	document.getElementById('gameResult').appendChild(humanDiv);
	document.getElementById('gameResult').appendChild(messageDiv);
	document.getElementById('gameResult').appendChild(botDiv);
}

// Customised
function resetGame(){
	document.getElementById('gameResult').remove()
}

// Challenge 4: Change the color of all buttons
var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);

var copyAllButtons = []
for (let i=0; i<all_buttons.length; i++){
	copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy){
	if (buttonThingy.value === 'red'){
		buttonsRed();
	} else if(buttonThingy.value === 'green') {
		buttonsGreen();
	} else if(buttonThingy.value === 'reset') {
		buttonColorReset();
	} else if(buttonThingy.value === 'random') {
		randomColors();
	}
}


function buttonsRed() {
	for (let i=0; i<all_buttons.length; i++) {
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add('btn-danger');
	}
};
function buttonsGreen() {
	for (let i=0; i<all_buttons.length; i++) {
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add('btn-success');
	}
};
function buttonColorReset() {
	for(let i=0; i<all_buttons.length; i++) {
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add(copyAllButtons[i]);
	}
};
function randomColors() {
	let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

	for (let i=0; i<all_buttons.length; i++) {
		let randomNumber = Math.floor(Math.random()* 4);
		all_buttons[i].classList.remove(all_buttons[i].classList[1]);
		all_buttons[i].classList.add(choices[randomNumber]);
	}
};

// Challenge 5: Black Jack
let blackjackGame= {
	'you' : {'scoreSpan': '#your-blackjack-result', 'div':'#your-box', 'score':0},
	'dealer' : {'scoreSpan': '#dealer-blackjack-result', 'div':'#dealer-box', 'score':0},
	'cards' : ['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
	'cardsMap' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
	'wins' : 0,
	'losses' : 0,
	'draws' : 0,
	'isStand' : false,
	'turnsOver' : false,
};

const YOU = blackjackGame['you'];
const DEALER= blackjackGame['dealer'];
const hitSound = new Audio('C:/Users/pc/Documents/JavaScript/sounds/swish.m4a');
const winSound = new Audio('C:/Users/pc/Documents/JavaScript/sounds/cash.mp3');
const lossSound = new Audio('C:/Users/pc/Documents/JavaScript/sounds/aww.mp3');


document.querySelector('#blackjack-hit').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal').addEventListener('click', blackjackDeal);

function blackjackHit() {
	if(blackjackGame['isStand'] === false) {
		let card= randomCard();
		console.log(card);
		showCard(card, YOU);
		updateScore(card, YOU);
		showScore(YOU);
		console.log(YOU['score']);
	}
}

function randomCard() {
	let randomIndex = Math.floor(Math.random()*13);
	return blackjackGame['cards'][randomIndex];
};

function showCard(card, activePlayer) {
	if(activePlayer['score'] <= 21) {
		let cardImage=document.createElement('img');
		cardImage.src = `images/${card}.png`;
		document.querySelector(activePlayer['div']).appendChild(cardImage);
		hitSound.play();
   } else {}
};

function blackjackDeal() {
	if(blackjackGame['turnsOver'] === true) {
	
	blackjackGame['isStand'] =false;
		let yourImages = document.querySelector('#your-box').querySelectorAll('img');
		let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

		for (i=0; i<yourImages.length; i++) {
			yourImages[i].remove();
		};

		for(i=0; i<dealerImages.length; i++) {
			dealerImages[i].remove();
		}

		YOU['score'] = 0;
		DEALER['score'] = 0;

		document.querySelector('#your-blackjack-result').textContent = 0;
		document.querySelector('#dealer-blackjack-result').textContent = 0;

		document.querySelector('#your-blackjack-result').style.color= '#ffffff';
		document.querySelector('#dealer-blackjack-result').style.color= '#ffffff';

		document.querySelector('#blackjack-result').textContent="Let's Play";
		document.querySelector('#blackjack-result').style.color='black';

	blackjackGame['turnsOver'] = true;
	}
};

function updateScore(card, activePlayer) {
	if(card==='A') {
	// If adding 11 keeps player below 21, add 11, Otherwise add 1
		if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
			activePlayer['score'] += blackjackGame['cardsMap'][card][1];
		} else {
			activePlayer['score'] += blackjackGame['cardsMap'][card][0];
		}

	} else {
		activePlayer['score'] += blackjackGame['cardsMap'][card];
	}
};

function showScore(activePlayer) {
	if(activePlayer['score'] > 21) {
		document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST !';
		document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
	} else {
		document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
	}
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
	blackjackGame['isStand'] = true;

	while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
		let card = randomCard();
		showCard(card, DEALER);
		updateScore(card, DEALER);
		showScore(DEALER);
		await sleep(1000);
	}

	blackjackGame['turnsOver']= true;
	let winner = computeWinner();
	showResult(winner);
};

// Compute the Winner 
// Update the wins, looses and draws
function computeWinner() {
	let winner;

	if (YOU['score'] <= 21) {

		if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
			blackjackGame['wins']++;
			winner = YOU;
		} else if(YOU['score'] < DEALER['score']) {
			blackjackGame['losses']++;
			winner =DEALER;
		} else if(YOU['score'] === DEALER['score']) {
			blackjackGame['draws']++;
		}


	} else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
		blackjackGame['losses']++;
		winner = DEALER;
	} else if(YOU['score'] > 21 && DEALER['score'] > 21) {
		blackjackGame['draws']++;
	}

	console.log(blackjackGame);
	return winner;
};

function showResult(winner) {
	let message, messageColor;

	if(blackjackGame['turnsOver'] === true) {

		if(winner === YOU) {
			document.querySelector('#wins').textContent=blackjackGame['wins'];

			message = 'You won !';
			messageColor = 'green';
			winSound.play();
		} else if(winner === DEALER) {
			document.querySelector('#losses').textContent=blackjackGame['losses'];

			message = 'You lost !';
			messageColor = 'red';
			lossSound.play();
		} else {
			document.querySelector('#draws').textContent=blackjackGame['draws'];

			message = 'You Drew !';
			messageColor = 'black';
		}

		document.querySelector('#blackjack-result').textContent = message;
		document.querySelector('#blackjack-result').style.color = messageColor;
	}
};



