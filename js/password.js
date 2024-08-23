var randomizedQuestions2 = [
    {
        question: "What is the importance of having a strong password?",
        answers: ["A  To protect personal information", "B  To make login process faster", "C  To increase internet speed", "D  To access restricted content"],
        correctIndex: 0
    },
    {
        question: "Which of the following is considered a strong password?",
        answers: ["A  'password'", "B  '123456'", "C  'P@ssw0rd!'", "D  'abc123'"],
        correctIndex: 2
    },
    {
        question: "What are some characteristics of a strong password?",
        answers: ["A  Long and complex", "B  Short and simple", "C  Easy to guess", "D  Contains only numbers"],
        correctIndex: 0
    },
    {
        question: "Why is it important to use different passwords for different accounts?",
        answers: ["A  To avoid security breaches", "B  To make it easier to remember", "C  To save time during login", "D  It is not important"],
        correctIndex: 0
    },
    {
        question: "How often should you change your password?",
        answers: ["A  Every month", "B  Every year", "C  Every time you use it", "D  Regularly, every few months"],
        correctIndex: 3
    },
    {
        question: "What is the purpose of two-factor authentication?",
        answers: ["A  To provide an additional layer of security", "B  To make login process slower", "C  To access social media", "D  To reset password"],
        correctIndex: 0
    },
    {
        question: "What is the most secure way to store passwords?",
        answers: ["A  Using a password manager", "B  Writing them down on paper", "C  Saving them in browser", "D  Telling them to friends"],
        correctIndex: 0
    }
    // add more questions
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeQuestions(questionsArray) {
    const shuffledQuestions = [...questionsArray];

    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i);
        const temp = shuffledQuestions[i];
        shuffledQuestions[i] = shuffledQuestions[j];
        shuffledQuestions[j] = temp;
    }

    return shuffledQuestions;
}
var passwordQuestion = []


console.log(1)

class Password extends Phaser.Scene {
    constructor() {
        super("password")
        passwordQuestion = randomizeQuestions(randomizedQuestions2);
    }
    preload() {
        // audio
        this.load.audio('jump', './audio/jump.mp3');
        this.load.audio('dead', './audio/dead.mp3');
        this.load.audio('run', './audio/run.wav');
        this.load.audio('attackAudio', './audio/slash-21834.mp3');
        this.load.audio('explosion', './audio/sfx-explosion.wav');
        this.load.audio('au1', './audio/Abstract2.mp3');
        this.load.audio('au2', './audio/African2.mp3');
        this.load.audio('au3', './audio/Coffee1.mp3');
        this.load.image("tiles", "assets/social/Platform-Tiles64.png")
        this.load.tilemapTiledJSON("map", "assets/password/passwordTile.json")
        this.load.atlas("player", "assets/social/player.png", "assets/social/player.json")
        this.load.atlas("enemy", "assets/social/enemy.png", "assets/social/enemy.json")
        this.load.atlas("heart", "assets/social/spritesheet.png", "assets/social/spritesheet.json")
        this.load.spritesheet('explosion', 'assets/social/Burst of ice.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.image('black', './assets/black.png')
        this.load.image("bg", "assets/social/bg.png")
    }
    addExplodeEffect() {
        this.effectHasplay = false
        var animationConfig = {
            key: 'explouse_anim',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 6, }),
            frameRate: 14,
            repeat: 0
        };
        this.anims.create(animationConfig);

