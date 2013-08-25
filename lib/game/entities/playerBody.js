ig.module(
	'game.entities.playerBody'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayerBody = ig.Entity.extend({
	
	size: {x: 140, y: 228},
	name: 'player_body',
	
	friction: {x: 500, y: 500},
	gravityFactor: 0,
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet('media/player_body.png', 140, 228),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );

		this.currentAnim = this.anims['idle'];
	},



	update: function() {
		this.parent();
	},

});

});
