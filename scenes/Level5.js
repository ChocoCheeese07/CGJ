var keys;
var playerSpeedUpgradeTimeout;
class Level5 extends Phaser.Scene {
    constructor() {
        super({
            key: "Level5"
        })
    }
    create() {
        keys = this.input.keyboard.addKeys("W,A,S,D");
        this.physics.world.setBounds(0, 0, 2688, 568);
        this.cameras.main.setBounds(0, 0, 2688, 504);
        this.map = this.make.tilemap({
            key: "Level5"
        });
        this.mapTiles = this.map.addTilesetImage("tiles", "tiles");
        this.spawn = this.map.findObject("Objects", obj => obj.name === "Spawn");

        this.BG1 = this.map.createStaticLayer("BG1", this.mapTiles, 0, 0);
        this.FG1 = this.map.createStaticLayer("FG1", this.mapTiles, 0, 0);

        this.Spikes = this.map.createStaticLayer("Spikes", this.mapTiles, 0, 0);
        this.RainbowBlocks = this.map.createStaticLayer("RainbowBlocks", this.mapTiles, 0, 0);

        this.Spikes.setTileIndexCallback(4, () => {
            this.physics.world.colliders.getActive().find(function (i) {
                if(i.name === "SpikeCollider") {
                return i.name === 'SpikeCollider'
            } 
            }).destroy();
            this.player.xSpeed *= 2;
            playerSpeedUpgradeTimeout = setTimeout(() => {
                this.player.xSpeed /= 2;
                this.physics.add.overlap(this.player, this.Spikes).name = "SpikeCollider";
            }, 10000);
        }, this);

        this.RainbowBlocks.setTileIndexCallback(3, () => {
            if (playerSpeedUpgradeTimeout !== undefined) {
                clearTimeout(playerSpeedUpgradeTimeout);
            };
            this.scene.restart();
        }, this);

        this.FG1.setTileIndexCallback(6, () => {
            this.player.detectingControls = false;
            this.player.setVelocity(-this.player.xSpeed * 1.3, -300);
        }, this);

        this.FG1.setTileIndexCallback(9, () => {
            this.player.levelCompleteSound.play();
            this.scene.pause();
            this.gameComplete = new TextBox(this, 448, 252, "You completed the game! Now you restart.");
            this.gameComplete.setScale(4, 1);
            setTimeout(() => {
                this.sound.remove(BGMusic);
                this.scene.stop("Level5");
                this.scene.start("TutorialScene");
            }, 5000);
        }, this);

        this.player = new Player(this, this.spawn.x, this.spawn.y);

        this.FG1.setCollisionByProperty({
            collides: true
        });
        this.Spikes.setCollisionByProperty({
            collides: true
        });

        this.physics.add.collider(this.player, this.FG1, () => {
            this.player.detectingControls = true
        });

        this.physics.add.overlap(this.player, this.Spikes).name = "SpikeCollider";
        this.physics.add.overlap(this.player, this.RainbowBlocks).name = "RainbowBlockCollider";
    }
    update() {
        if (this.player.y >= 535) {
            if (playerSpeedUpgradeTimeout !== undefined) {
                clearTimeout(playerSpeedUpgradeTimeout);
            };
            this.scene.restart();
        };
        this.player.update();
    }
}