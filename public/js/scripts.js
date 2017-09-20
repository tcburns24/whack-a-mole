var slots = document.getElementsByClassName('slot');
var holes = document.getElementsByClassName('hole');
var moles = document.getElementsByClassName('mole');
var top_row = document.getElementById('top_row');
var bottom_row = document.getElementById('bottom_row');
var banner = document.getElementById('banner');
var prevHole;
let stopGame;
var btn = document.getElementById('btn');
var timeRemaining = 15;
var score_count = document.getElementById('score_count');
var points = 0;
var nums = document.getElementsByClassName('num');
var gameOver = document.getElementById('game_over');
var play_again_btn = document.getElementById('play_again_btn');
var dot = document.getElementById('difficulty_dot');
var diff_sets = document.getElementsByClassName('diff_set');
var diff_frame = document.getElementById('difficulty_frame');

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

function slide() {
	if (dot.className.includes('novice')) {
		dot.classList.remove('novice');
		dot.classList.add('expert');
		
		diff_frame.classList.remove('novice');
		diff_frame.classList.add('expert');
		
		diff_sets[0].classList.remove('select');
		diff_sets[1].classList.add('select');
		
	} else if (dot.className.includes('expert')) {
		dot.classList.remove('expert');
		dot.classList.add('jedi');
		
		diff_frame.classList.remove('expert');
		diff_frame.classList.add('jedi');
		
		diff_sets[1].classList.remove('select');
		diff_sets[2].classList.add('select');
		
	} else if (dot.className.includes('jedi')) {
		dot.classList.remove('jedi');
		dot.classList.add('novice');
		
		diff_frame.classList.remove('jedi');
		diff_frame.classList.add('novice');
		
		diff_sets[2].classList.remove('select');
		diff_sets[0].classList.add('select');
	}
}

dot.addEventListener('click', slide);

function peep() {
	if (dot.className == 'novice') {
		var time = randomTime(800, 1200);
	} else if (dot.className == 'expert') {
		var time = randomTime(500, 750);
	} else if (dot.className == 'jedi') {
		var time = randomTime(250, 400);
	}
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
	var interval = setInterval(function() {
		if (timeRemaining > 0) {
			timeRemaining -= 1;
			timer_count.textContent = ":" + timeRemaining;
		} else {
			clearInterval(interval);
		}
	}, 1000);
}

// set setInterval to a variable, then clear it, otherwise it'll run forever. 

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
		top_row.style.opacity = 0.2;
		bottom_row.style.opacity = 0.2;
		banner.style.opacity = 0.2;
	}, 20000);
}

function bonk() {
	if (this.className.includes('peeking')) {
		points++;
		score_count.textContent = points;
		this.classList.remove('peeking');
		this.parentElement.children[1].textContent = "WHACKED!";
	}
	setTimeout(function() {
		for (var i=0; i<moles.length; i++) {
			if (holes[i].textContent == "WHACKED!") {
				holes[i].textContent = "";
			}
		}
	}, 190)
}

for (var i=0; i<moles.length; i++) {
	moles[i].addEventListener('click', bonk);
}

btn.addEventListener('click', startGame);

play_again_btn.addEventListener('click', function() {
	gameOver.style.display = 'none';
	top_row.style.opacity = 1.0;
	bottom_row.style.opacity = 1.0;
	banner.style.opacity = 1.0;
	btn.style.transform = "rotate(360deg)";
	btn.style.borderWidth = "thick";
	btn.style.borderColor = "red";
	setTimeout(function() {
		btn.style.borderWidth = "medium";
		btn.style.borderColor = "silver";
		btn.style.transform = "rotate(0deg)"
	}, 550);
	timer_count.textContent = ":15";
	score_count.textContent = "0";
})