        this.explouseEffect = this.add.sprite(400, 300, 'explosion').setDepth(5).setScale(2)
        this.explouseEffect.visible = false;
    }
    addPlayerAnimate() {
        this.anims.create({
            key: "idle_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Idle_", end: 11, zeroPad: 3,
            }),
            repeat: -1,
            frameRate: 20
        })
        this.anims.create({
            key: "run_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Run_", end: 9, zeroPad: 3,
            }),
            repeat: -1,
            frameRate: 20
        })
        this.anims.create({
            key: "jump_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Run_00"
            }),
            repeat: 0,
            frameRate: 20
        })
        this.anims.create({
            key: "fall_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Run_00",
                zeroPad: 0,
                start: 4, // frame start index
                end: 4,   // frame end index (same as start for single frame)
            }),
            repeat: 0,
            frameRate: 20
        });
        this.anims.create({
            key: "attack_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Slash_", end: 7, zeroPad: 3,
            }),
            repeat: 0,
            frameRate: 20
        })
        this.anims.create({
            key: "hurt_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Hurt_", end: 5, zeroPad: 3,
            }),
            repeat: 0,
            frameRate: 18
        })
        this.anims.create({
            key: "dead_anims",
            frames: this.anims.generateFrameNames("player", {
                prefix: "FR_Adventurer_Dead_", end: 8, zeroPad: 3,
            }),
            repeat: 0,
            frameRate: 20
        })
    }
    addEnemyAnimate() {
        this.anims.create({
            key: "enemy_idle_anims",
            frames: this.anims.generateFrameNames("enemy", {
                prefix: "FR_Slime4_Idle_", end: 11, zeroPad: 3,
            }),
            repeat: -1,
            frameRate: 20
        })
        this.anims.create({
            key: "enemy_run_anims",
            frames: this.anims.generateFrameNames("enemy", {
                prefix: "FR_Slime4_Move_", end: 9, zeroPad: 3,
            }),
            repeat: -1,
            frameRate: 20
        })
        this.anims.create({
            key: "enemy_attack_anims",
            frames: this.anims.generateFrameNames("enemy", {
                prefix: "FR_Slime4_Attack_", end: 7, zeroPad: 3,
            }),
            repeat: 1,
            frameRate: 20
        })
        this.anims.create({
            key: "enemy_hurt_anims",
            frames: this.anims.generateFrameNames("enemy", {
                prefix: "FR_Slime4_Hurt_", end: 5, zeroPad: 3,
            }),
            repeat: 0,
            frameRate: 18
        })
        this.anims.create({
            key: "enemy_dead_anims",
            frames: this.anims.generateFrameNames("enemy", {
                prefix: "FR_Slime4_Dead_", end: 5, zeroPad: 3,
            }),
            repeat: 0,
            frameRate: 20
        })
    }
    addHeart() {
        this.heart = []
        this.heart[0] = this.add.image(5 / 100 * config.width, 5 / 100 * config.height, "heart", "heart")
        this.heart[1] = this.add.image(9 / 100 * config.width, 5 / 100 * config.height, "heart", "heart")
        // this.heart[2] = this.add.image(13 / 100 * config.width, 5 / 100 * config.height, "heart", "heart")
    }
    addHome() {
        this.home = this.add.text(90 / 100 * config.width, 5 / 100 * config.height, "HOME", { fontSize: '30px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(8).setInteractive();
        this.home.on('pointerover', () => {
            this.home.setColor('#00ff00');
        });
        this.home.on('pointerout', () => {
            this.home.setColor('white');
        });
        this.home.on('pointerdown', () => {
            this.canPlayGameAu = true
            this.gameMusic.stop()
            this.DupMusic.play()
            this.home.setColor('red');
            this.scene.start("mainMenu")
        });
        this.home.on('pointerup', () => {
            this.home.setColor('white');
        });
    }
    addAudio() {
        this.jumpMusic = this.sound.add('jump').setVolume(5);
        this.runMusic = this.sound.add('run').setVolume(4);
        this.deadMusic = this.sound.add('dead').setVolume(4);
        this.btnMusic = this.sound.add('au3').setVolume(6);
        this.DupMusic = this.sound.add('au2').setVolume(6);
        this.attackMusic = this.sound.add('attackAudio').setVolume(5);
        this.explosionMusic = this.sound.add('explosion').setVolume(5);
    }
    addGameAudio() {
        this.canPlayGameAu = false
        this.gameMusic = this.sound.add('gameAu').setVolume(1);
    }
    create() {
        this.addPlayerAnimate()
        this.addExplodeEffect()
        this.addHeart()
        this.addAudio()
        this.addGameAudio()
        this.add.image(0, 0, 'bg').setOrigin(0, 0)
        const map = this.make.tilemap({ key: "map", tileWidth: 1, tileHeight: 1 })
        const tileset = map.addTilesetImage("map1", "tiles")
        this.layerFront = map.createLayer("front", tileset, 0, -250)

        this.layerJump = map.createLayer("jump", tileset, 0, -250)
        this.layerWin = map.createLayer("win", tileset, 0, -250)
        const layer = map.createLayer("behind", tileset, 0, -250)

        this.layerDanger = map.createLayer("dangerous", tileset, 0, -250)


        this.layerFront.displayWidth = config.width
        this.layerJump.displayWidth = config.width
        this.layerDanger.displayWidth = config.width
        this.layerWin.displayWidth = config.width
        layer.displayWidth = config.width

        this.playerState = {
            attack: "attack_anims",
            run: "run_anims",
            idle: "idle_anims",
            hurt: "hurt_anims",
            dead: "dead_anims",
            jump: "jump_anims",
            fall: "fall_anims"
        }
        this.enemyState = {
            attack: "enemy_attack_anims",
            run: "enemy_run_anims",
            idle: "enemy_idle_anims",
            hurt: "enemy_hurt_anims",
            dead: "enemy_dead_anims",
        }
        this.currentIndex = 0;
        this.player = new ObjectGamePassword(this, 100, 80, "player", this.playerState)
        this.canAttack = false;
        this.beAttacked = false
        this.player.body.flipX = true
        this.canAskNewQues = true
        this.win = false
        this.lose = false;
        this.table = false
        this.addCollision()
        this.canPlay = false
        this.rightAnswers = false
        this.addAvatarAndFrame()
        this.addMenuInstruction()
    }
    addCollision() {
        this.isdangerCollide = false
        this.physics.add.collider(this.player.body, this.layerFront, () => { this.player.isgrounded = true; })

        this.physics.add.collider(this.player.body, this.layerJump, () => { this.player.canMove = false; this.player.canJump = true })
        this.physics.add.collider(this.player.body, this.layerDanger, () => { this.isdangerCollide = true; })
        this.physics.add.collider(this.player.body, this.layerWin, () => {
            if (this.rightAnswers) this.win = true
        })
        this.layerFront.setCollisionBetween(1, 40)
        this.layerFront.setCollisionBetween(2, 40)
        this.layerFront.setCollisionBetween(3, 40)
        this.layerFront.setCollisionBetween(6, 40)
        this.layerFront.setCollisionBetween(7, 40)
        this.layerFront.setCollisionBetween(8, 40)
        this.layerFront.setCollisionBetween(9, 40)


        this.layerJump.setCollisionBetween(4, 40)
        this.layerJump.setCollisionBetween(1, 40)
        this.layerJump.setCollisionBetween(2, 40)
        this.layerJump.setCollisionBetween(3, 40)
        this.layerJump.setCollisionBetween(6, 40)

        this.layerDanger.setCollisionBetween(16, 30)

        this.layerWin.setCollisionBetween(7, 40)
    }
    addQuestion() {
        this.canAskNewQues = false
        if (this.currentIndex > 6) {
            this.lose = true
            return
        }
        this.ques = null
        this.ques = new QuestionPassword(this)
        this.ques.currentQuestionIndex = this.currentIndex
        this.darkness2 = this.add.image(0, 0, "black").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.darkness2.alpha = 0
        this.tweens.add({
            targets: this.darkness2,
            alpha: 0.9,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
                this.ques.createQuestions()
                this.currentIndex++
            }
        })
    }
    addDark(_Text) {
        if (this.darkness2)
            this.darkness2.destroy()
        this.restart = this.add.text(38 / 100 * config.width, 65 / 100 * config.height, "RESTART", { fontSize: '30px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5).setInteractive();
        this.restart.visible = false
        this.restart.on('pointerover', () => {
            this.restart.setColor('#00ff00');
        });
        this.restart.on('pointerout', () => {
            this.restart.setColor('white');
        });
        this.restart.on('pointerdown', () => {
            this.canPlayGameAu=true
            this.gameMusic.stop()
            this.DupMusic.play()
            this.restart.setColor('red');
            passwordQuestion = randomizeQuestions(randomizedQuestions2);
            this.scene.restart();
        });
        this.restart.on('pointerup', () => {
            this.restart.setColor('white');
        });
        this.home = this.add.text(51.5 / 100 * config.width, 65 / 100 * config.height, "GO HOME", { fontSize: '30px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5).setInteractive();
        this.home.visible = false
        this.home.on('pointerover', () => {
            this.home.setColor('#00ff00');
        });
        this.home.on('pointerout', () => {
            this.home.setColor('white');
        });
        this.home.on('pointerdown', () => {
            this.canPlayGameAu = true
            this.gameMusic.stop()
            this.DupMusic.play()
            this.home.setColor('red');
            this.scene.start("mainMenu")
        });
        this.home.on('pointerup', () => {
            this.home.setColor('white');
        });
        this.darkness2 = this.add.image(0, 0, "black").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.darkness2.alpha = 0
        this.tweens.add({
            targets: this.darkness2,
            alpha: 0.9,
            duration: 2500,
            ease: 'Linear',
            onComplete: () => {
                this.add.text(40.5 / 100 * config.width, 100, _Text, { fontSize: '55px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5);
                this.restart.visible = true
                this.home.visible = true
            }
        })


    }
    addAvatarAndFrame() {
        if (!localStorage.getItem('avatar'))
            localStorage.setItem('avatar', "CasualAvatar_00");
        var avatarequip = localStorage.getItem('avatar')
        this.avatarEquiped = this.add.sprite(2.35 / 100 * config.width, 3.62 / 100 * config.height, 'avatars', avatarequip).setScale(0.16555).setOrigin(0, 0).setInteractive()
        this.frame = this.add.rectangle(2.1 / 100 * config.width, 3.2 / 100 * config.height, 50, 50, 0xff0000).setOrigin(0, 0).setAlpha(1)
        this.frame.setDisplaySize(this.avatarEquiped.width * 0.16555 + 0.5 / 100 * config.width, this.avatarEquiped.height * 0.16555 + 0.8 / 100 * config.height)
        this.avatarEquiped.destroy()
        this.avatarEquiped = this.add.sprite(2.35 / 100 * config.width, 3.62 / 100 * config.height, 'avatars', avatarequip).setScale(0.16555).setOrigin(0, 0).setInteractive()
    }
    addMenuInstruction() {
        //   console.log(config.width)
        this.darkness2 = this.add.image(0, 0, "black").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.darkness2.alpha = 0
        this.tweens.add({
            targets: this.darkness2,
            alpha: 0.9,
            duration: 2000,
            ease: 'Linear',
            onComplete: () => {
                this.textInstruction = this.add.text(19 / 100 * config.width, 100, "Answer the questions to jump to the finish line", { fontSize: '55px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5);
                setTimeout(() => {
                    this.addHome()
                }, 2000);
                setTimeout(() => {
                    this.textInstruction.destroy()
                    this.tweens.add({
                        targets: this.darkness2,
                        alpha: 0,
                        duration: 2000,
                        ease: 'Linear',
                        onComplete: () => {
                            setTimeout(() => {
                                this.canPlay = true

                            }, 2000);
                        }
                    })
                }, 1200);



            }
        })
    }
    update() {

        if (!this.canPlay) return

        if (!this.gameMusic.isPlaying && !this.canPlayGameAu)
            this.gameMusic.play()
        if (this.lose && !this.table) {
            this.home.visible = false
            this.addDark("YOU LOSS")
            this.table = true
        }
        if (this.lose) return
        if (this.win && !this.table) {

            this.home.visible = false
            this.DupMusic.play()
            this.player.body.play(this.player.state.idle)
            this.addDark("YOU WIN!")
            this.table = true
        }
        if (this.win) {
            return;
        }
        if (this.canAskNewQues) {
            this.addQuestion()
        }
        if (this.ques && this.ques.displayScore == true) {

            this.ques.displayScoreInTable()
        }
        this.player.update()

    }
}
class ObjectGamePassword {
    constructor(_scene, _x, _y, _type, _state) {
        this.scene = _scene
        this.x = _x;
        this.y = _y;
        this.type = _type;
        this.state = _state;
        this.body = null;
        this.initalX = _x;
        this.initalY = _y;
        this.run = false
        this.dead = false
        this.idle = true
        this.canJump = false
        this.jump = false
        this.fall = false
        this.canMove = false
        this.isgrounded = true
        this.createObject()
    }
    createObject() {
        this.body = this.scene.physics.add.sprite(this.x, this.y, this.type).setScale(0.2).play(this.state.idle)
        this.body.setSize(200, 630);
    }

    move(_velocityX, _velocityY) {
        this.body.setVelocity(_velocityX, _velocityY)
    }
    dead() {

    }
    jump() {

    }
    update() {
        if (this.body.body.velocity.y < 0) this.isgrounded = false
        if (this.run && !this.scene.runMusic.isPlaying) {
            this.scene.runMusic.play()
        } else if (!this.run) this.scene.runMusic.stop()

        if (this.canMove) {
            if (!this.run) {
                this.run = true
                this.body.play(this.state.run)
                this.move(300, this.body.body.velocity.y)
            }
        }
        if (this.canJump) {
            this.canJump = false
            this.run = false
            this.idle = false
            var jumpForce = -400
            if (this.scene.rightAnswers)
                jumpForce = -600
            this.move(this.body.body.velocity.x, jumpForce)
            if (!this.jump) {
                this.scene.jumpMusic.play()
                this.body.play(this.state.jump)
                this.jump = true
            }
        }
        if (this.body.body.velocity.y > 0 && !this.idle) {
            this.jump = false
            if (!this.fall) {
                this.fall = true
                this.body.play(this.state.fall)
            }
        }

        if (!this.idle && this.fall && this.body.body.velocity.y == 0 && this.scene.rightAnswers) {
            this.idle = true;
            this.jump = false
            this.fall = false
            this.body.play(this.state.idle)
            this.move(0, 0)
            this.scene.canAskNewQues = true
        } else {
            if (!this.dead && this.body.body.velocity.y == 0 && this.fall) {
                this.scene.deadMusic.play()
                this.body.play(this.state.dead)
                this.dead = true
                this.scene.lose = true
            }
        }
    }
}

class QuestionPassword {
    constructor(_scene) {
        this.scene = _scene
        this.answerTexts = [];
        this.scoreText = null
        this.displayScore = false
        this.maxScore = 0;
        this.currentQuestionIndex = null;
        this.scoreInital = 0
        this.questionText;
        this.hasCheckAnswer = false
        this.checkTable = null
        this.supportButton = null

    }
    createQuestions() {
        this.scoreText = this.scene.add.text(45 / 100 * config.width, 40 / 100 * config.height, "", { fontSize: '55px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5);
        this.scoreText.visible = false
        this.questionText = this.scene.add.text(100, 100, '', { fontSize: '35px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5);
        // Hiển thị các ô lựa chọn
        for (var i = 0; i < 4; i++) {
            this.answerTexts.push(this.scene.add.text(100, 200 + i * 50, '', { fontSize: '20px', fontFamily: 'Times New Roman', fill: 'White' }).setDepth(5));
            this.answerTexts[i].setInteractive();
        }
        this.answerTexts[0].on('pointerover', () => {
            this.answerTexts[0].setColor('#00ff00');
        });
        this.answerTexts[0].on('pointerout', () => {
            this.answerTexts[0].setColor('white');
        });
        this.answerTexts[0].on('pointerdown', () => {
            this.answerTexts[0].setColor('red');
            this.scene.DupMusic.play()
            this.checkAnswer(0);
        });
        this.answerTexts[0].on('pointerup', () => {
            this.answerTexts[0].setColor('white');
        });
        //1
        this.answerTexts[1].on('pointerover', () => {
            this.answerTexts[1].setColor('#00ff00');
        });
        this.answerTexts[1].on('pointerout', () => {
            this.answerTexts[1].setColor('white');
        });
        this.answerTexts[1].on('pointerdown', () => {
            this.answerTexts[1].setColor('red');
            this.scene.DupMusic.play()
            this.checkAnswer(1);
        });
        this.answerTexts[1].on('pointerup', () => {
            this.answerTexts[1].setColor('white');
        });
        //
        this.answerTexts[2].on('pointerover', () => {
            this.answerTexts[2].setColor('#00ff00');
        });
        this.answerTexts[2].on('pointerout', () => {
            this.answerTexts[2].setColor('white');
        });
        this.answerTexts[2].on('pointerdown', () => {
            this.answerTexts[2].setColor('red');
            this.scene.DupMusic.play()
            this.checkAnswer(2);
        });
        this.answerTexts[2].on('pointerup', () => {
            this.answerTexts[2].setColor('white');
        });
        //
        this.answerTexts[3].on('pointerover', () => {
            this.answerTexts[3].setColor('#00ff00');
        });
        this.answerTexts[3].on('pointerout', () => {
            this.answerTexts[3].setColor('white');
        });
        this.answerTexts[3].on('pointerdown', () => {
            this.answerTexts[3].setColor('red');
            this.scene.DupMusic.play()
            this.checkAnswer(3);
        });
        this.answerTexts[3].on('pointerup', () => {
            this.answerTexts[3].setColor('white');
        });
        this.displayQuestion(this.currentQuestionIndex);
        // restart 
        this.restart = this.scene.add.text(46 / 100 * config.width, 65 / 100 * config.height, "NEXT", { fontSize: '30px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5).setInteractive();
        this.restart.visible = false
        this.restart.on('pointerover', () => {
            this.restart.setColor('#00ff00');
        });
        this.restart.on('pointerout', () => {
            this.restart.setColor('white');
        });
        this.restart.on('pointerdown', () => {
            // this.scene.canPlayGameAu=true
            // this.scene.gameMusic.stop()
            this.scene.DupMusic.play()
            this.restart.setColor('red');
            // this.scene.scene.restart();
            this.scene.tweens.add({
                targets: this.scene.darkness2,
                alpha: 0,
                duration: 1000,
                ease: 'Linear',
                onComplete: () => {
                    this.scene.player.canMove = true
                    this.scene.rightAnswers = true
                    if (this.maxScore == 100)
                        this.scene.rightAnswers = false

                }
            })
            this.scene.darkness2 = null
            this.answerTexts.forEach(element => {
                element.destroy()
            });
            this.questionText.destroy()
            this.checkTable.destroy()
            this.scoreText.destroy()
            this.restart.destroy()
            this.scene.ques = null
        });
        this.restart.on('pointerup', () => {
            this.restart.setColor('white');
        });
        this.home = this.scene.add.text(53 / 100 * config.width, 65 / 100 * config.height, "HOME", { fontSize: '30px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5).setInteractive();
        this.home.visible = false
        this.home.on('pointerover', () => {
            this.home.setColor('#00ff00');
        });
        this.home.on('pointerout', () => {
            this.home.setColor('white');
        });
        this.home.on('pointerdown', () => {
            this.scene.canPlayGameAu=true
            this.scene.gameMusic.stop()
            this.scene.DupMusic.play()
            this.home.setColor('red');
            this.scene.scene.start("mainMenu")
        });
        this.home.on('pointerup', () => {
            this.home.setColor('white');
        });
    }
    displayQuestion(index) {
        var currentQuestion = passwordQuestion[index];
        this.questionText.setText(currentQuestion.question);

        for (var i = 0; i < 4; i++) {
            this.answerTexts[i].setText(currentQuestion.answers[i]);
        }
        this.addButtonSupport()
    }

    checkAnswer(index) {
        if (this.supportButton)
            this.supportButton.destroy()
        if (this.hasCheckAnswer) return
        if (!this.hasCheckAnswer)
            this.hasCheckAnswer = true
        var currentQuestion = passwordQuestion[this.currentQuestionIndex];
        if (index === currentQuestion.correctIndex) {
            this.maxScore = 200;
            scoreCoin += this.maxScore
            localStorage.setItem('money', scoreCoin);
            this.displayCorrectTable("CORRECT !  ")
            this.answerTexts.forEach(element => {
                element.destroy()
            });
            this.questionText.destroy()
            // Thêm các hoạt động khi đáp án đúng ở đây
        } else {
            this.maxScore = 100
            scoreCoin += this.maxScore
            localStorage.setItem('money', scoreCoin);
            this.displayCorrectTable("UP WRONG !")
            this.answerTexts.forEach(element => {
                element.destroy()
            });
            this.questionText.destroy()
            // Thêm các hoạt động khi đáp án sai ở đây
        }
    }
    displayCorrectTable(_Text) {
        this.displayScore = true
        this.checkTable = this.scene.add.text(40 / 100 * config.width, 100, _Text, { fontSize: '55px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5);
    }
    displayScoreInTable() {
        // if(!this.displayScore) return
        this.scoreText.visible = true
        this.scene.time.delayedCall(200, () => {
            //this.scene.DupMusic.play()
            if (this.scoreInital < this.maxScore)
                this.scoreInital += 1
            else {
                this.displayScore = false
                // scoreCoin += this.maxScore
                this.restart.visible = true
                //this.home.visible = true
                //this.scoreInital = 0
            }
            this.scoreText.setText("+" + this.scoreInital)
        })
    }
    addButtonSupport() {
        if (scoreCoin >= 1000) {
            this.supportButton = this.scene.add.text(100, 200 + 4 * 50, 'Delete 2 option with 1000 coin', { fontSize: '20px', fontFamily: 'Times New Roman', fill: 'White' }).setDepth(5).setInteractive();
            this.supportButton.on('pointerover', () => {
                this.supportButton.setColor('#00ff00');
            });
            this.supportButton.on('pointerout', () => {
                this.supportButton.setColor('white');
            });
            this.supportButton.on('pointerdown', () => {
                scoreCoin -= 1000
                localStorage.setItem('money', scoreCoin)
                this.supportButton.setColor('red');
                this.scene.DupMusic.play()

                this.removeTwoAnswers()
            });
        }
    }
    removeTwoAnswers() {
        if (this.supportButton)
            this.supportButton.destroy()
        var currentQuestion = passwordQuestion[this.currentQuestionIndex];
        var index = 0
        var option1 = 0
        console.log(passwordQuestion[this.currentQuestionIndex])
        while (index != 2) {
            const randomNumber = Math.floor(Math.random() * 4);
            if (randomNumber != currentQuestion.correctIndex && randomNumber != option1) {
                this.answerTexts[randomNumber].destroy()
                option1 = randomNumber
                index++
            }

        }
    }
}