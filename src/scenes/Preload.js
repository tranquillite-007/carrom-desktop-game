class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// progress
		const progress = this.add.text(960, 819, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.visible = false;
		progress.text = "0%";
		progress.setStyle({ "fontSize": "54px" });

		// carrom
		const carrom = this.add.image(959, 540, "carrom");
		carrom.scaleX = 0.9;
		carrom.scaleY = 0.9;
		carrom.tintTopLeft = 13421001;
		carrom.tintTopRight = 13421001;
		carrom.tintBottomLeft = 13421001;
		carrom.tintBottomRight = 13421001;

		// loading_bar
		const loading_bar = this.add.image(960, 1000, "loading_bar");

		// innerBar
		const innerBar = this.add.image(705, 1000, "loading");
		innerBar.setOrigin(0, 0.5);
		innerBar.visible = false;

		// text_1
		const text_1 = this.add.text(803, 932, "", {});
		text_1.text = "Loading...";
		text_1.setStyle({ "fontFamily": "Montserrat", "fontSize": "42px" });

		// txt_progress
		const txt_progress = this.add.text(1015, 932, "", {});
		txt_progress.setStyle({ "fontFamily": "Montserrat", "fontSize": "42px" });

		// logoPrefab
		const logoPrefab = new LogoPrefab(this, 960, 391);
		this.add.existing(logoPrefab);

		// progress (components)
		new PreloadText(progress);

		this.loading_bar = loading_bar;
		this.innerBar = innerBar;
		this.txt_progress = txt_progress;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	loading_bar;
	/** @type {Phaser.GameObjects.Image} */
	innerBar;
	/** @type {Phaser.GameObjects.Text} */
	txt_progress;


	preload() {

		this.editorCreate();

		this.editorPreload();
		this.isGameLoaded1 = false;
		this.isGameLoaded2 = false;
		this.load.on(Phaser.Loader.Events.COMPLETE, (p) => {
			this.isGameLoaded1 = true;
		});

		this.innerBarWidth = this.innerBar.displayWidth;

		this.maskGraphics = this.make.graphics();
		this.maskGraphics.fillStyle(0xffffff);
		this.maskGraphics.fillRect(
			this.innerBar.x,
			this.innerBar.y - this.innerBar.displayHeight / 2,
			this.innerBar.displayWidth,
			this.innerBar.displayHeight
		);

		this.innerBar.setMask(this.maskGraphics.createGeometryMask());

		const loadingDuration = 3000;
		const intervalDuration = 30;
		const numIntervals = loadingDuration / intervalDuration;
		let currentInterval = 0;
		const progressIncrement = 1 / numIntervals;

		const updateProgressBar = () => {
			this.innerBar.setVisible(true);
			const currentProgress = currentInterval * progressIncrement;
			this.maskGraphics.clear();
			this.maskGraphics.fillStyle(0xffffff);
			this.maskGraphics.fillRect(
				this.innerBar.x,
				this.innerBar.y - this.innerBar.displayHeight / 2,
				this.innerBarWidth * currentProgress,
				this.innerBar.displayHeight
			);
			this.txt_progress.setText((currentProgress * 100).toFixed(0) + '%');
			currentInterval++;
			if (currentProgress >= 1) {
				clearInterval(progressInterval);
				this.isGameLoaded2 = true;
			}
		};

		const progressInterval = setInterval(updateProgressBar, intervalDuration);
	}

	update() {
		if (this.isGameLoaded1 && this.isGameLoaded2) {
			this.scene.stop("Preload");
			this.scene.start("Home");
		}
	}
}
