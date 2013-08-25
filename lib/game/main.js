ig.module( 
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',

	'game.entities.playerHead',
	'game.entities.playerBody',
	'game.entities.drHead',
	'game.entities.drBody',
	'game.entities.leftArm',
	'game.entities.controls',

	'game.levels.office',

	'plugins.box2d.game',
	'plugins.scene_manager',
	'plugins.screenshaker'
)
.defines(function(){

CONTROLS_X = 160;
CONTROLS_Y = 435;

FullsizeBackdrop = ig.Image.extend({
	resize: function(){},

	draw: function() {
		if( !this.loaded ) { return; }
		ig.system.context.drawImage( this.data, 0, 0 );
	}
});


ParentScreen = ig.Box2DGame.extend({
	sceneManager: new SceneManager(),

	init: function() {
		this.sceneManager.pushScene( new LogoScene() );
	},

	update: function() {
		this.sceneManager.updateScene();
	},

	draw: function() {
		this.sceneManager.drawScene();
	}
});


LogoScene = Scene.extend({

	backdrop: new FullsizeBackdrop( 'media/logo.jpg' ),

	init: function( title ) {
	
		this.clearColor = null;
		this.timer = new ig.Timer(2);
	
		ig.input.bind( ig.KEY.SPACE, 'start' );
	},


	update: function() {
		this.parent();

		if ( ig.input.pressed( 'start' ) || this.timer.delta() >= 0 ) {
			this.sceneManager.pushScene( new TitleScene() );
		}

	},


	draw: function() {		
		this.parent();
		this.backdrop.draw();
	}
});


TitleScene = Scene.extend({
	backdrop: new FullsizeBackdrop( 'media/title.jpg' ),

	init: function( title ) {
		this.parent();
	
		this.clearColor = null;
	
		this.controls = ig.game.spawnEntity(EntityControls, CONTROLS_X, CONTROLS_Y, {blink: true});
		ig.music.add('media/waiting_room.ogg', 'music');
		ig.music.volume = 0.3;
		ig.music.loop = true;
		ig.music.play('music');

		ig.input.bind( ig.KEY.SPACE, 'start' );
	},


	update: function() {
		this.parent();

		if( ig.input.pressed( 'start' ) ) {
			this.sceneManager.pushScene( new DrOfficeScene() );
		}

	},


	draw: function() {		
		this.backdrop.draw();
		this.parent();
	}
});


DrOfficeScene = Scene.extend({
	gravity: 300,

	phoneBackdrop: new FullsizeBackdrop( 'media/phone.jpg' ),
	showPhone: false,
	playerAlive: true,
	keysBound: true,
	
	init: function() {
		this.bindKeys();
		this.clearColor = null;

		this.lifeTimer = new ig.Timer(10);
		this.levelTimer = new ig.Timer(10.5);

		this.loadLevel( LevelOffice );
		this.controls = ig.game.spawnEntity(EntityControls, CONTROLS_X, CONTROLS_Y, {blink: false});
	},

	
	update: function() {
		if (this.levelTimer.delta() >= 0) {
			this.sceneManager.pushScene( new BlackScene() );
		}
		
		var arm = ig.game.getEntityByName('left_arm');

		var time = this.lifeTimer.delta();

		if (typeof arm !== 'undefined') arm.lift = ig.input.state('phone') || time <= -9;

		if (this.playerAlive && time >= -1) {
			if (this.keysBound) this.unbindKeys();
			if (time >= 0) this.killPlayer();
			this.showPhone = false;
		} else {
			this.showPhone = (typeof arm !== 'undefined' && arm.lifted) || time <= -9;
		}

		this.parent();
	},


	draw: function() {
		if(this.showPhone) this.displayPhone();
		else this.parent();
	},


	killPlayer: function() {
		this.playerAlive = false;
		ig.music.stop();
		playerHead = ig.game.getEntityByName('player_head');
		playerHead.explode();
	},

	
	displayPhone: function() {
		this.phoneBackdrop.draw();

		ig.system.context.save();

		ig.system.context.fillStyle = 'white';
		ig.system.context.textAlign = 'center';

		// Menu Text
		ig.system.context.font = 'bold 72px sans-serif';
		var time = (this.lifeTimer.delta() >= 0) ? 10 : (this.lifeTimer.delta() + 10).toFixed(2);
		ig.system.context.fillText( time, 320, 250);

		// Restore the previous context
		ig.system.context.restore();

	},

	
	unbindKeys: function() {
		this.keysBound = false;
		ig.input.unbind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.unbind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.unbind(ig.KEY.UP_ARROW, 'up');
		ig.input.unbind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.unbind(ig.KEY.SPACE, 'phone');
	},


	bindKeys: function() {
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.SPACE, 'phone');
	}

});


BlackScene = Scene.extend({

	init: function( title ) {
		this.timer = new ig.Timer(1);
	},


	update: function() {
		if ( this.timer.delta() >= 0 ) {
			this.sceneManager.pushScene( new EndScene() );
		}

		this.parent();
	}
});


EndScene = Scene.extend({
	backdrop: new FullsizeBackdrop( 'media/end.jpg' ),
	word_index: 0,
	word_time: 3,
	words: [
		'GAME OVER',
		'POINTS: 0',
		'BY BORDEN'
	],

	init: function( title ) {
		this.clearColor = null;
		this.timer = new ig.Timer(this.word_time);
	},

	update: function() {
		if ( this.timer.delta() >= 0 ) {
			this.word_index++;
			this.timer.set(this.word_time)
			if (this.word_index >= this.words.length) this.sceneManager.pushScene( new TitleScene() );
		}


		this.parent();
	},


	draw: function() {		
		this.backdrop.draw();

		ig.system.context.save();

		ig.system.context.fillStyle = 'white';
		ig.system.context.textAlign = 'center';

		ig.system.context.font = 'bold 36px sans-serif';
		ig.system.context.fillText( this.words[this.word_index], 320, 250);

		ig.system.context.restore();

		this.parent();
	}
});

ig.main('#canvas', ParentScreen, 60, 640, 480, 1);
});
