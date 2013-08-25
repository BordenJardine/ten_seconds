ig.module(
	'game.entities.gib'
)
.requires(
	'impact.entity',
	'plugins.box2d.entity'
)
.defines(function(){

EntityBigGib = ig.Box2DEntity.extend({
	size: {x: 20, y: 25},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,

	animSheet: new ig.AnimationSheet( 'media/big_gib.png', 20, 25),
	maxVel: 200,
	maxTorque: 15,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		var animRand = Math.floor((Math.random()*4));
		var angleRand = Math.floor((Math.random()*7));
		var vel = Math.floor((Math.random()*this.maxVel) + 200);
		var torque = Math.floor((Math.random()*this.maxTorque));

		this.addAnim( 'idle', 1, [animRand] );
		this.currentAnim.angle = angleRand;

		var vx = vel * Math.cos(angleRand);
		var vy = vel * Math.sin(angleRand);
		this.body.ApplyImpulse(new b2.Vec2(vx, vy), this.body.GetPosition());
		this.body.ApplyTorque(torque);
		this.body.m_linearDamping = 0.7;
		this.body.m_angularDamping = 0.6;

		ig.game.sortEntitiesDeferred();
	},

	update: function() {
		this.parent();
	}

});


EntityLittleGib = ig.Box2DEntity.extend({
	size: {x: 8, y: 8},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,

	animSheet: new ig.AnimationSheet( 'media/little_gib.png', 8, 8),
	maxVel: 400,
	maxTorque: 35,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		var animRand = Math.floor((Math.random()*4));
		var angleRand = Math.floor((Math.random()*7));
		var vel = Math.floor((Math.random()*this.maxVel) + 200);
		var torque = Math.floor((Math.random()*this.maxTorque));

		this.addAnim( 'idle', 1, [animRand] );
		this.currentAnim.angle = angleRand;

		var vx = vel * Math.cos(angleRand);
		var vy = vel * Math.sin(angleRand);
		this.body.ApplyImpulse(new b2.Vec2(vx, vy), this.body.GetPosition());
		this.body.ApplyTorque(torque);
		this.body.m_linearDamping = 0.7;
		this.body.m_angularDamping = 0.6;

		ig.game.sortEntitiesDeferred();
	},

	update: function() {
		this.parent();
	},

});

});
