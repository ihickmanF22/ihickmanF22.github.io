// PROJECT OVERVIEW:

/*
"To The Clouds" is a game inspired by the classic "Space Invaders" where instead of controlling a ship moving through space, you control a character named Codey. As you progress throughout the game to complete three levels, you fly up along a vast landscape of clouds until you reach the sky's limit. The objective of the game, much like its 1978 predecessor, is to destroy all of the enemies. Alternatively, you can also win by surviving long enough.

The game is played on a small, rectangular, single screen; the player and enemies are always present on this same screen. You, the player, control the movement of Codey by pressing the left, right, up, or down arrow keys. You can also press the space bar to fire a missile at the enemy bugs to destroy them.

The enemies are visually represented as bugs. These bugs look diferent per level.
There are two types of bugs: "Buggers" and "Bugemies" BUGGERS are the enemy bugs that are randomly positioned at the top of the screen. Unlike BUGEMIES, BUGGERS can be destroyed by the player. BUGEMIES are the unkillable enemy bugs that bounce around the screen in attempt to get a sneaky shot in killing the player. BUGEMIES increase in count as the player progresses.

The game is written in a way that makes it easiest to play in a browser / on a desktop computer.
The game is also not a full-screen game.
The game is written in JavaScript and uses HTML5 canvas in sync with CSS.
*/

// GAME SETUP:
// Stores (in constant variable) the "Mute" Button pulled in from settings.html
const btnM = document.getElementById("btnM");
// Stores (in constant variable) the "Test OBJ" Button pulled in from DT.html (Dev Tools)
const btnX = document.getElementById("btnX");

// onEvent when the "Submit" button is clicked
btn.addEventListener("click", function() {
// Declares above the "Submit" Button pulled in from index.html as an event listener
	// Stores below (in constant variable) the description [project overview] text pulled in from index.html
	const description = document.getElementById("description");
	// Stores (in constant variable) the name that the user inputs in the text field pulled from index.html
	const name = document.getElementById("name");
	description.innerHTML = name.value + (", this game is inspired by the classic 'Space Invaders' where instead of controlling a ship moving through space, you control a character named Codey. As you progress throughout the game to complete three levels, you fly up along a vast landscape of clouds until you reach the sky's limit. The objective of the game, much like its 1978 predecessor, is to destroy all of the enemies. Alternatively, you can also win by surviving long enough. A more detailed description can be found under the Project Overview section in the game's comments.");
	// Removes the text field, the user's name, and the "Submit" button from the DOM
	name.remove();
	document.getElementById("nameLabel").remove();
	btn.remove();
});

//btnM.addEventListener("click", function() {
	//gameState.street.pause();
//});

//btnX.addEventListener("click", function() {
	//gameState.obj = {};
//});

// A constant variable that stores the current enemy bugger velocity
const gameState = {enemyVelocity: 0};

// Pre-assigning FPS [frames per second] Text (in constant variable) to the "FPS" label for later use
const fpsText = {};

// return {return} in function sortedEnemies() returns an array of the main enemy bug sprites (buggers) sorted by their x coordinate [orderedByXCoord].
function sortedEnemies(){
  const orderedByXCoord = gameState.enemies.getChildren().sort((a, b) => a.x - b.x);
  return orderedByXCoord;
}
// return {return} in function numOfTotalEnemies() returns the main total enemy (bugger) count [totalEnemies].
function numOfTotalEnemies(){
	const totalEnemies = gameState.enemies.getChildren().length;
  return totalEnemies;
}

