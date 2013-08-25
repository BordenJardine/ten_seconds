ig.module(
	'game.entities.drHead'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityDrHead = ig.Entity.extend({
	
	size: {x: 55, y: 55},
	name: 'dr_head',

	blinkChance: 3,
	blinkTime: 1,
	blinkingTime: 0.5,
	
	movementSpeed: 100,
	friction: {x: 500, y: 500},
	gravityFactor: 0,
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet('media/dr_head.png', 55, 55),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'blink', 1, [1] );

		this.currentAnim = this.anims['idle'];

		this.blinkTimer = new ig.Timer(this.blinkTime);
		this.blinkingTimer = new ig.Timer();
	},


	blink: function(){
		if(this.blinkTimer.delta() >= 0){
			this.blinkTimer.set(this.blinkTime);
			var chance = Math.floor((Math.random()*this.blinkChance));
			if (chance == 0) this.blinkingTimer.set(this.blinkingTime);
		}

		if(this.blinkingTimer.delta() < 0) return true;

		return false;
	},


	update: function() {
		this.currentAnim = (this.blink()) ? this.anims['blink'] : this.anims['idle'];

		this.parent();
	},

});

});
