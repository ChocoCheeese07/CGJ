var keys;
var BGMusic;
class TutorialScene extends Phaser.Scene {
    constructor() {
        super({
            key: "TutorialScene"
        })
    }
    create() {
        keys = this.input.keyboard.addKeys("W,A,S,D");
        this.physics.world.setBounds(0, 0, 896, 504);
        this.cameras.main.setBounds(0, 0, 896, 504);
        this.map = this.make.tilemap({
            key: "TutorialMap"
        });
        BGMusic = this.sound.add("BGMusic", {
            mute: false,
            volume: .4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        BGMusic.play();
        this.rainbowComplete = false;
        this.crabComplete = false;
        this.spikeComplete = false;

        this.mapTiles = this.map.addTilesetImage("tiles", "tiles");
        this.spawn = this.map.findObject("Objects", obj => obj.name === "Spawn");
        this.BG1 = this.map.createStaticLayer("BG1", this.mapTiles, 0, 0);
        this.FG1 = this.map.createStaticLayer("FG1", this.mapTiles, 0, 0);
        this.Spikes = this.map.createStaticLayer("Spikes", this.mapTiles, 0, 0);
        this.RainbowBlocks = this.map.createStaticLayer("RainbowBlocks", this.mapTiles, 0, 0);
        var playerSpeedUpgradeTimeout;
        this.tutorialOver = false;
        this.Spikes.setTileIndexCallback(4, () => {
            if(this.rainbowComplete === true && this.crabComplete === true) {
            this.physics.world.colliders.getActive().find(function (i) {
                return i.name == 'SpikeCollider'
            }).destroy();
            this.player.xSpeed *= 2;
            playerSpeedUpgradeTimeout = setTimeout(() => {
                this.player.xSpeed /= 2;
                this.physics.add.overlap(this.player, this.Spikes).name = "SpikeCollider";
            }, 10000);
            this.tutorial.text.destroy();
            this.tutorial.destroy();
            this.success = new TextBox(this, 448, 252, "Well, I think you get the point. Press enter to start the game.");
            this.success.text.setFontSize(12);
            this.success.setScale(8.2, 1);
            this.tutorialOver = true;
            }
        }, this);

        this.RainbowBlocks.setTileIndexCallback(3, () => {
            if (playerSpeedUpgradeTimeout !== undefined) {
                clearTimeout(playerSpeedUpgradeTimeout);
            };
            this.player.setPosition(this.spawn.x, this.spawn.y);
            this.player.xSpeed = 160;
            if(this.rainbowComplete !== true) {
            this.tutorial.text.setText("Touch the crab.");
            };
            this.rainbowComplete = true;
        }, this);

        this.player = new Player(this, this.spawn.x, this.spawn.y);
        this.tutorial = new TextBox(this, 448, 64, "Touch the rainbows.").setScale(4);
        this.tutorial.text.setFontSize(19);

        this.FG1.setCollisionByProperty({
            collides: true
        });
        this.Spikes.setCollisionByProperty({
            collides: true
        });
        this.FG1.setTileIndexCallback(6, () => {
        if(this.rainbowComplete === true) {
        this.crabComplete = true;
            this.player.detectingControls = false;
            this.player.setVelocity(-this.player.xSpeed * 1.3, -300);
            this.tutorial.text.setFontSize(18.5)
            this.tutorial.text.setText("Dont touch the spike");
            }
        }, this);

        this.physics.add.collider(this.player, this.FG1, () => { this.player.detectingControls = true });

        this.physics.add.overlap(this.player, this.Spikes).name = "SpikeCollider";
        this.physics.add.overlap(this.player, this.RainbowBlocks).name = "RainbowBlockCollider";
    }
    update() {
        if(this.tutorialOver === true) {
        this.input.keyboard.on('keydown-' + 'ENTER', function (event) {
            if (playerSpeedUpgradeTimeout !== undefined) {
                clearTimeout(playerSpeedUpgradeTimeout);
            };
            game.scene.stop("TutorialScene");
            game.scene.start("Level1");
        });
    };
        this.player.update();
    }
}
