class SoundManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.clickSound = this.oScene.sound.add("click");
        this.coinCollideSound = this.oScene.sound.add("coinsCollide");
        this.coinCollideWallSound = this.oScene.sound.add("coinsCollideWall");
        this.wrongCoinFoulsSound = this.oScene.sound.add("wrongCoinFouls");
        this.rightCoinFoulsSound = this.oScene.sound.add("rightCoinFouls");
    }
    playSound(key, loop) {
        key.play({volume: 1});
        key.loop = loop;
    }
    stopSound(key, loop) {
        key.loop = loop
        key.stop();
    }
}