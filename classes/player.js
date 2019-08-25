class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y);

        Phaser.GameObjects.Sprite.call(this, scene, x, y, "Player", "BadPlayer");
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.scene.cameras.main.startFollow(this, false, .1, .6);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.setGravity(0, 400);
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

        if ((this.cursors.up.isDown || this.cursors.space.isDown) && this.body.blocked.down) {
            this.setVelocityY(-250);
        }
    }
};