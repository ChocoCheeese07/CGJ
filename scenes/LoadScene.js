var percentText;
class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: "LoadScene"
        })
    }
    preload() {
        this.cameras.main.backgroundColor.setTo(101, 200, 45);

        this.load.audio("BGMusic", "./assets/sounds/BGMusic.wav");
        this.load.audio("Jump", "./assets/sounds/Jump.wav");
        this.load.audio("LevelComplete", "./assets/sounds/LevelComplete.wav");


        this.load.tilemapTiledJSON("TutorialMap", "./assets/tilemaps/prototype.json");
        this.load.tilemapTiledJSON("Level1", "./assets/tilemaps/Level1.json");
        this.load.tilemapTiledJSON("Level2", "./assets/tilemaps/Level2.json");
        this.load.tilemapTiledJSON("Level3", "./assets/tilemaps/Level3.json");
        this.load.tilemapTiledJSON("Level4", "./assets/tilemaps/Level4.json");
        this.load.tilemapTiledJSON("Level5", "./assets/tilemaps/Level5.json");

        this.load.atlas("tiles", "./assets/images/tiles.png", "./assets/images/tiles.json");
        this.load.atlas("Player", "./assets/images/Player.png", "./assets/images/Player.json");
        this.load.atlas("Guide", "./assets/images/Guide.png", "./assets/images/Guide.json");
        
        percentText = this.add.text(config.width / 2, config.height / 2, "Loading: ").setOrigin(0.5, 0.5);
        percentText.setFill("#000000");

        this.load.on('progress', function (value) {
            percentText.setText("Loading: " + Math.round(value * 100) + "%");
        });

        this.load.on('complete', function () {
            game.scene.stop("LoadScene");
            game.scene.start("TutorialScene");

        });
    }
    create() {

    }
};