const config = {
    type: Phaser.AUTO,
    width: 896,
    height: 504,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
          debug: false,
          gravity: {y: 0}
        }
      },
    scene: [
        LoadScene,
        PrototypingScene
    ]
}
const game = new Phaser.Game(config);
