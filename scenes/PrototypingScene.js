var keys;
class PrototypingScene extends Phaser.Scene {
    constructor() {
        super({
            key: "PrototypingScene"
        })
    }
    create() {
        keys = this.input.keyboard.addKeys("W,A,S,D");
        this.cameras.main.setBounds(0, 0, 896, 504);
        this.spikes = this.physics.add.group();
        this.map = this.make.tilemap({
            key: "PrototypingMap"
        });
        this.mapTiles = this.map.addTilesetImage("tiles", "tiles");
        this.spawn = this.map.findObject("Positions", obj => obj.name === "Spawn");
        this.BG1 = this.map.createStaticLayer("BG1", this.mapTiles, 0, 0);
        this.FG1 = this.map.createStaticLayer("FG1", this.mapTiles, 0, 0);

        this.player = new Player(this, this.spawn.x, this.spawn.y);

        this.FG1.setCollisionByProperty({
            collides: true
        });
        this.physics.add.collider(this.player, this.FG1);
    }
    update() {
        this.player.controlsCheck();
    }
}