// PROJECT OVERVIEW:

/*
Placeholder: Filler filler filler filler filler filler filler filler...
Filler filler filler filler filler filler...
Comment testing, comment testing, comment testing..
*/

// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

//const btn = document.getElementById("btn");
const btnMM = document.getElementById("btnMM");
const btnX = document.getElementById("btnX");

btn.addEventListener("click", function() {
	const description = document.getElementById("description");
	const name = document.getElementById("name");
	description.innerHTML = name.value + (", this is the description of the project.");
	name.remove();
	document.getElementById("nameLabel").remove();
	btn.remove();
});

//btnMM.addEventListener("click", function() {
	//gameState.street.pause();
//});

//btnX.addEventListener("click", function() {
	//gameState.obj = {};
//});

const gameState = {enemyVelocity: 0};

//const fpsText = {};
//const bugemies = {};

function sortedEnemies(){
  const orderedByXCoord = gameState.enemies.getChildren().sort((a, b) => a.x - b.x);
  return orderedByXCoord;
}
function numOfTotalEnemies(){
	const totalEnemies = gameState.enemies.getChildren().length;
  return totalEnemies;
}

function preload() {
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

function create() {
	gameState.active = true;
	//const loading = this.image.add(750, 1610, 'loading');
	//gameState.loading = this.image.add(750, 1610, 'loading');
	const loading = document.getElementById("loading");
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

	fpsText = this.add.text(360, 8, 'FPS: -- \n-- Bugemies', {
        font: '10px Georgia',
        fill: '#000000'
	});

    bugemies = this.add.particles('bugemy');

    bugemies.createEmitter({
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

	sprite1 = this.add.image(600, 100, 'bug2').setScale(0.5);
  this.physics.world.enable([ sprite1 ]);
  sprite1.body.setVelocity(-100, 200).setBounce(1, 1).setCollideWorldBounds(true);

	//const container1 = this.add.container(200, 50, [ sprite1 ]);

  sprite2 = this.add.image(0, 0, 'bug2').setScale(0.5);
  this.physics.world.enable([ sprite2 ]);
  sprite2.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);

  const container2 = this.add.container(200, 50, [ sprite2 ]);

	this.add.image('bugPellet').setScale(2);
  image = this.add.image(600, 300, 'bug2');
  text = this.add.text(36, 12, { fontSize: '15px', fontFamily: 'Times New Roman', color: '#000000' });
	text.setStyle({ fontSize: '15px', fontFamily: 'Times New Roman', color: '#000000' });
  //timedEvent = this.time.addEvent({ delay: 2000, callback: onEvent, callbackScope: this });
  timedEvent = this.time.delayedCall(112500, onEvent, [], this);

	wings = this.add.image(0, 0, 'wings').setScale(0.022);
  this.physics.world.enable([ wings ]);
  wings.body.setVelocity(-200, 200).setBounce(0, 0).setCollideWorldBounds(true);

  const container = this.add.container(0, 0, [ wings ]);

	this.input.on('pointerup', () => {
		if (gameState.active === false) {
			this.scene.restart();
		}
	});

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

	gameState.player = this.physics.add.sprite(225, 360, 'codey').setScale(.5);
	gameState.scoreText = this.add.text(154, 13, 'Buggers Left: 24', { fontSize: '15px', fill: '#000000' });
	gameState.scoreText2 = this.add.text(154, 13, 'Buggers Left: 24', { fontSize: '15px', fill: '#36454F' });

	const platforms = this.physics.add.staticGroup();
	const sideBorders = this.physics.add.staticGroup();
	const vertforms = this.physics.add.staticGroup();
	const horiforms = this.physics.add.staticGroup();
	const bars = this.physics.add.staticGroup();

	//const sideBorders = this.physics.add.staticImage(469, 153, 'sideBorder');
	//const vertforms = this.physics.add.staticImage(-19, 153, 'vertform');
	//const horiforms = this.physics.add.staticImage(290, 340, 'horiform');
	//const bars = this.physics.add.staticImage(154, 13, 'bar');

	platforms.create(225, 390, 'platform').setScale(1, .3).refreshBody();
	sideBorders.create(469, 153, 'sideBorder').setScale(1).refreshBody();
	vertforms.create(-19, 153, 'vertform').setScale(1).refreshBody();
	horiforms.create(244, 148, 'horiform').setScale(1, .4).refreshBody();
	//bars.create(225, 35, 'bar').setScale(.037).refreshBody();

	gameState.player.setCollideWorldBounds(true);
	this.physics.add.collider(gameState.player, platforms);
	this.physics.add.collider(gameState.player, sideBorders);
	this.physics.add.collider(gameState.player, vertforms);
	this.physics.add.collider(gameState.player, horiforms);
	//this.physics.add.collider(gameState.player, bars);

	gameState.enemies = this.physics.add.group();

	for (let yVal = 1; yVal < 4; yVal++) {
		for (let xVal = 1; xVal < 9; xVal++) {
			gameState.enemies.create(50 * xVal, 50 * yVal, 'bug1').setScale(.6).setGravityY(-200);
		}
	}

	const pellets = this.physics.add.group();

	const genPellet = () => {
		let randomBug = Phaser.Utils.Array.GetRandom(gameState.enemies.getChildren());

		pellets.create(randomBug.x, randomBug.y, 'bugPellet');
	};

	gameState.pelletsLoop = this.time.addEvent({
		delay: 300,
		callback: genPellet,
		callbackScope: this,
		loop: true
	});

	this.physics.add.collider(pellets, platforms, (pellet)=> {
    	pellet.destroy();
			gameState.hit.play();
		});

  this.physics.add.collider(vertforms, horiforms,
		(pellet) => {
			pellet.destroy();
			gameState.hit.play();
		});

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
		//loading.destroy();
		//loading = null;
		this.add.text(175, 250, '   Game Over \n Click to Restart',
		{ fontSize: '15px', fontFamily: 'Georgia', fill: '#111' });
		playAudio();
		timedEvent.remove(false);
		loading.remove();
	});

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

	this.physics.add.collider(wings, gameState.player, () => {
		playAudioPU();
		wings.destroy();
	});

	this.physics.add.collider(platforms, gameState.player, () => {
		gameState.fall.pause();
    gameState.NULL.play();
	});

	//gameState.street.play();

	gameState.bugRepellent = this.physics.add.group();
	//gameState.bugRepellent = {};

	this.physics.add.collider(gameState.enemies, gameState.bugRepellent, (bug, repellent) => {
    bug.destroy();
    repellent.destroy();
		gameState.poof.play();
    gameState.scoreText.setText(`Buggers Left: ${numOfTotalEnemies()}`);
		gameState.scoreText2.setText(`Buggers Left: ${numOfTotalEnemies()}`);
  });

	gameState.cursors = this.input.keyboard.createCursorKeys();
}


function update() {
	updateAux1();
	updateFPS();
	this.physics.world.collide(sprite1, sprite2);
	text.setText('Time: ' + timedEvent.getProgress().toString().substr(0, 4));
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

		function updateFPS (time, delta)
	{
    fpsText.setText('FPS: ' + (1000/delta).toFixed(3) + '\n' +
        bugemies.emitters.first.alive.length + ' Bugemies');
	}


	if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
		gameState.bugRepellent.create(gameState.player.x, gameState.player.y, 'bugRepellent').setGravityY(-200).setVelocityY(-200);
		gameState.shoot.play();
	}

	if (numOfTotalEnemies() === 0) {
		gameState.win.play();
    gameState.active = false;
		gameState.enemyVelocity = 0;
    this.physics.pause();
    this.add.text(165, 250,'You Won!', { fontSize: '22.5px', fontFamily: 'Georgia', fill: '#333' });
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
  game.debug.text('FPS: ' + game.time.fps, 175, 250, '#00ff00');
}
	
render();