// PRELOAD FUNCTION
// Preloading images and audio files through function preload()
function preload() {
	/*
	A simple explanation of this code using Codey as an example:
	1. This code preloads an image called "codey"
	2. It loads this image from filename "codey.png" located in directory "assets/images"
  */
	this.load.image('codey', 'assets/images/codey.png');
	this.load.image('platform', 'assets/images/platform.png');
	this.load.image('sideBorder', 'assets/images/vertform1.png');
	this.load.image('vertform', 'assets/images/vertform2.png');
	this.load.image('horiform', 'assets/images/horiform.png');
	this.load.image('bug1', 'assets/images/bug_1.png');
	this.load.image('bug2', 'assets/images/bug_2.png');
	this.load.image('bug3', 'assets/images/bug_3.png');
	this.load.image('bug4', 'assets/images/bug_4.png');
	this.load.image('bug5', 'assets/images/bug_5.png');
	this.load.image('bug6', 'assets/images/bug_6.png');
	this.load.image('bugemy', 'assets/images/bugemy.png');
	this.load.image('bugPellet', 'assets/images/bugPellet.png');
	this.load.image('bugRepellent', 'assets/images/bugRepellent.png');
	this.load.image('wings', 'assets/images/Wings-01.png');
	this.load.image('bar', 'assets/images/Bar-01.png');
	this.load.image('loading', 'assets/images/loading.gif');
	this.load.audio('vineBoom', 'assets/audio/vine_boom.wav');
	this.load.audio('death', 'assets/audio/death.mp3');
	this.load.audio('death2', 'assets/audio/death2.mp3');
	this.load.audio('walkP', 'assets/audio/codey_walk.mp3');
	this.load.audio('NULL', 'assets/audio/null.mp3');
	this.load.audio('street', 'assets/audio/street_clip.mp3');
	this.load.audio('flapP', 'assets/audio/codey_flap.mp3');
	this.load.audio('fall', 'assets/audio/fall.mp3');
	this.load.audio('hit', 'assets/audio/hit.mp3');
	this.load.audio('shoot', 'assets/audio/shoot.mp3');
	this.load.audio('poof', 'assets/audio/poof.mp3');
	this.load.audio('win', 'assets/audio/victory.mp3');
	this.load.audio('pu1', 'assets/audio/powerup1.mp3');
	this.load.audio('pu2', 'assets/audio/powerup2.mp3');
}

