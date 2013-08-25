ig.module(
	'game.entities.playerHead'
)
.requires(
	'impact.entity',
	'game.entities.gib'
)
.defines(function(){

EntityPlayerHead = ig.Entity.extend({
	
	size: {x: 55, y: 55},
	name: 'player_head',
	
	friction: {x: 500, y: 500},
	gravityFactor: 0,
	
	bang: new ig.Sound('media/bang.ogg'),

	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet('media/player_head.png', 55, 55),	
	
	flip: false,
	blinkTime: 3,
	blinkingTime: 0.5,
	exploding: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'blink', 1, [1] );
		this.addAnim( 'up', 1, [3] );
		this.addAnim( 'down', 1, [4] );

		this.addAnim( 'explode', 0.1, [5,6,7], true );

		this.currentAnim = this.anims['idle'];

		this.blinkTimer = new ig.Timer(this.blinkTime);
		this.blinkingTimer = new ig.Timer();
	},



	update: function() {
		if (this.exploding) {
			if(this.currentAnim.loopCount) this.kill();
		} else {
			this.updateAnimations();
		}

		this.parent();
	},

 	updateAnimations: function() {
		if(ig.input.state('left')) this.moveSomething(function(obj) { obj.flip = true });
		else this.flip = false;
		
		if(ig.input.state('up')) this.moveSomething(function(obj) { obj.currentAnim = obj.anims['up'] });
		else if(ig.input.state('down')) this.moveSomething(function(obj) { obj.currentAnim = obj.anims['down'] });
		else this.currentAnim = (this.blink()) ? this.anims['blink'] : this.anims['idle'];
		this.currentAnim.flip.x = this.flip;
	},


	blink: function(){
		if(this.blinkTimer.delta() >= 0){
			this.blinkTimer.set(this.blinkTime);
			this.blinkingTimer.set(this.blinkingTime);
		}

		if(this.blinkingTimer.delta() < 0) return true;

		return false;
	},
	

	moveSomething: function(callback) {
		this.blinkTimer.set(this.blinkTime);
		callback(this);
	},


	explode: function() {
		this.exploding = true;
		this.currentAnim = this.anims['explode'];
		this.bang.play();
		for(x = 0; x <= 3; x++){
			var xRand = Math.floor((Math.random()*this.size.x) + 1);
			var yRand = Math.floor((Math.random()*this.size.y) + 1);
			ig.game.spawnEntity(EntityGib, this.pos.x, this.pos.y);
		}
	}

});

});
