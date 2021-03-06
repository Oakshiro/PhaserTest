
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.time.advancedTiming = true; //for FPS
    game.load.image('barrel', 'game/assets/sprites/barrel.png');
    game.load.image('chunk', 'game/assets/sprites/chunk.png');
    game.load.image('bullets', 'game/assets/sprites/arrow.png');

}

var cannon;
var bullets;
var angle = 0;
var fireRate = 100;
var nextFire = 0;

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.gravity.y = 170;
    game.physics.p2.restitution = 0.8;
    game.physics.p2.friction = 0.1;

    bullets = game.add.group();
    bullets.createMultiple(500, 'bullets', 0, false);

    cannon = game.add.sprite(50, 500, 'barrel');
    cannon.anchor.set(0, 0.5);

}

function fire() {

    if (game.time.now > nextFire)
    {
        nextFire = game.time.now + fireRate;

    	var bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.frame = game.rnd.integerInRange(0, 6);
            bullet.exists = true;
            bullet.position.set(cannon.x, cannon.y);

            game.physics.p2.enable(bullet);

            bullet.body.rotation = cannon.rotation + game.math.degToRad(-90);

            var magnitude = 500;
            var angle = bullet.body.rotation + Math.PI / 2;

            bullet.body.velocity.x = magnitude * Math.cos(angle);
            bullet.body.velocity.y = magnitude * Math.sin(angle);
        }
    }

}

function update() {

    var dx = game.input.activePointer.worldX - cannon.x;
    var dy = game.input.activePointer.worldY - cannon.y;
    cannon.rotation = Math.atan2(dy, dx);

    if (game.input.activePointer.isDown)
    {
        fire();
    }

}

function render() 
{
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");   
}
