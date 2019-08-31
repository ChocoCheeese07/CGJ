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
        TutorialScene,
        Level1,
        Level2,
        Level3,
        Level4,
        Level5
    ]
}
const game = new Phaser.Game(config);
