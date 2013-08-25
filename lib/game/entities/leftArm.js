
ig.module(
	'game.entities.leftArm'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityLeftArm = ig.Entity.extend({
	
	size: {x: 200, y: 200},
	name: 'left_arm',
	
	gravityFactor: 0,
	lift: false,
	lifted: false,
	liftAngle: -0.5,
	restAngle: 0,
	armSpeed: 0.05,
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet('media/left_arm.png', 200, 200),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );

		this.currentAnim = this.anims['idle'];
		this.zindex = -100;
		ig.game.sortEntitiesDeferred();
	},

	raise: function() {
		if (this.currentAnim.angle > this.liftAngle) this.currentAnim.angle -= this.armSpeed;
		else this.lifted = true;
	},

	lower: function() {
		this.currentAnim.angle += this.armSpeed;
		this.lifted = false;
	},

	update: function() {
		if(this.lift == true) this.raise();
		else if (this.currentAnim.angle < this.restAngle) this.lower();
		this.parent();
	},

});

});
