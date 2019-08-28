var keys;

class PrototypingScene extends Phaser.Scene {
    constructor() {
        super({
            key: "PrototypingScene"
        })
    }
    findObject(layerID, name, map) {
        return map.findObject(layerID, obj => obj.name === name);
    };
    create() {
        keys = this.input.keyboard.addKeys("W,A,S,D");
        this.physics.world.setBounds(0, 0, 1792, 504);
        this.cameras.main.setBounds(0, 0, 1792, 504);
        this.spikes = this.physics.add.group();
        this.map = this.make.tilemap({
            key: "PrototypingMap"
        });
        this.mapTiles = this.map.addTilesetImage("tiles", "tiles");
        this.spawn = this.findObject("Objects", "Spawn", this.map);
        this.BG1 = this.map.createStaticLayer("BG1", this.mapTiles, 0, 0);
        this.FG1 = this.map.createStaticLayer("FG1", this.mapTiles, 0, 0);
        this.spikes = [
        this.findObject("Objects", "Spike1", this.map),
        this.findObject("Objects", "Spike2", this.map),
        this.findObject("Objects", "Spike3", this.map)
        ];

        this.spike1 = this.physics.add.image(this.spikes[0].x, this.spikes[0].y, "tiles", "Rainbow").
        setOrigin(1).setImmovable(true);
        this.spike2 = this.physics.add.image(this.spikes[1].x, this.spikes[1].y, "tiles", "Rainbow").
        setOrigin(1).setImmovable(true);
        this.spike3 = this.physics.add.image(this.spikes[2].x, this.spikes[2].y, "tiles", "Spike").
        setOrigin(1).
        setImmovable(true).
        setSize(32, 25, false);
        this.spike3.setOffset(0, 7);

        this.player = new Player(this, this.spawn.x, this.spawn.y);
        this.healthDisplay = this.add.text(30, 10, "Health: " + this.player.health).
        setScrollFactor(0);

        this.FG1.setCollisionByProperty({
            collides: true
        });
        this.physics.add.collider(this.player, this.FG1);
        this.physics.add.collider(this.player, [this.spike1, this.spike2], () => {
            this.player.health -= 10;
        });
        this.physics.add.collider(this.player, this.spike3, () => {
            this.player.health += 10;
        });
    }
    update() {
        this.healthDisplay.setText("Health: " + this.player.health);
        if(this.player.health <= 0) {
            this.scene.restart();
        }
        this.player.update();
    }
}
