ig.module(
	'game.entities.controls'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityControls = ig.Entity.extend({
	
	size: {x: 341, y: 43},
	name: 'player_body',

	blink: false,
	
	gravityFactor: 0,
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet('media/ctrls.png', 341, 43),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );

		this.currentAnim = this.anims['idle'];
		this.blink = settings.blink;
		if(this.blink) this.blinkTimer = new ig.Timer(0);
	},



	draw: function() {
		if(!this.blink || Math.floor(this.blinkTimer.delta())%2 == 0){
			this.parent();
		}
	},

});

});
