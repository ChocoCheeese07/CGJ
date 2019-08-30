class TextBox extends Phaser.GameObjects.Image {
    constructor(scene, x, y, text) {
        super(scene, x, y);

        Phaser.GameObjects.Sprite.call(this, scene, x, y, "tiles", "TextBox");

        scene.add.existing(this);
        this.setOrigin(.5);
        scene.physics.add.existing(this);
        this.text = this.scene.add.text(this.x, this.y, text).setAlign("center").setOrigin(.5);
        this.text.setFontSize(9);
        this.text.setScrollFactor(0);
        this.setScale(2.5);
        this.setScrollFactor(0);
    }
    update() {
        
    }
};