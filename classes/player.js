let _scene;
class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y);

        Phaser.GameObjects.Sprite.call(this, scene, x, y, "Player", "BadPlayer");
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.scene.cameras.main.startFollow(this, false, .1, .6);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        _scene = scene;
        this.setCollideWorldBounds(true);
        this.body.setGravity(0, 400);
        this.invincible = false;
        this.maxHealth = 100;
        this.health = 100;
    }
    controlsCheck() {
        if (this.cursors.left.isDown || keys.A.isDown) {
            this.flipX = true;
            this.setVelocityX(-160);
        } else if (this.cursors.right.isDown || keys.D.isDown) {
            this.flipX = false;
            this.setVelocityX(160);
        } else {
            this.setVelocityX(0);
        }

        if ((this.cursors.up.isDown || this.cursors.space.isDown) && this.body.onFloor()) {
            this.setVelocityY(-250);
        }
    }
    update() {
        this.controlsCheck();
    }
};