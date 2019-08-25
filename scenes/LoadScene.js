var percentText;
class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: "LoadScene"
        })
    }
    preload() {
        this.cameras.main.backgroundColor.setTo(101, 200, 45);

        this.load.tilemapTiledJSON("PrototypingMap", "./assets/tilemaps/prototype.json");
        this.load.atlas("tiles", "./assets/images/tiles.png", "./assets/images/tiles.json");
        this.load.atlas("Player", "./assets/images/Player.png", "./assets/images/Player.json");
        
        percentText = this.add.text(config.width / 2, config.height / 2, "Loading: ").setOrigin(0.5, 0.5);
        percentText.setFill("#000000");

        this.load.on('progress', function (value) {
            percentText.setText("Loading: " + Math.round(value * 100) + "%");
        });

        this.load.on('complete', function () {
            game.scene.stop("LoadScene");
            game.scene.start("PrototypingScene");
        });
    }
    create() {

    }
};