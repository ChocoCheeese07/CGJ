let _scene;
class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y);

        Phaser.GameObjects.Sprite.call(this, scene, x, y, "Player", "BadPlayer");
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.scene.cameras.main.startFollow(this, false, .1, .6);
        this.xSpeed = 160;
        this.jumpHeight = 250;
        this.detectingControls = true;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.JumpSound = this.scene.sound.add("Jump", {
            mute: false,
            volume: 5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });
        this.levelCompleteSound = this.scene.sound.add("LevelComplete", {
            mute: false,
            volume: 6,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        this.setCollideWorldBounds(true);
        this.body.setGravity(0, 400);
        this.invincible = false;
        this.maxHealth = 100;
        this.health = 100;
    }
    controlsCheck() {
        if (this.cursors.left.isDown || keys.A.isDown) {
            this.flipX = true;
            this.setVelocityX(-this.xSpeed);
        } else if (this.cursors.right.isDown || keys.D.isDown) {
            this.flipX = false;
            this.setVelocityX(this.xSpeed);
        } else {
            this.setVelocityX(0);
        }

        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.body.onFloor()) {
            this.JumpSound.play();
            this.setVelocityY(-this.jumpHeight);
          }
    }
    update() {
        if(this.detectingControls == true) {
        this.controlsCheck();
        };
    }
};