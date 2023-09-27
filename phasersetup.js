let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameContainer',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },  // No gravity for a top-down game like Space Invaders
            debug: false  // Set to true if you want to see the physics debug information
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


let game = new Phaser.Game(config);

function preload() {
    // Load any game assets here
    this.load.image('player', 'assets/ship.png');// Example: this.load.image('player', 'path_to_player_image.png');
    // For example: this.load.image('player', 'path_to_player_image.png');
    this.load.image('projectile', 'assets/projectile.png')
}

let player;
let cursors;
let projectiles;
let asciiGroup;

function create() {
    // Create player
    player = this.physics.add.sprite(400, 550, 'player');  // Replace 'player' with your asset key if you loaded one

    // Create controls
    cursors = this.input.keyboard.createCursorKeys();

    // Create projectiles group
    projectiles = this.physics.add.group();

    // Create ASCII art lines as enemies
    asciiGroup = this.physics.add.staticGroup();
    // Use your ASCII lines and create sprites or images for each line
    // Consider each line of ASCII art as a separate sprite

    // Add collision between projectiles and ASCII lines
    this.physics.add.collider(projectiles, asciiGroup, destroyAscii, null, this);
}

function destroyAscii(projectile, asciiLine) {
    projectile.destroy();
    asciiLine.destroy();
}

function update() {
    // Player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    // Shooting (on space key)
    if (cursors.space.isDown) {
        shootProjectile(this);
    }
}

function shootProjectile(scene) {
    // Create a projectile and add to the projectiles group
    let projectile = projectiles.create(player.x, player.y, 'projectile'); // Ensure you load the projectile sprite in the preload function
    projectile.setVelocityY(-400);
}