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

		this.currentAnim = this.anims['idle'];
	},



	update: function() {
		this.parent();
	},

});

});
