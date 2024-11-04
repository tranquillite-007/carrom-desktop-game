class Home extends Phaser.Scene {

	constructor() {
		super("Home");
	}

	/** @returns {void} */
	editorCreate() {

		// carrom
		const carrom = this.add.image(960, 540, "carrom");
		carrom.scaleX = 0.9;
		carrom.scaleY = 0.9;
		carrom.tintTopLeft = 13421001;
		carrom.tintTopRight = 13421001;
		carrom.tintBottomLeft = 13421001;
		carrom.tintBottomRight = 13421001;

		// logoPrefab
		const logoPrefab = new LogoPrefab(this, 960, 391);
		this.add.existing(logoPrefab);
		logoPrefab.scaleX = 1.2;
		logoPrefab.scaleY = 1.2;

		// play_button
		const play_button = this.add.image(960, 790, "play_button");
		play_button.setInteractive(this.input.makePixelPerfect());

		this.logoPrefab = logoPrefab;
		this.play_button = play_button;

		this.events.emit("scene-awake");
	}

	/** @type {LogoPrefab} */
	logoPrefab;
	/** @type {Phaser.GameObjects.Image} */
	play_button;

	create() {

		this.editorCreate();
		this.logoAnimation();
		this.play_button.setInteractive();
		this.play_button.on('pointerover', () => {
			this.input.setDefaultCursor('pointer');
			this.play_button.setScale(1.1);
		});
		this.play_button.on('pointerout', () => {
			this.input.setDefaultCursor('default');
			this.play_button.setScale(1);
		});
		this.play_button.on("pointerdown", () => {
			this.input.setDefaultCursor('default');
			this.play_button.setScale(1);
			this.tweens.add({
				targets: this.play_button,
				scaleX: 0.8,
				scaleY: 0.8,
				yoyo: true,
				duration: 100,
				onComplete: () => {
					this.scene.stop("Home");
					this.scene.start("Level");
				}
			})
		})
	}

	logoAnimation() {
		this.tweens.add({
			targets: this.logoPrefab.blackCoin,
			x: 349,
			y: 36,
			duration: 1000,
			delay: 400,
			yoyo: true,
			repeat: -1,
		});
		this.tweens.add({
			targets: this.logoPrefab.redCoin,
			x: 385,
			y: 68,
			duration: 1000,
			delay: 800,
			yoyo: true,
			repeat: -1,
		});
		this.tweens.add({
			targets: this.logoPrefab.whiteCoin,
			x: 411,
			y: 60,
			duration: 1000,
			delay: 1200,
			yoyo: true,
			repeat: -1,
		});
	}

}