var slots = document.getElementsByClassName('slot');
var holes = document.getElementsByClassName('hole');
var moles = document.getElementsByClassName('mole');
var prevHole;
let stopGame;
var btn = document.getElementById('btn');
var timeRemaining = 15;
var score_count = document.getElementById('score_count');
var points = 0;
var nums = document.getElementsByClassName('num');
var gameOver = document.getElementById('game_over');
var play_again_btn = document.getElementById('play_again_btn');

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function randomSlot(slots) {
	var i = Math.floor(Math.random() * holes.length);
	currentSlot = slots[i];
	if (currentSlot === prevHole) {
		console.log('nope, that was the previous hole');
		return randomSlot(slots);
	}
	prevHole = currentSlot;
	return currentSlot;
}

function peep() {
	var time = randomTime(650, 1400);
	var randMole = randomSlot(moles);
	randMole.classList.add('peeking');
	setTimeout(function() {
		randMole.classList.remove('peeking');
		if (stopGame == false) {
			peep();
		}
	}, time);
}

function countDown() {
	setInterval(function() {
		if (timeRemaining > 0) {
			timeRemaining -= 1;
			timer_count.textContent = ":" + timeRemaining;
		}
	}, 1000);
}

function startCountdown() {
	for (var i=0; i<nums.length; i++) {
		nums[i].style.display = 'inline-block';
	}
	nums[3].style.color = 'black';
	nums[3].style.fontSize = '90px';
	nums[3].style.opacity = '0.3';
	nums[3].textContent = 'whack';
	
  nums[0].style.fontSize = '110px';
  nums[0].style.opacity = '1.0';
  setTimeout(function() {
    nums[0].style.fontSize = '90px';
    nums[0].style.opacity = '0.3';
    
    nums[1].style.fontSize = '110px';
    nums[1].style.opacity = '1.0';
  }, 1000)
  setTimeout(function() {
    nums[1].style.fontSize = '90px';
    nums[1].style.opacity = '0.3';
    
    nums[2].style.fontSize = '110px';
    nums[2].style.opacity = '1.0';   
  }, 2000)
  setTimeout(function() {
    nums[2].style.fontSize = '90px';
    nums[2].style.opacity = '0.3';
    
    nums[3].style.fontSize = '110px';
    nums[3].style.opacity = '1.0';
    nums[3].style.color = 'blue';
    nums[3].textContent = 'WHACK!'
  }, 3000)
  setTimeout(function() {
		for (var i=0; i<nums.length; i++) {
			nums[i].style.display = 'none';
		}
  }, 4000)
}

// Sep 7: 
// Build a "you whacked X moles" div
// Add "play again" button on div
// "play again" button resets score & timer


// START GAME:
function startGame() {
	timeRemaining = 15;
	points = 0;
	score_count.textContent = points;
	stopGame = false;
	startCountdown();
	setTimeout(function() {
		countDown();
		peep();
	}, 4001);
	setTimeout(function() {
		stopGame = true;
	}, 19000);
	setTimeout(function() {
		document.getElementById('total_moles').textContent = 
			"You whacked " + points + " moles!";
		gameOver.style.display = 'inline';
	}, 20000);
}

function bonk() {
	console.log('this.classList: ' + this.classList + ' & this.id: ' + this.id)
	if (this.className.includes('peeking')) {
		points++;
		score_count.textContent = points;
		this.classList.remove('peeking');
	}
}

for (var i=0; i<moles.length; i++) {
	moles[i].addEventListener('click', bonk);
}

btn.addEventListener('click', startGame);

play_again_btn.addEventListener('click', function() {
	gameOver.style.display = 'none';
})