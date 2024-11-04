class LogoPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? -143);

		// redCoin
		const redCoin = scene.add.image(439, -80, "redCoin");
		redCoin.angle = 20;
		this.add(redCoin);

		// blackCoin
		const blackCoin = scene.add.image(349, -40, "blackCoin");
		blackCoin.scaleX = 2.1;
		blackCoin.scaleY = 2.1;
		this.add(blackCoin);

		// whiteCoin
		const whiteCoin = scene.add.image(457, 14, "whiteCoin");
		whiteCoin.scaleX = 1.2;
		whiteCoin.scaleY = 1.2;
		whiteCoin.angle = 45;
		this.add(whiteCoin);

		// logo
		const logo = scene.add.image(0, 143, "logo");
		this.add(logo);

		this.redCoin = redCoin;
		this.blackCoin = blackCoin;
		this.whiteCoin = whiteCoin;
	}

	/** @type {Phaser.GameObjects.Image} */
	redCoin;
	/** @type {Phaser.GameObjects.Image} */
	blackCoin;
	/** @type {Phaser.GameObjects.Image} */
	whiteCoin;
}