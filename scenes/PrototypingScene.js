class PrototypingScene extends Phaser.Scene {
    constructor() {
        super({
            key: "PrototypingScene"
        })
    }
    create() {
        this.map = this.make.tilemap({
            key: "PrototypingMap"
        });
        this.mapTiles = this.map.addTilesetImage("tiles", "tiles");
        this.BG1 = this.map.createStaticLayer("BG1", this.mapTiles, 0, 0);
        this.FG1 = this.map.createStaticLayer("FG1", this.mapTiles, 0, 0);
    }
    update() {
        
    }
}