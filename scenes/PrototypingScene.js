var keys;

class PrototypingScene extends Phaser.Scene {
    constructor() {
        super({
            key: "PrototypingScene"
        })
    }
    create() {
        keys = this.input.keyboard.addKeys("W,A,S,D");
        this.physics.world.setBounds(0, 0, 896, 504);
        this.cameras.main.setBounds(0, 0, 896, 504);
        this.map = this.make.tilemap({
            key: "PrototypingMap"
        });
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
            this.success.setScale(6.5, 1);
            }
        }, this);

        this.RainbowBlocks.setTileIndexCallback(3, () => {
            if (playerSpeedUpgradeTimeout !== undefined) {
                clearTimeout(playerSpeedUpgradeTimeout);
            };
            this.player.setPosition(this.spawn.x, this.spawn.y);
            this.player.xSpeed = 160;
            this.physics.world.colliders.getActive().find(function (i) {
                return i.name == 'RainbowBlockCollider'
            }).destroy();
            this.rainbowComplete = true;
            this.tutorial.text.setText("Touch the crab.");
            this.RainbowBlocks.setVisible(false);
        }, this);

        this.player = new Player(this, this.spawn.x, this.spawn.y);
        this.tutorial = new TextBox(this, 76, 32, "Touch the rainbows.");

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
            this.player.setVelocity(-200, -300);
            this.tutorial.text.setText("Dont touch the spike");
            }
        }, this);

        this.physics.add.collider(this.player, this.FG1, () => { this.player.detectingControls = true });

        this.physics.add.overlap(this.player, this.Spikes).name = "SpikeCollider";
        this.physics.add.overlap(this.player, this.RainbowBlocks).name = "RainbowBlockCollider";
    }
    update() {
        this.player.update();
    }
}
