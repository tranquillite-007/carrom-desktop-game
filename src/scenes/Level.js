let nStretchDistance;
let nMaxStretch = 1000;
let nVelocityX, nVelocityY, angle;
let queenCoin;
let userTurn = true;
let strikerCollideWithHall = false;
let repeateUserTurn = false;
let repeateOpponentTurn = false;
let userQueenFouls = false;
let opponentQueenFouls = false;
let queenCovered = false;
let nUserScore = 0;
let nOpponentScore = 0;
let userWin = true;
let gameOver = false;

class Level extends Phaser.Scene {

	constructor() {
		super("Level");
	}

	/** @returns {void} */
	editorCreate() {

		// body
		const body = this.add.container(0, 3);

		// container_background
		const container_background = this.add.container(0, 1);
		body.add(container_background);

		// container_walls
		const container_walls = this.add.container(0, 0);
		container_background.add(container_walls);

		// wall_1
		const wall_1 = this.add.rectangle(613, 540, 128, 128);
		wall_1.scaleY = 7;
		container_walls.add(wall_1);

		// wall_2
		const wall_2 = this.add.rectangle(1050, 132, 128, 128);
		wall_2.scaleY = 7;
		wall_2.angle = 90;
		container_walls.add(wall_2);

		// wall_3
		const wall_3 = this.add.rectangle(1355, 540, 128, 128);
		wall_3.scaleY = 7;
		container_walls.add(wall_3);

		// wall_4
		const wall_4 = this.add.rectangle(1050, 876, 128, 128);
		wall_4.scaleY = 7;
		wall_4.angle = 90;
		container_walls.add(wall_4);

		// carrom_board
		const carrom_board = this.add.image(960, 540, "carrom-board");
		carrom_board.scaleX = 0.8;
		carrom_board.scaleY = 0.8;
		container_background.add(carrom_board);

		// container_halls
		const container_halls = this.add.container(0, 0);
		body.add(container_halls);

		// hall_1
		const hall_1 = this.add.ellipse(689, 823, 128, 128);
		hall_1.scaleX = 0.2;
		hall_1.scaleY = 0.2;
		container_halls.add(hall_1);

		// hall_2
		const hall_2 = this.add.ellipse(690, 264, 128, 128);
		hall_2.scaleX = 0.2;
		hall_2.scaleY = 0.2;
		container_halls.add(hall_2);

		// hall_3
		const hall_3 = this.add.ellipse(1244, 262, 128, 128);
		hall_3.scaleX = 0.2;
		hall_3.scaleY = 0.2;
		container_halls.add(hall_3);

		// hall_4
		const hall_4 = this.add.ellipse(1247, 823, 128, 128);
		hall_4.scaleX = 0.2;
		hall_4.scaleY = 0.2;
		container_halls.add(hall_4);

		// container_slider
		const container_slider = this.add.container(0, 0);
		body.add(container_slider);

		// slidebar
		const slidebar = this.add.image(964, 979, "player_1_slidebar");
		slidebar.scaleX = 0.9;
		slidebar.scaleY = 0.9;
		container_slider.add(slidebar);

		// player_2_slidebar
		const player_2_slidebar = this.add.image(964, 115, "player_2_slidebar");
		player_2_slidebar.scaleX = 0.9;
		player_2_slidebar.scaleY = 0.9;
		container_slider.add(player_2_slidebar);

		// slider
		const slider = this.add.sprite(784, 979, "striker");
		slider.name = "slider";
		slider.scaleX = 1.1;
		slider.scaleY = 1.1;
		container_slider.add(slider);

		// container_user
		const container_user = this.add.container(0, 0);
		body.add(container_user);

		// user_img
		const user_img = this.add.image(390, 445, "avatar_1");
		user_img.scaleX = 0.85;
		user_img.scaleY = 0.85;
		container_user.add(user_img);

		// userName
		const userName = this.add.text(390, 541, "", {});
		userName.setOrigin(0.5, 0.5);
		userName.text = "Player 1";
		userName.setStyle({ "fontFamily": "Montserrat", "fontSize": "40px" });
		container_user.add(userName);

		// score_bar
		const score_bar = this.add.image(390, 690, "score_bar");
		score_bar.scaleX = 0.9;
		score_bar.scaleY = 0.9;
		container_user.add(score_bar);

		// userScore
		const userScore = this.add.text(360, 690, "", {});
		userScore.setOrigin(0.5, 0.5);
		userScore.text = "0/9";
		userScore.setStyle({ "fontFamily": "Montserrat", "fontSize": "46px" });
		container_user.add(userScore);

		// player_1Coin
		const player_1Coin = this.add.image(462.10322254664015, 685.8837893365247, "whiteCoin");
		player_1Coin.setOrigin(0.4929938826793139, 0.4678421182496111);
		container_user.add(player_1Coin);

		// container_opponent
		const container_opponent = this.add.container(0, 0);
		body.add(container_opponent);

		// opponent_img
		const opponent_img = this.add.image(1543, 445, "avatar_2");
		opponent_img.scaleX = 0.85;
		opponent_img.scaleY = 0.85;
		container_opponent.add(opponent_img);

		// opponentName
		const opponentName = this.add.text(1543, 541, "", {});
		opponentName.setOrigin(0.5, 0.5);
		opponentName.text = "Player 2";
		opponentName.setStyle({ "fontFamily": "Montserrat", "fontSize": "40px" });
		container_opponent.add(opponentName);

		// score_bar_1
		const score_bar_1 = this.add.image(1543, 690, "score_bar");
		score_bar_1.scaleX = 0.9;
		score_bar_1.scaleY = 0.9;
		container_opponent.add(score_bar_1);

		// opponentScore
		const opponentScore = this.add.text(1513, 690, "", {});
		opponentScore.setOrigin(0.5, 0.5);
		opponentScore.text = "0/9";
		opponentScore.setStyle({ "fontFamily": "Montserrat", "fontSize": "46px" });
		container_opponent.add(opponentScore);

		// player_2Coin
		const player_2Coin = this.add.image(1616, 689.7022360926392, "blackCoin");
		player_2Coin.scaleX = 1.72;
		player_2Coin.scaleY = 1.72;
		player_2Coin.setOrigin(0.5, 0.4986475113444411);
		container_opponent.add(player_2Coin);

		// container_whiteCoins
		const container_whiteCoins = this.add.container(0, 0);
		body.add(container_whiteCoins);

		// container_blackCoins
		const container_blackCoins = this.add.container(0, 0);
		body.add(container_blackCoins);

		// container_queen
		const container_queen = this.add.container(0, 0);
		body.add(container_queen);

		// container_striker
		const container_striker = this.add.container(0, 0);
		body.add(container_striker);

		// container_winnerImage
		const container_winnerImage = this.add.container(0, -3);
		body.add(container_winnerImage);

		// home_button
		const home_button = this.add.image(1500, 109, "home_button");
		home_button.setInteractive(this.input.makePixelPerfect());
		body.add(home_button);

		this.container_walls = container_walls;
		this.carrom_board = carrom_board;
		this.container_halls = container_halls;
		this.slider = slider;
		this.userScore = userScore;
		this.player_1Coin = player_1Coin;
		this.opponentScore = opponentScore;
		this.player_2Coin = player_2Coin;
		this.container_whiteCoins = container_whiteCoins;
		this.container_blackCoins = container_blackCoins;
		this.container_queen = container_queen;
		this.container_striker = container_striker;
		this.container_winnerImage = container_winnerImage;
		this.home_button = home_button;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	container_walls;
	/** @type {Phaser.GameObjects.Image} */
	carrom_board;
	/** @type {Phaser.GameObjects.Container} */
	container_halls;
	/** @type {Phaser.GameObjects.Sprite} */
	slider;
	/** @type {Phaser.GameObjects.Text} */
	userScore;
	/** @type {Phaser.GameObjects.Image} */
	player_1Coin;
	/** @type {Phaser.GameObjects.Text} */
	opponentScore;
	/** @type {Phaser.GameObjects.Image} */
	player_2Coin;
	/** @type {Phaser.GameObjects.Container} */
	container_whiteCoins;
	/** @type {Phaser.GameObjects.Container} */
	container_blackCoins;
	/** @type {Phaser.GameObjects.Container} */
	container_queen;
	/** @type {Phaser.GameObjects.Container} */
	container_striker;
	/** @type {Phaser.GameObjects.Container} */
	container_winnerImage;
	/** @type {Phaser.GameObjects.Image} */
	home_button;

	checkForWinner(userWin) {
		clearInterval(this.interval);
		let winnerText;
		gameOver = true;
		if (userWin == true) {
			winnerText = this.add.image(960, -75, "you_win").setScale(0.6, 0.6);
		}
		else {
			winnerText = this.add.image(960, -75, "you_lose").setScale(0.6, 0.6);
		}
		this.container_winnerImage.add(winnerText);
		let winnerImage = this.add.image(960, 1246, "avatar_1").setScale(0.62, 0.62);
		this.container_winnerImage.add(winnerImage);
		let playerName = this.add.text(960, 1328, "", {});
		playerName.setOrigin(0.5, 0.5);
		playerName.text = "Player 1";
		playerName.setStyle({ "fontFamily": "Montserrat", "fontSize": "32px" });
		this.container_winnerImage.add(playerName);
		let replayButton = this.add.image(960, 1246, "replay_button");
		this.container_winnerImage.add(replayButton);
		this.slider.disableInteractive();
		this.striker.disableInteractive();
		this.striker.body.setVelocity(0);
		this.striker.setBounce(0);
		this.container_blackCoins.list.forEach((coin) => {
			coin.body.setVelocity(0);
		});
		this.container_whiteCoins.list.forEach((coin) => {
			coin.body.setVelocity(0);
		});
		queenCoin.body.setVelocity(0);
		queenCoin.destroy();
		this.physics.pause();
		this.gameOverAnimation(replayButton, userWin);
	}

	gameOverAnimation(replayButton, userWin) {
		if (userWin) {
			this.winnerConfetti();
		}
		this.player_1Coin.setScale(1, 1);
		this.player_2Coin.setScale(1.72, 1.72);
		this.userTurnTween.stop();
		let pos = [396, 559, 628, 784];
		this.container_winnerImage.list.forEach((image, i) => {
			this.tweens.add({
				targets: image,
				ease: "power3",
				y: pos[i],
				duration: 1000,
				onComplete: () => {
					this.striker.disableInteractive();
					this.slider.disableInteractive();
					replayButton.setInteractive(this.input.makePixelPerfect());
					replayButton.on('pointerover', () => {
						this.input.setDefaultCursor('pointer');
						replayButton.setScale(1.1);
					});
					replayButton.on('pointerout', () => {
						this.input.setDefaultCursor('default');
						replayButton.setScale(1);
					});
					replayButton.on("pointerdown", () => {
						replayButton.setScale(1);
						this.buttonAnimation(replayButton);
					});
				}
			});
		})
	}

	winnerConfetti() {
		const count = 200,
			defaults = {
				origin: { y: 0.7 },
			};

		function fire(particleRatio, opts) {
			confetti(
				Object.assign({}, defaults, opts, {
					particleCount: Math.floor(count * particleRatio),
				})
			);
		}

		fire(0.25, {
			spread: 26,
			startVelocity: 55,
		});

		fire(0.2, {
			spread: 60,
		});

		fire(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8,
		});

		fire(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2,
		});