// CREATE FUNCTION
function create() {
	// When gameState.active is true, the game is being played; therefore, the game is not over. When gameState.active is false, then the game is over.
	gameState.active = true;
	// Stores (in constant variable) the loading screen pulled in from index.html
	const loading = document.getElementById("loading");
	// Declaring / Adding the sounds from function preload() through gameState
	gameState.vineBoom = this.sound.add('vineBoom');
	gameState.death = this.sound.add('death');
	gameState.death2 = this.sound.add('death2');
	gameState.walkP = this.sound.add('walkP');
	gameState.NULL = this.sound.add('NULL');
	gameState.street = this.sound.add('street');
	gameState.flapP = this.sound.add('flapP');
	gameState.fall = this.sound.add('fall');
	gameState.hit = this.sound.add('hit');
	gameState.shoot = this.sound.add('shoot');
	gameState.poof = this.sound.add('poof');
	gameState.win = this.sound.add('win');
	gameState.pu1 = this.sound.add('pu1');
	gameState.pu2 = this.sound.add('pu2');

	// Global variables of function create() to use in functions updateFPS() and renderFPS() {}
	var fps = 0;
	var lastCalledTime = {};
	// Pre-assigning FPS [frames per second] Text (in constant variable) to the "FPS" label for later use
	const fpsText = {};

// Unused FPS Logic [updateFPS Function (unused)]
function updateFPS() {
    if(!lastCalledTime) {
        lastCalledTime = Date.now();
        fps = 0;
        return;
    }
    delta = (Date.now() - lastCalledTime)/1000;
    lastCalledTime = Date.now();
    fps = 1/delta;
}

// Unused FPS Logic 2 [renderFPS Function (unused)]
function renderFPS() {
    fpsText.text = "FPS: " + Math.round(fps);
}
	// Calling unused / dysfunctional functions updateFPS() and renderFPS()
	updateFPS();
	renderFPS();

		// Messing around with particles!
		// Somehow ended up using these to display the count of bugemies. The particles themselves go unused (visually).
    bugemies = this.add.particles('bugemy');

		// Particle System (made from emitters)
    bugemies.createEmitter({
		  	// Inner contents should be self-explanatory.
        alpha: { start: 1, end: 0 },
        scale: { start: 0.5, end: 2.5 },
        //tint: { start: 0xff945e, end: 0xff945e },
        speed: 20,
        accelerationY: -300,
        angle: { min: -85, max: -95 },
        rotate: { min: -180, max: 180 },
        lifespan: { min: 1000, max: 1100 },
        blendMode: 'ADD',
        frequency: 110,
        maxParticles: 2,
        x: 400,
        y: 300
    });

	// Creating the first bugemy
	/*
	1. This code creates a sprite for the first bugemy at 600, 100, setting its scale to 0.5.
	2. Then it adds physics to the sprite
	3. And sets a velocity of -100, 200, to the sprite, and makes it bounce (1-1) and collide with the world bounds.
	*/
	sprite1 = this.add.image(600, 100, 'bug2').setScale(0.5);
  this.physics.world.enable([ sprite1 ]);
  sprite1.body.setVelocity(-100, 200).setBounce(1, 1).setCollideWorldBounds(true);

	// Creating the first bugemy
	//const container1 = this.add.container(200, 50, [ sprite1 ]);

	// Creating the second bugemy
	/*
	1. This code creates a new sprite at 0, 0 for the second bugemy and sets its scale to 0.5
	2. And creates physics for the new sprite.
	3. It then sets the sprite's velocity to 100, 200, sets its bounce to 1-1, and enables its world bounds collision.
	*/
  sprite2 = this.add.image(0, 0, 'bug2').setScale(0.5);
  this.physics.world.enable([ sprite2 ]);
  sprite2.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);

	// Creating the second bugemy (in giving it a container to control its movement)
  const container2 = this.add.container(200, 50, [ sprite2 ]);

	// Creating the bugemy and bug pellet sprite
	// In view of the explanations above, the two lines of code below should be self-explanatory.
	this.add.image('bugPellet').setScale(2);
  image = this.add.image(600, 300, 'bug2');

	// Creates a stopwatch and the text used to display its time
  text = this.add.text(36, 12, { fontSize: '15px', fontFamily: 'Times New Roman', color: '#000000' });
	/*
	1. This code creates a new text object at 36, 12.
	2. It then sets the style of the text object to have a font size of 15px, a font family of Times New Roman, and a color of black (#000000).
	*/
	text.setStyle({ fontSize: '15px', fontFamily: 'Times New Roman', color: '#000000' });
  //timedEvent = this.time.addEvent({ delay: 2000, callback: onEvent, callbackScope: this });
	// Creates a timed event that will stop [calling the function onEvent()] after 112500 milliseconds [= 100 seconds].
  timedEvent = this.time.delayedCall(100000, onEvent, [], this);

	// Creates the wings powerup and gives it a container in the same manner as the bugemy sprites
	wings = this.add.image(0, 0, 'wings').setScale(0.022);
  this.physics.world.enable([ wings ]);
  wings.body.setVelocity(-200, 200).setBounce(0, 0).setCollideWorldBounds(true);

  const container = this.add.container(0, 0, [ wings ]);

	// When gameState.active is false, the game will listen for a "pointerup" event and restart when the event happens.
	this.input.on('pointerup', () => {
		if (gameState.active === false) {
			this.scene.restart();
		}
	});

	// Assigns constant variables to the game's sound effects
	// These constant variables go unused as the game is still functions without them, but remain for future reference and as a backup plan
	const vineBoom = document.getElementById('assets/audio/vine_boom.wav');
	const death = document.getElementById('assets/audio/death.mp3');
	const death2 = document.getElementById('assets/audio/death2.mp3');
	const walkP = document.getElementById('assets/audio/codey_walk.mp3');
	const NULL = document.getElementById('assets/audio/null.mp3');
	const street = document.getElementById('assets/audio/street_clip.mp3');
	const flapP = document.getElementById('assets/audio/codey_flap.mp3');
	const fall = document.getElementById('assets/audio/fall.mp3');
	const hit = document.getElementById('assets/audio/hit.mp3');
	const shoot = document.getElementById('assets/audio/shoot.mp3');
	const poof = document.getElementById('assets/audio/poof.mp3');
	const win = document.getElementById('assets/audio/victory.mp3');

	// These functions are used for cases where multiple sounds are played at the same time / simultaneously
	// [functions playAudio() and playAudioPU()]
	function playAudio() {
		gameState.vineBoom.play();
		gameState.death.play();
		gameState.death2.play();
	}
	
	function playAudioPU() {
		gameState.pu1.play();
		gameState.pu2.play();
	}

	function layerBar(){
		this.scene.sendToBack();
		//Placeholder
	}

	//layerBar();
	// Creates Codey a.k.a. the player a.k.a. you!
	gameState.player = this.physics.add.sprite(225, 360, 'codey').setScale(.5);
	// Displays the initial number of bugs; this value is initially hardcoded as 24.
	gameState.scoreText = this.add.text(154, 13, 'Buggers Left: 24', { fontSize: '15px', fill: '#000000' });
	// The text is cloned to add / create more contrast between the text and background color
	gameState.scoreText2 = this.add.text(154, 13, 'Buggers Left: 24', { fontSize: '15px', fill: '#36454F' });

	// Creating static platforms, side borders, and a ceiling to keep the player within the right bounds.
	const platforms = this.physics.add.staticGroup();
	const sideBorders = this.physics.add.staticGroup();
	const vertforms = this.physics.add.staticGroup();
	const horiforms = this.physics.add.staticGroup();
	//const bars = this.physics.add.staticGroup();
	platforms.create(226, 390, 'platform').setScale(1, .3).refreshBody();
	sideBorders.create(469, 153, 'sideBorder').setScale(1).refreshBody();
	vertforms.create(-19, 153, 'vertform').setScale(1).refreshBody();
	horiforms.create(244, 148, 'horiform').setScale(1, .4).refreshBody();
	//bars.create(225, 35, 'bar').setScale(.037).refreshBody();

	// Creating collider objects between all bounds
	gameState.player.setCollideWorldBounds(true);
	this.physics.add.collider(gameState.player, platforms);
	this.physics.add.collider(gameState.player, sideBorders);
	this.physics.add.collider(gameState.player, vertforms);
	this.physics.add.collider(gameState.player, horiforms);
	//this.physics.add.collider(gameState.player, bars);

	// Creating a random array of buggers at the top half of the screen
	gameState.enemies = this.physics.add.group();

	for (let yVal = 1; yVal < 4; yVal++) {
		for (let xVal = 1; xVal < 9; xVal++) {
			gameState.enemies.create(50 * xVal, 50 * yVal, 'bug1').setScale(.6).setGravityY(-200);
		}
	}

	// Adding physics to the the bug pellets through the ph. plugin and a constant variable
	const pellets = this.physics.add.group();

	// Generates pellets at random frequencies
	const genPellet = () => {
		let randomBug = Phaser.Utils.Array.GetRandom(gameState.enemies.getChildren());

		pellets.create(randomBug.x, randomBug.y, 'bugPellet');
	};

	// Loop pellet generation
	gameState.pelletsLoop = this.time.addEvent({
		delay: 300,
		callback: genPellet,
		callbackScope: this,
		loop: true
	});

	// Destroys pellets and plays a cool little sound when they hit the ground
	this.physics.add.collider(pellets, platforms, (pellet)=> {
    	pellet.destroy();
			gameState.hit.play();
		});

	// Destroys pellets and plays a cool little sound when they hit any other border
  this.physics.add.collider(vertforms, horiforms,
		(pellet) => {
			pellet.destroy();
			gameState.hit.play();
		});

	// The game is over if the player is hit by a pellet
	// All sound effects are momentarily paused, gamestate.active is set to false, and "Game Over" text is displayed
	this.physics.add.collider(pellets, gameState.player, () => {
    gameState.active = false;
    gameState.pelletsLoop.destroy();
		gameState.enemyVelocity = 0;
		gameState.street.pause();
		gameState.fall.pause();
		gameState.walkP.pause();
		gameState.flapP.pause();
		gameState.shoot.pause();
		this.physics.pause();
		this.add.text(175, 250, '   Game Over \n Click to Restart',
		{ fontSize: '15px', fontFamily: 'Georgia', fill: '#111' });
		playAudio();
		timedEvent.remove(false);
		loading.remove();
	});

	// Same for the bugemies; if they get a little too close to the player, the game is over.
	// All sound effects are momentarily paused, gamestate.active is set to false, and "Game Over" text is displayed
	this.physics.add.collider(sprite1, gameState.player, () => {
    gameState.active = false;
    gameState.pelletsLoop.destroy();
		gameState.enemyVelocity = 0;
		gameState.street.pause();
		gameState.fall.pause();
		gameState.walkP.pause();
		gameState.flapP.pause();
		gameState.shoot.pause();
		this.physics.pause();
		this.add.text(175, 250, '   Game Over \n Click to Restart',
		{ fontSize: '15px', fontFamily: 'Georgia', fill: '#111' });
		playAudio();
		timedEvent.remove(false);
		loading.remove();
	});

	this.physics.add.collider(sprite2, gameState.player, () => {
    gameState.active = false;
    gameState.pelletsLoop.destroy();
		gameState.enemyVelocity = 0;
		gameState.street.pause();
		gameState.fall.pause();
		gameState.walkP.pause();
		gameState.flapP.pause();
		gameState.shoot.pause();
		this.physics.pause();
		this.add.text(175, 250, '   Game Over \n Click to Restart',
		{ fontSize: '15px', fontFamily: 'Georgia', fill: '#111' });
		playAudio();
		timedEvent.remove(false);
		loading.remove();
	});

	// Logic for collecting the wings powerup.
	// WIP: Two .mp3 files are played simultaneously to create nice retro sfx and the wings sprite is destroyed
	this.physics.add.collider(wings, gameState.player, () => {
		playAudioPU();
		wings.destroy();
	});

	// Pauses the falling audio when the player hits / collides with the ground
	this.physics.add.collider(platforms, gameState.player, () => {
		gameState.fall.pause();
    gameState.NULL.play();
	});

	//gameState.street.play();

	gameState.bugRepellent = this.physics.add.group();
	//gameState.bugRepellent = {};

	// Logic for shooting the enemy bugs (When player pellets hit a bug, it, along with the player pellet is destroyed)
	// Bugger count decreases (player's score increases) and a sound effect is played
	this.physics.add.collider(gameState.enemies, gameState.bugRepellent, (bug, repellent) => {
    bug.destroy();
    repellent.destroy();
		gameState.poof.play();
    gameState.scoreText.setText(`Buggers Left: ${numOfTotalEnemies()}`);
		gameState.scoreText2.setText(`Buggers Left: ${numOfTotalEnemies()}`);
  });

	// Creates cursor objects to be used in function update() below
	gameState.cursors = this.input.keyboard.createCursorKeys();
}

