ig.module(
	'game.entities.drBody'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityDrBody = ig.Entity.extend({
	
	size: {x: 78, y: 287},
	name: 'dr_body',
	
	friction: {x: 500, y: 500},
	gravityFactor: 0,
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet('media/dr_body.png', 78, 287),	
	
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