		fire(0.1, {
			spread: 120,
			startVelocity: 45,
		});
	}

	buttonAnimation(button) {
		this.tweens.add({
			targets: button,
			scaleX: 0.8,
			scaleY: 0.8,
			yoyo: true,
			duration: 100,
			onComplete: () => {
				repeateUserTurn = false;
				repeateOpponentTurn = false;
				userQueenFouls = false;
				opponentQueenFouls = false;
				queenCovered = false;
				gameOver = false;
				userTurn = true;
				nUserScore = 0;
				nOpponentScore = 0;
				this.userScore.setText(nUserScore, +"/9");
				this.opponentScore.setText(nOpponentScore, +"/9");
				if (button.texture.key == "replay_button") {
					this.input.setDefaultCursor('default');
					this.scene.restart("Level");
				}
				if (button.texture.key == "home_button") {
					this.scene.stop("Level");
					this.scene.start("Home");
				}
			}
		});
	}

	userTurnAniamtion(target) {
		let scale;
		if (target == this.player_1Coin) {
			scale = 1.2;
		}
		if (target == this.player_2Coin) {
			scale = 1.92;
		}
		if (this.userTurnTween) {
			this.player_1Coin.setScale(1, 1);
			this.player_2Coin.setScale(1.72, 1.72);
			this.userTurnTween.stop();
		}
		this.userTurnTween = this.tweens.add({
			targets: target,
			scaleX: scale,
			scaleY: scale,
			ease: "power4",
			duration: 700,
			yoyo: true,
			repeat: -1
		});
	}

	popUpAnimation(text) {
		let reduceScore = this.add.text(this.striker.x, this.striker.y, -text, { fontFamily: "Montserrat", fontSize: 60 }).setAngle(-10);
		this.tweens.add({
			targets: reduceScore,
			angle: 10,
			alpha: 0,
			y: +1,
			ease: "power4",
			duration: 5000,
		});
	}

	create() {

		document.body.style.backgroundImage = "url('assets/images/background.png')";
		this.editorCreate();
		this.oSoundManager = new SoundManager(this);
		if (userTurn) {
			this.userTurnAniamtion(this.player_1Coin);
		} else {
			this.userTurnAniamtion(this.player_2Coin);
		}
		this.home_button.setInteractive();
		this.home_button.on('pointerover', () => {
			this.input.setDefaultCursor('pointer');
			this.home_button.setScale(1.1);
		});
		this.home_button.on('pointerout', () => {
			this.input.setDefaultCursor('default');
			this.home_button.setScale(1);
		});
		this.home_button.on("pointerdown", () => {
			this.input.setDefaultCursor('default');
			this.home_button.setScale(1);
			this.buttonAnimation(this.home_button);
		});

		this.arrow = this.add.image(784, 773, "direction-arrow").setScale(0, 0).setOrigin(0.5, 0.5);
		this.arrow.setVisible(false);
		this.container_striker.add(this.arrow);

		if (userTurn) {
			this.striker = this.physics.add.sprite(784, 773, "striker").setOrigin(0.5, 0.5).setScale(1, 1);
			this.striker.setName("striker");
			this.striker.body.setCircle(28, 5, 5);
			this.container_striker.add(this.striker);
			this.striker.setDamping(true);
			this.striker.setDrag(0.6);
		}
		if (!userTurn) {
			this.striker = this.physics.add.sprite(784, 313, "striker").setOrigin(0.5, 0.5).setScale(1, 1);
			this.striker.setName("striker");
			this.striker.body.setCircle(28, 5, 5);
			this.container_striker.add(this.striker);
			this.slider.setPosition(784, 109);
		}

		// whiteCoin_1
		const whiteCoin_1 = this.add.image(931, 555, "whiteCoin");
		whiteCoin_1.scaleX = 0.37;
		whiteCoin_1.scaleY = 0.37;
		this.container_whiteCoins.add(whiteCoin_1);

		// whiteCoin_2
		const whiteCoin_2 = this.add.image(996, 569, "whiteCoin");
		whiteCoin_2.scaleX = 0.37;
		whiteCoin_2.scaleY = 0.37;
		this.container_whiteCoins.add(whiteCoin_2);

		// whiteCoin_3
		const whiteCoin_3 = this.add.image(975, 506, "whiteCoin");
		whiteCoin_3.scaleX = 0.37;
		whiteCoin_3.scaleY = 0.37;
		this.container_whiteCoins.add(whiteCoin_3);

		// whiteCoin_4
		const whiteCoin_4 = this.add.image(1013, 488, "whiteCoin");
		whiteCoin_4.scaleX = 0.37;
		whiteCoin_4.scaleY = 0.37;
		this.container_whiteCoins.add(whiteCoin_4);

		// whiteCoin_5
		const whiteCoin_5 = this.add.image(940, 477, "whiteCoin");
		whiteCoin_5.scaleX = 0.37;
		whiteCoin_5.scaleY = 0.37;
		this.container_whiteCoins.add(whiteCoin_5);

		// whiteCoin_6
		const whiteCoin_6 = this.add.image(896, 535, "whiteCoin");
		whiteCoin_6.scaleX = 0.37;
		whiteCoin_6.scaleY = 0.37;
		this.container_whiteCoins.add(whiteCoin_6);

		// whiteCoin_7
		const whiteCoin_7 = this.add.image(923, 599, "whiteCoin");
		whiteCoin_7.scaleX = 0.37;
		whiteCoin_7.scaleY = 0.37;
		this.container_whiteCoins.add(whiteCoin_7);

		// whiteCoin_8
		const whiteCoin_8 = this.add.image(992, 609, "whiteCoin");
		whiteCoin_8.scaleX = 0.37;
		whiteCoin_8.scaleY = 0.37;
		this.container_whiteCoins.add(whiteCoin_8);

		// whiteCoin_9
		const whiteCoin_9 = this.add.image(1037, 554, "whiteCoin");
		whiteCoin_9.scaleX = 0.37;
		whiteCoin_9.scaleY = 0.37;
		this.container_whiteCoins.add(whiteCoin_9);

		// blackCoin_1
		const blackCoin_1 = this.add.image(960, 581, "blackCoin");
		blackCoin_1.scaleX = 0.64;
		blackCoin_1.scaleY = 0.64;
		this.container_blackCoins.add(blackCoin_1);

		// blackCoin_2
		const blackCoin_2 = this.add.image(1005, 532, "blackCoin");
		blackCoin_2.scaleX = 0.64;
		blackCoin_2.scaleY = 0.64;
		this.container_blackCoins.add(blackCoin_2);

		// blackCoin_3
		const blackCoin_3 = this.add.image(938, 517, "blackCoin");
		blackCoin_3.scaleX = 0.64;
		blackCoin_3.scaleY = 0.64;
		this.container_blackCoins.add(blackCoin_3);

		// blackCoin_4
		const blackCoin_4 = this.add.image(979, 468, "blackCoin");
		blackCoin_4.scaleX = 0.64;
		blackCoin_4.scaleY = 0.64;
		this.container_blackCoins.add(blackCoin_4);

		// blackCoin_5
		const blackCoin_5 = this.add.image(1028, 591, "blackCoin");
		blackCoin_5.scaleX = 0.64;
		blackCoin_5.scaleY = 0.64;
		this.container_blackCoins.add(blackCoin_5);

		// blackCoin_6
		const blackCoin_6 = this.add.image(1039, 516, "blackCoin");
		blackCoin_6.scaleX = 0.64;
		blackCoin_6.scaleY = 0.64;
		this.container_blackCoins.add(blackCoin_6);

		// blackCoin_7
		const blackCoin_7 = this.add.image(955, 618, "blackCoin");
		blackCoin_7.scaleX = 0.64;
		blackCoin_7.scaleY = 0.64;
		this.container_blackCoins.add(blackCoin_7);

		// blackCoin_8
		const blackCoin_8 = this.add.image(897, 573, "blackCoin");
		blackCoin_8.scaleX = 0.64;
		blackCoin_8.scaleY = 0.64;
		this.container_blackCoins.add(blackCoin_8);

		// blackCoin_9
		const blackCoin_9 = this.add.image(905, 498, "blackCoin");
		blackCoin_9.scaleX = 0.64;
		blackCoin_9.scaleY = 0.64;
		this.container_blackCoins.add(blackCoin_9);

		// redCoin
		queenCoin = this.add.image(967, 546, "redCoin");
		queenCoin.scaleX = 0.21;
		queenCoin.scaleY = 0.21;
		this.container_queen.add(queenCoin);


		this.hallsGroup = this.add.group();
		this.wallGroup = this.add.group();
		this.whiteCoinGroup = this.add.group();
		this.blackCoinGroup = this.add.group();
		this.speedBreakerGroup = this.add.group();

		this.container_walls.list.forEach((wall) => {
			this.physics.add.existing(wall, true);
			if (wall.angle != 90) {
				wall.body.setSize(100, 900);
				wall.body.setOffset(-3, 0);
			}
			else {
				wall.body.setSize(900, 100);
				wall.body.setOffset(-450, 440);
			}
			this.wallGroup.add(wall);
		});

		this.container_whiteCoins.list.forEach((coin) => {
			this.physics.add.existing(coin, false);
			coin.body.setCircle(50, 16, 10);
			coin.body.setDamping(true);
			coin.body.setDrag(0.5);
			this.whiteCoinGroup.add(coin);
		});

		this.container_blackCoins.list.forEach((coin) => {
			this.physics.add.existing(coin, false);
			coin.body.setCircle(30, 34, 34);
			coin.body.setDamping(true);
			coin.body.setDrag(0.5);
			this.blackCoinGroup.add(coin);
		});

		this.physics.add.existing(queenCoin, false);
		queenCoin.body.setCircle(93, 40, 40);
		queenCoin.body.setDamping(true);
		queenCoin.body.setDrag(0.5);

		this.container_halls.list.forEach((hall) => {
			this.physics.add.existing(hall, true);
			hall.body.setCircle(10, 15, 15);
			this.hallsGroup.add(hall);
		})

		this.setCollider();
		this.strikeCoins();
		this.setStrikerPosition();

	}

	setCollider() {

		this.physics.add.collider(this.wallGroup, this.striker, () => {
			this.oSoundManager.playSound(this.oSoundManager.coinCollideWallSound, false);
		});
		this.physics.add.collider(this.wallGroup, queenCoin, () => {
			this.oSoundManager.playSound(this.oSoundManager.coinCollideWallSound, false);
		});

		this.physics.add.collider(this.wallGroup, this.whiteCoinGroup, (wall, coin) => {
			this.oSoundManager.playSound(this.oSoundManager.coinCollideWallSound, false);
		});

		this.physics.add.collider(this.wallGroup, this.blackCoinGroup, (wall, coin) => {
			this.oSoundManager.playSound(this.oSoundManager.coinCollideWallSound, false);
		});

		this.physics.add.overlap(this.hallsGroup, this.striker, (hall, striker) => {
			this.striker.disableInteractive();
			this.physics.pause();
			this.coinFallAnimation(this.striker, hall);
			strikerCollideWithHall = true;
			this.oSoundManager.playSound(this.oSoundManager.wrongCoinFoulsSound, false);
			if (userTurn && nUserScore > 0) {
				if (repeateUserTurn && !userQueenFouls) {
					if (nUserScore >= 2) {
						nUserScore -= 2;
						this.popUpAnimation(2);
					}
					else {
						nUserScore--;
						this.popUpAnimation(1);
					}
					const whiteCoinCharge = this.physics.add.sprite(967, 546, "whiteCoin");
					whiteCoinCharge.scaleX = 0.37;
					whiteCoinCharge.scaleY = 0.37;
					whiteCoinCharge.body.setCircle(50, 16, 10);
					this.container_whiteCoins.add(whiteCoinCharge);
					this.whiteCoinGroup.add(whiteCoinCharge);
					repeateUserTurn = false;
				}
				else {
					nUserScore--;
					this.popUpAnimation(1);
				}
				this.userScore.setText(nUserScore + "/9");
				const whiteCoinCharge = this.physics.add.sprite(967, 546, "whiteCoin");
				whiteCoinCharge.scaleX = 0.37;
				whiteCoinCharge.scaleY = 0.37;
				whiteCoinCharge.body.setCircle(50, 16, 10);
				this.container_whiteCoins.add(whiteCoinCharge);
				this.whiteCoinGroup.add(whiteCoinCharge);
			}
			if (!userTurn && nOpponentScore > 0) {
				if (repeateOpponentTurn && !opponentQueenFouls) {
					if (nOpponentScore >= 2) {
						nOpponentScore -= 2;
						this.popUpAnimation(2);
					}
					else {
						nOpponentScore--;
						this.popUpAnimation(1);
					}
					const blackCoinCharge = this.physics.add.sprite(967, 546, "blackCoin");
					blackCoinCharge.scaleX = 0.64;
					blackCoinCharge.scaleY = 0.64;
					blackCoinCharge.body.setCircle(30, 34, 34);
					this.container_blackCoins.add(blackCoinCharge);
					this.blackCoinGroup.add(blackCoinCharge);
					repeateOpponentTurn = false;
				}
				else {
					nOpponentScore--;
					this.popUpAnimation(1);
				}
				this.opponentScore.setText(nOpponentScore + "/9");
				const blackCoinCharge = this.physics.add.sprite(967, 546, "blackCoin");
				blackCoinCharge.scaleX = 0.64;
				blackCoinCharge.scaleY = 0.64;
				blackCoinCharge.body.setCircle(30, 34, 34);
				this.container_blackCoins.add(blackCoinCharge);
				this.blackCoinGroup.add(blackCoinCharge);
			}
			if (queenCoin.visible == false && !queenCovered) {
				queenCoin.setPosition(967, 546).setVisible(true);
			}
		});

		this.physics.add.overlap(this.hallsGroup, this.blackCoinGroup, (hall, coin) => {
			coin.body.destroy();
			this.coinFallAnimation(coin, hall);
			nOpponentScore++;
			this.opponentScore.setText(nOpponentScore + "/9");
			if (!userTurn) {
				this.oSoundManager.playSound(this.oSoundManager.rightCoinFoulsSound, false);
				if (this.container_blackCoins.list.length >= 2) {
					if (!opponentQueenFouls) {
						if (!strikerCollideWithHall) {
							repeateOpponentTurn = true;
							if (repeateUserTurn) {
								repeateOpponentTurn = false;
							}
						} else {
							strikerCollideWithHall = false;
						}
					}
					if (opponentQueenFouls && !strikerCollideWithHall) {
						queenCoin.setPosition(this.opponentScore.x - 120, this.opponentScore.y).setVisible(true).setScale(0.4);
						queenCoin.body.setVelocity(0);
						queenCovered = true;
						opponentQueenFouls = false;
					}
				}
				else {
					if (!queenCovered) {
						userWin = true;
						this.checkForWinner(userWin);
					}
					else {
						userWin = false;
						this.checkForWinner(userWin);
					}
				}
			}
			else {
				console.log(`%c black coins ::`, 'color: #00ff00', this.container_blackCoins.list.length);
				this.oSoundManager.playSound(this.oSoundManager.wrongCoinFoulsSound, false);
				if (this.container_blackCoins.list.length == 1) {
					userWin = false;
					this.checkForWinner(userWin);
				}
			}
		});

		this.physics.add.overlap(this.hallsGroup, this.whiteCoinGroup, (hall, coin) => {
			coin.body.destroy();
			this.coinFallAnimation(coin, hall);
			nUserScore++;
			this.userScore.setText(nUserScore + "/9");
			if (userTurn) {
				this.oSoundManager.playSound(this.oSoundManager.rightCoinFoulsSound, false);
				if (this.container_whiteCoins.list.length >= 2) {
					if (!userQueenFouls) {
						if (!strikerCollideWithHall) {
							repeateUserTurn = true;
							if (repeateOpponentTurn) {
								repeateUserTurn = false;
							}
						}
						else {
							strikerCollideWithHall = false;
						}
					}
					if (userQueenFouls && !strikerCollideWithHall) {
						queenCoin.setPosition(this.userScore.x - 120, this.userScore.y).setVisible(true).setScale(0.4);
						queenCoin.body.setVelocity(0);
						queenCovered = true;
						userQueenFouls = false;
					}
				}
				else {
					if (!queenCovered) {
						userWin = false;
						this.checkForWinner(userWin);
					}
					else {
						userWin = true;
						this.checkForWinner(userWin);
					}
				}
			}
			else {
				console.log(`%c white coins ::`, 'color: #ff0000', this.container_whiteCoins.list.length);

				this.oSoundManager.playSound(this.oSoundManager.wrongCoinFoulsSound, false);
				if (this.container_whiteCoins.list.length == 1) {
					userWin = true;
					this.checkForWinner(userWin);
				}
			}
		});

		this.physics.add.overlap(this.hallsGroup, queenCoin, (hall, coin) => {
			// this.coinFallAnimation(coin, hall);
			queenCoin.setPosition(0, 0).setVisible(false);
			if (!userTurn) {
				if (this.container_blackCoins.list.length >= 1) {
					this.oSoundManager.playSound(this.oSoundManager.rightCoinFoulsSound, false);
					opponentQueenFouls = true;
					if (!strikerCollideWithHall) {
						repeateOpponentTurn = true;
						if (repeateUserTurn) {
							repeateOpponentTurn = false;
						}
					}
					else {
						strikerCollideWithHall = false;
					}
				}
				else {
					this.oSoundManager.playSound(this.oSoundManager.wrongCoinFoulsSound, false);
					userWin = true;
					this.checkForWinner(userWin);
				}
			}
			else {
				if (this.container_whiteCoins.list.length >= 1) {
					this.oSoundManager.playSound(this.oSoundManager.rightCoinFoulsSound, false);
					userQueenFouls = true;
					if (!strikerCollideWithHall) {
						repeateUserTurn = true;
						if (repeateOpponentTurn) {
							repeateUserTurn = false;
						}
					}
					else {
						strikerCollideWithHall = false;
					}
				}
				else {
					this.oSoundManager.playSound(this.oSoundManager.wrongCoinFoulsSound, false);
					userWin = false;
					this.checkForWinner(userWin);
				}
			}
		});

		this.physics.add.collider(this.whiteCoinGroup, this.striker, () => {
			this.oSoundManager.playSound(this.oSoundManager.coinCollideSound, false);
		});

		this.physics.add.collider(this.blackCoinGroup, this.striker, () => {
			this.oSoundManager.playSound(this.oSoundManager.coinCollideSound, false);
		});

		this.physics.add.collider(this.whiteCoinGroup, this.blackCoinGroup, () => {
			this.oSoundManager.playSound(this.oSoundManager.coinCollideSound, false);
		});

		this.physics.add.collider(queenCoin, this.blackCoinGroup, () => {
			this.oSoundManager.playSound(this.oSoundManager.coinCollideSound, false);
		});

		this.physics.add.collider(queenCoin, this.whiteCoinGroup, () => {
			this.oSoundManager.playSound(this.oSoundManager.coinCollideSound, false);
		});

		this.physics.add.collider(queenCoin, this.striker, () => {
			this.oSoundManager.playSound(this.oSoundManager.coinCollideSound, false);
		});

		this.physics.add.collider(this.whiteCoinGroup, this.whiteCoinGroup, () => {
			this.oSoundManager.playSound(this.oSoundManager.coinCollideSound, false);
		});

		this.physics.add.collider(this.blackCoinGroup, this.blackCoinGroup, () => {
			this.oSoundManager.playSound(this.oSoundManager.coinCollideSound, false);
		});
	}

	coinFallAnimation(coin, hall) {
		coin.body.setVelocity(0, 0);
		coin.body.setBounce(0);
		this.tweens.add({
			targets: coin,
			x: hall.x,
			y: hall.y,
			alpha: 0,
			duration: 200,
			onComplete: () => {
				if (coin != this.striker && coin != queenCoin) {
					coin.destroy();
				}
				if (coin == queenCoin) {
					queenCoin.setVisible(false);
				}
			}
		})
	}

	setStrikerPosition() {
		this.slider.setInteractive();
		this.input.setDraggable(this.slider);
		this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
			this.home_button.disableInteractive();
			if (gameObject.name == "slider") {
				dragX = Math.min(Math.max(784, dragX), 1152);

				gameObject.x = dragX;
				this.striker.x = gameObject.x;
			}
		});

		this.input.on('dragend', (pointer, gameObject) => {
			this.home_button.setInteractive();
			this.findOverlappingCoins();
			this.strikeCoins();
		});
	}

	findOverlappingCoins() {
		this.container_blackCoins.list.forEach((coin) => {
			this.chackOverlapping(coin);
		});
		this.container_whiteCoins.list.forEach((coin) => {
			this.chackOverlapping(coin);
		});
		this.container_queen.list.forEach((coin) => {
			this.chackOverlapping(coin);
		});
	}

	chackOverlapping(coin) {
		if (coin.x >= this.striker.x - 45 && coin.x <= this.striker.x + 45) {
			if (coin.y >= this.striker.y - 45 && coin.y <= this.striker.y + 45) {

				if (this.striker.x > 740 && this.striker.x < 1152) {
					this.striker.x = coin.x + 50;
				}
				if (this.striker.x >= 1130) {
					this.striker.x = coin.x - 50;
				}
				this.slider.x = this.striker.x;
			}
		}
	}

	strikeCoins() {
		this.striker.setInteractive();
		this.input.setDraggable(this.striker);
		this.findOverlappingCoins();

		this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
			this.home_button.disableInteractive();
			this.findOverlappingCoins();
			if (gameObject.name == "striker") {

				this.arrow.setPosition(this.striker.x, this.striker.y);
				this.arrow.setVisible(true);
				angle = Phaser.Math.Angle.Between(this.striker.x, this.striker.y, dragX, dragY);

				if (userTurn) {
					this.arrow.scale = Phaser.Math.Clamp((dragY / 600 - gameObject.y / 600) + 1, 1, 2);
					nStretchDistance = Phaser.Math.Clamp((dragY - gameObject.y) + 100, 0, nMaxStretch);
					this.striker.setRotation(angle);
					if (angle < 1.80) {
						this.arrow.setRotation(-(-angle + 7.9));
					}
					else {
						this.arrow.setRotation(angle - 1.6);
					}
				}
				else {
					this.arrow.scale = Phaser.Math.Clamp((-(dragY / 600 - gameObject.y / 600)) + 1, 1, 2);
					nStretchDistance = Phaser.Math.Clamp(-(dragY - gameObject.y) + 100, 0, nMaxStretch);
					this.striker.setRotation(-angle);
					if (angle < -1.59) {
						this.arrow.setRotation(-(-angle + 7.9));
					}

					else {
						this.arrow.setRotation(angle - 1.6);
					}
				}
			}
		});

		this.input.once('dragend', (pointer, gameObject) => {
			this.home_button.setInteractive();
			this.arrow.setVisible(false);
			if (gameObject.name == "striker") {

				this.striker.disableInteractive();
				this.slider.disableInteractive();

				nVelocityX = Math.cos(this.striker.rotation) * nStretchDistance * 4;
				nVelocityY = Math.sin(this.striker.rotation) * nStretchDistance * 4;
				if (nStretchDistance > 125) {
					if (userTurn) {
						gameObject.setVelocity(-nVelocityX, -nVelocityY);
					}
					else {
						gameObject.setVelocity(-nVelocityX, nVelocityY);
					}
					gameObject.body.setBounce(1, 1);
					this.container_whiteCoins.list.forEach((coin) => {
						coin.body.setBounce(1, 1);
					});
					this.container_blackCoins.list.forEach((coin) => {
						coin.body.setBounce(1, 1);
					});
					queenCoin.body.setBounce(1, 1);

					strikerCollideWithHall = false;
					repeateUserTurn = false;
					repeateOpponentTurn = false;
					this.physics.resume();
					this.striker.disableInteractive();
					this.interval = setInterval(() => {
						if (this.striker.body.velocity.x < 2 && this.striker.body.velocity.x > -1 && this.striker.body.velocity.y < 2 && this.striker.body.velocity.y > -1) {
							this.stopMovement();
						}
					}, 1000);
				}
				else {
					this.slider.setInteractive();
					this.input.setDraggable(this.slider);
					this.striker.setInteractive();
					this.input.setDraggable(this.striker);
				}
			}
		});

	}

	stopMovement() {
		clearInterval(this.interval);
		this.striker.body.setVelocity(0);
		this.striker.setBounce(0);
		this.container_blackCoins.list.forEach((coin) => {
			coin.body.setVelocity(0);
		});
		this.container_whiteCoins.list.forEach((coin) => {
			coin.body.setVelocity(0);
		});
		queenCoin.body.setVelocity(0);

		setTimeout(() => {
			if (this.striker.visible == false) {
				this.striker.setVisible(true);
			}
		}, 500);

		if (!repeateUserTurn && !repeateOpponentTurn) {
			if (userTurn) {
				if (userQueenFouls && !queenCovered) {
					console.log(`%c userQueenFouls`, 'color: #ff0000', userQueenFouls);
					queenCoin.setPosition(964, 546).setVisible(true);
					userQueenFouls = false;
				}
			}
			else {
				if (opponentQueenFouls && !queenCovered) {
					console.log(`%c opponentQueenFouls`, 'color: #00ff00', opponentQueenFouls);
					queenCoin.setPosition(964, 546).setVisible(true);
					opponentQueenFouls = false;
				}
			}
			userTurn = !userTurn;
		}

		if (userTurn) {
			console.log(`%c repeateuserTurn`, 'color: #ff0000', repeateUserTurn);
			repeateUserTurn = false;
			setTimeout(() => {
				this.striker.setPosition(784, 773).setAlpha(1);
				this.slider.setPosition(784, 979);
				this.slider.setInteractive();
				this.striker.setInteractive();
				this.findOverlappingCoins();
				this.userTurnAniamtion(this.player_1Coin);
				this.physics.pause();
			}, 300);
		}
		else {
			repeateOpponentTurn = false;
			setTimeout(() => {
				this.striker.setPosition(784, 313).setAlpha(1);
				this.slider.setPosition(784, 109);
				this.slider.setInteractive();
				this.striker.setInteractive();
				this.findOverlappingCoins();
				this.userTurnAniamtion(this.player_2Coin);
				this.physics.pause();
			}, 300);
		}
		nStretchDistance = 0;
	}

}