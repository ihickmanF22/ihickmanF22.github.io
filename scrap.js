const config = {
    type: Phaser.AUTO,
    width: 752,
    height: 507,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: {
        create: create,
        update: update
    }
};

const text = {};
const tween = {};

const game = new Phaser.Game(config);

function create ()
{
    text = this.add.text(30, 20, '0', { font: '16px Courier', fill: '#00ff00' });

    tween = this.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 5000,
        paused: true
    });

    this.input.once('pointerdown', () => {
        tween.resume();
    });
}

function update ()
{
	  updateFPS();
    text.setText([
        'Value: ' + tween.getValue(),
        'Progress: ' + tween.totalProgress,
        'Elapsed: ' + tween.totalElapsed,
        'Duration: ' + tween.totalDuration
    ]);
}

	const fps = {
    startTime : 0,
    frameNumber : 0,
    getFPS : function(){
        this.frameNumber++;
        const d = new Date().getTime(),
        currentTime = ( d - this.startTime ) / 1000,
        result = Math.floor( ( this.frameNumber / currentTime ) );

        if( currentTime > 1 ){
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }
        return result;

    }
};

	console.log(result);

	//const fps = 0;

function renderFps() {
    fps = Math.round(1000 / (Date.now() - lastRender));
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('FPS: ' + fps, 10, 30);
}

	renderFps();


	fpsText = this.add.text(360, 8, 'FPS: -- \n-- Bugemies', {
        font: '10px Georgia',
        fill: '#000000'
	});


		function updateFPS (time, delta)
	{
    fpsText.setText('FPS: ' + (1000/delta).toFixed(3) + '\n' +
        bugemies.emitters.first.alive.length + ' Bugemies');
	}