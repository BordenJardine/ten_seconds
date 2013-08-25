ig.module(
	'game.entities.gib'
)
.requires(
	'impact.entity',
	'plugins.box2d.entity'
)
.defines(function(){

EntityGib = ig.Box2DEntity.extend({
	size: {x: 20, y: 25},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,

	animSheet: new ig.AnimationSheet( 'media/big_gib.png', 20, 25),
	vel: 200,
	torque: 15,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		var animRand = Math.floor((Math.random()*4));
		var angleRand = Math.floor((Math.random()*7));
		this.addAnim( 'idle', 1, [animRand] );
		this.currentAnim.angle = angleRand;

		var vx = this.vel * Math.cos(angleRand);
		var vy = this.vel * Math.sin(angleRand);
		this.body.ApplyImpulse(new b2.Vec2(vx, vy), this.body.GetPosition());
		this.body.ApplyTorque(this.torque);
		this.body.m_linearDamping = 0.7;
		this.body.m_angularDamping = 0.6;

		ig.game.sortEntitiesDeferred();
	},

	update: function() {
		this.parent();
	},

});

});