// UPDATE FUNCTION
function update() {
	// calling function updateAux()
	updateAux1();
	// Both bugemies bounce off each other when they collide
	this.physics.world.collide(sprite1, sprite2);
	// Sets and extends the time display (text) from the stopwatch
	text.setText('Time: ' + timedEvent.getProgress().toString().substr(0, 4));
	// Player Controls: Left, Right, Up, and Down
	if (gameState.cursors.left.isDown) {
		gameState.player.setVelocityX(-160);
	} else if (gameState.cursors.right.isDown) {
		gameState.player.setVelocityX(160);
	} else {
		gameState.player.setVelocityX(0);
	}
	if (gameState.cursors.up.isDown) {
		gameState.player.setVelocityY(-160);
	} else if (gameState.cursors.down.isDown) {
		gameState.player.setVelocityY(160);
	} else {
		gameState.player.setVelocityY(140);
	}

	// Shoots a player pellet when the spacebar is pressed
	if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
		gameState.bugRepellent.create(gameState.player.x, gameState.player.y, 'bugRepellent').setGravityY(-200).setVelocityY(-200);
		gameState.shoot.play();
	}

	// Victory! [when all buggers are destroyed]
	if (numOfTotalEnemies() === 0) {
		gameState.win.play();
    gameState.active = false;
		gameState.enemyVelocity = 0;
    this.physics.pause();
    this.add.text(165, 250,'You Won!', { fontSize: '22.5px', fontFamily: 'Georgia', fill: '#333' });
		timedEvent.remove(false);
  } else {
    gameState.enemies.getChildren().forEach(bug => {
      bug.x += gameState.enemyVelocity;
  });
    gameState.leftMostBug = sortedEnemies()[0];
    gameState.rightMostBug = sortedEnemies()[sortedEnemies().length - 1];
  if (gameState.leftMostBug.x < 10 || gameState.rightMostBug.x > 440) {
    gameState.enemyVelocity *= -1;
    gameState.enemies.getChildren().forEach(bug => {
      bug.y += 10;
				});
			}
		}
	}

// Player Controls to sound effects, not movement
function updateAux1() {
	if (gameState.cursors.left.isUp) {
		gameState.walkP.play();
	} else if (gameState.cursors.right.isDown) {
		gameState.walkP.play();
	} if (gameState.cursors.up.isUp) {
		gameState.flapP.play();
	} else if (gameState.cursors.down.isUp) {
		gameState.fall.play();
	} else {
		gameState.NULL.play();
	}
}

// Victory! [when the player has survived long enough (when the time is up)]
function onEvent ()
{
	gameState.win.play();
  image.setScale(0.5);
	gameState.active = false;
	gameState.enemyVelocity = 0;
  this.physics.pause();
  this.add.text(165, 250,'You Won!', { fontSize: '22.5px', fontFamily: 'Georgia', fill: '#333' });
}

const config = {
	type: Phaser.AUTO,
	width: 452,
	height: 407,
	backgroundColor: "aeadf0",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			enableBody: true,
			debug: false
		}
	},
	scene: {
		render,
		preload,
		create,
		update
	}
};

const game = new Phaser.Game(config);

function render() {
  //game.debug.text('FPS: ' + game.time.fps, 175, 250, '#00ff00');
}
	
render();