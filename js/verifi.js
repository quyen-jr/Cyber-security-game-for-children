var randomizedQuestionsVerification = [
    {
        question: "What is the purpose of verifying information?",
        answers: ["A  To ensure accuracy and reliability", "B  To spread misinformation", "C  To make information more confusing", "D  To limit access to information"],
        correctIndex: 0
    },
    {
        question: "Why is it important to verify the source of information?",
        answers: ["A  To prevent the spread of false information", "B  To increase internet traffic", "C  To make information harder to find", "D  It is not important"],
        correctIndex: 0
    },
    {
        question: "What are some methods for verifying information?",
        answers: ["A  Checking multiple reliable sources", "B  Believing everything you read", "C  Sharing without fact-checking", "D  Ignoring conflicting information"],
        correctIndex: 0
    },
    {
        question: "How can bias affect the verification process?",
        answers: ["A  It can lead to overlooking conflicting information", "B  It improves accuracy", "C  It speeds up the process", "D  It has no effect"],
        correctIndex: 0
    },
    {
        question: "What role does critical thinking play in information verification?",
        answers: ["A  It helps evaluate the credibility of sources", "B  It makes information more confusing", "C  It slows down the verification process", "D  It is not necessary"],
        correctIndex: 0
    },
    {
        question: "Why is it important to verify information before sharing it?",
        answers: ["A  To prevent the spread of misinformation", "B  To increase social media followers", "C  To make information less accessible", "D  It is not important"],
        correctIndex: 0
    },
    {
        question: "What are the consequences of spreading unverified information?",
        answers: ["A  It can damage credibility and trust", "B  It improves online reputation", "C  It leads to faster dissemination of information", "D  There are no consequences"],
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
var verifyQuestions = []


class Verify extends Phaser.Scene {
    constructor() {
        super("verify")
        verifyQuestions = randomizeQuestions(randomizedQuestionsVerification);
    }
    preload() {
      //  console.log(config.height)
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

        this.load.tilemapTiledJSON("map3", "assets/verify/verify.json")

        this.load.atlas("player", "assets/social/player.png", "assets/social/player.json")
        this.load.atlas("enemy", "assets/social/enemy.png", "assets/social/enemy.json")
        this.load.atlas("boom", "assets/verify/boom.png", "assets/verify/boom.json")
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
            frameRate: 25
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
        this.anims.create({
            key: "explouse_anims",
            frames: this.anims.generateFrameNames("boom", {
                prefix: "boom", start: 1, end: 9, zeroPad: 3,
            }),
            repeat: 0,
            frameRate: 17,
        })
        this.anims.create({
            key: "boom_anims",
            frames: this.anims.generateFrameNames("boom", {
                prefix: "boomon", start: 1, end: 9, zeroPad: 3,
            }),
            repeat: -1,
            frameRate: 20
        })
    }


    // addHome() {
    //     this.home = this.add.text(90 / 100 * config.width, 5 / 100 * config.height, "HOME", { fontSize: '30px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(8).setInteractive();
    //     // this.home.visible = false
    //     this.home.on('pointerover', () => {
    //         this.home.setColor('#00ff00');
    //     });
    //     this.home.on('pointerout', () => {
    //         this.home.setColor('white');
    //     });
    //     this.home.on('pointerdown', () => {
    //         this.DupMusic.play()
    //         this.home.setColor('red');
    //         this.scene.start("mainMenu")
    //     });
    //     this.home.on('pointerup', () => {
    //         this.home.setColor('white');
    //     });
    // }
    addAudio() {
        this.jumpMusic = this.sound.add('jump').setVolume(5);
        this.runMusic = this.sound.add('run').setVolume(4);
        this.deadMusic = this.sound.add('dead').setVolume(4);
        this.btnMusic = this.sound.add('au3').setVolume(6);
        this.DupMusic = this.sound.add('au2').setVolume(6);
        this.attackMusic = this.sound.add('attackAudio').setVolume(5);
        this.explosionMusic = this.sound.add('explosion').setVolume(5);
    }
    addAvatarAndFrame(){
        if(!localStorage.getItem('avatar'))
        localStorage.setItem('avatar', "CasualAvatar_00");
        var avatarequip=localStorage.getItem('avatar')
        this.avatarEquiped = this.add.sprite(2.35 / 100 * config.width, 3.62 / 100 * config.height,'avatars',avatarequip).setScale(0.16555).setOrigin(0,0).setInteractive()
        this.frame=this.add.rectangle(2.1 / 100 * config.width, 3.2 / 100 * config.height,50,50,0xff0000).setOrigin(0,0).setAlpha(1)
        this.frame.setDisplaySize(this.avatarEquiped.width*0.16555+0.5 / 100 * config.width,this.avatarEquiped.height*0.16555+ 0.8 / 100 * config.height)
        this.avatarEquiped.destroy()
        this.avatarEquiped = this.add.sprite(2.35 / 100 * config.width, 3.62 / 100 * config.height,'avatars',avatarequip).setScale(0.16555).setOrigin(0,0).setInteractive()
    }
    create() {
        this.addPlayerAnimate()
        this.addAudio()
        this.boom = 0
        this.totalScore = 0
        this.add.image(25 / 100 * config.width, 0, 'bg').setOrigin(0, 0).setDisplaySize(50/100*config.width, config.height)
        // this.add.rectangle(0,0,25 / 100 * config.width,config.height,1).setOrigin(0,0).setDepth(6)
        // this.add.rectangle(77.5 / 100 * config.width,0,25 / 100 * config.width,config.height,1).setOrigin(0,0).setDepth(6)
        const map = this.make.tilemap({ key: "map3", tileWidth: 16, tileHeight: 16 })
        const tileset = map.addTilesetImage("tiles", "tiles")
        this.layerFront = map.createLayer("Tile Layer 1", tileset, 25 / 100 * config.width,80/100*config.height)
        var layerWidth = this.layerFront.width;
        this.layerFront.displayWidth=50/100*config.width
        //console.log(this.layerFront.displayWidth=200)
        var layerHeight= this.layerFront.height
        this.playerState = {
            attack: "attack_anims",
            run: "run_anims",
            idle: "idle_anims",
            hurt: "hurt_anims",
            dead: "dead_anims",
            jump: "jump_anims",
            fall: "fall_anims"
        }
        this.currentIndex = 0;
        // this.addEnemy()
        this.player = new ObjectGameVerify(this, 55 / 100 * config.width, config.height  - 80/100*config.height, "player", this.playerState)
        this.physics.world.enable(this.player.body);
        this.physics.world.setBounds(25 / 100 * config.width, -40/layerHeight, 50/100*config.width,config.height+500);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.flipX = true
        this.canAskNewQues = true
        this.win = false
        this.lose = false;
        this.table = false
        this.addCollision()
        // this.createBoom()
        //this.addQuestion()
        this.canPlay = false
        this.rightAnswers = false
        this.max = 0;
        this.isTurnBoom = true
        this.addAvatarAndFrame()
        this.addMenuInstruction()
        this.addDark()

    }
    addCollision() {
        this.physics.add.collider(this.player.body, this.layerFront, (player,layer) => { this.player.isgrounded = true; })
        this.layerFront.setCollisionBetween(1, 40)
        //this.layerFront.setCollisionByExclusion([0]);
    }
    addQuestion() {
        this.canAskNewQues = false
        this.ques = null
        this.ques = new QuestionVerify(this)
        this.ques.currentQuestionIndex=this.currentIndex
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
        // if (this.darkness2)
        //     this.darkness2.destroy()
        this.restart = this.add.text(38 / 100 * config.width, 65 / 100 * config.height, "RESTART", { fontSize: '30px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5).setInteractive();
        this.restart.visible = false
        this.restart.on('pointerover', () => {
            this.restart.setColor('#00ff00');
        });
        this.restart.on('pointerout', () => {
            this.restart.setColor('white');
        });
        this.restart.on('pointerdown', () => {
            this.DupMusic.play()
            this.restart.setColor('red');
            verifyQuestions = randomizeQuestions(randomizedQuestionsVerification);
            this.scene.restart();
        });
        this.restart.on('pointerup', () => {
            this.restart.setColor('white');
        });
        // this.home = this.add.text(51.5 / 100 * config.width, 65 / 100 * config.height, "GO HOME", { fontSize: '30px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5).setInteractive();
        // this.home.visible = false
        // this.home.on('pointerover', () => {
        //     this.home.setColor('#00ff00');
        // });
        // this.home.on('pointerout', () => {
        //     this.home.setColor('white');
        // });
        // this.home.on('pointerdown', () => {
        //     this.DupMusic.play()
        //     this.home.setColor('red');
        //     this.scene.start("mainMenu")
        // });
        // this.home.on('pointerup', () => {
        //     this.home.setColor('white');
        // });
        // this.darkness2 = this.add.image(0, 0, "black").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        // this.darkness2.alpha = 0
        // this.tweens.add({
        //     targets: this.darkness2,
        //     alpha: 0.9,
        //     duration: 2500,
        //     ease: 'Linear',
        //     onComplete: () => {
        //         this.add.text(40.5 / 100 * config.width, 100, _Text, { fontSize: '55px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5);
        //         this.restart.visible = true
        //         this.home.visible = true
        //     }
        // })


    }
    addMenuInstruction() {
        verifyQuestions = randomizeQuestions(randomizedQuestionsVerification);
        this.darkness2 = this.add.image(0, 0, "black").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.darkness2.alpha = 0
        this.tweens.add({
            targets: this.darkness2,
            alpha: 0.9,
            duration: 2000,
            ease: 'Linear',
            onComplete: () => {
                var fontSize="35px"
                this.textInstruction = this.add.text(27 / 100 * config.width, 100, "Move the character with the arrow buttons to avoid boom", { fontSize: fontSize, fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5);
                setTimeout(() => {
                    //this.addHome()
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
                                this.displayTotalScore()
                            }, 2000);
                        }
                    })
                }, 1500);



            }
        })
    }
    displayTotalScore(_Text) {
        this.totalScoreText = this.add.text(1 / 100 * config.width, 18 / 100 * config.height, "SCORE :" + _Text, { fontSize: '45px', fontFamily: 'Times New Roman', fill: 'red' }).setDepth(7);
    }
    createBoom() {
        var width = (Math.floor(Math.random() * (70 - 25 + 1)) + 25) / 100 * config.width
        var height = -(Math.floor(Math.random() * (200)+50))
        var currentBoom = this.physics.add.sprite(width, height, 'boom')
        currentBoom.play("boom_anims").setOrigin(0, 0)
        var delta = Math.random()
        if (delta > 0.5) delta = 1
        else delta = -1
        currentBoom.body.setCollideWorldBounds(true);
        currentBoom.setVelocity(delta * (Math.random() * (100 - 90 + 1) + 90), null)
        var hasFall = false
        this.physics.add.overlap(currentBoom, this.layerFront, (element,layer) => {
            hasFall = true
            element.setVelocity(0, 0)
            element.setSize(100, 100).setOffset(0, -30)
            if (element.anims.currentAnim.key != "explouse_anims")
                element.play("explouse_anims")
            currentBoom.on('animationcomplete', (animation, frame) => {
                if (animation.key === 'explouse_anims') {
                    currentBoom.destroy()
                }
            }, this);
        })
        this.physics.add.overlap(currentBoom, this.player.body, (element) => {
            // if(!this.explosionMusic.isPlaying)
            // this.explosionMusic.play()
            element.setVelocity(0, 0)
            element.setSize(100, 100).setOffset(0, -30)
            if (!hasFall)
                this.lose = true
            if (element.anims.currentAnim.key != "explouse_anims")
                element.play("explouse_anims")
            currentBoom.on('animationcomplete', (animation, frame) => {
                if (animation.key === 'explouse_anims') {
                    currentBoom.destroy()

                }
            }, this);
        })

        currentBoom.setSize(30, 30).setOffset(35, 55)
        // currentBoom.body.setBounce(0.2);


    }
    addBoomRandom() {
        if (!this.isTurnBoom || this.max == 2) return
        this.createBoom();
        this.max++

        if (this.max == 2) {
            setTimeout(() => {
                this.max = 0
                this.totalScore += 3
            }, 400);
        }
    }
    update() {
        if (!this.canPlay) return

        if (this.lose && !this.table) {
            this.totalScoreText.visible = false
            this.player.body.setVelocity(0, 0)
            this.player.dead = true
            this.deadMusic.play()
            this.player.body.play(this.playerState.dead)
            this.addQuestion()
            this.table = true
        }
        if (this.ques && this.ques.displayScore == true) {

            this.ques.displayScoreInTable()
        }
        if (this.lose) return
        this.totalScoreText.setText("SCORE : " + this.totalScore)

        this.addBoomRandom()
        this.player.update()

    }
}
class StateMachine {

}
class ObjectGameVerify {
    constructor(_scene, _x, _y, _type, _state) {
        this.scene = _scene
        this.x = _x;
        this.y = _y;
        this.type = _type;
        this.state = _state;
        this.body = null;
        this.run = false
        this.dead = false
        this.idle = true
        this.canJump = false
        this.jump = false
        this.fall = false
        this.canMove = false
        this.createObject()
        this.addControl()

    }
    createObject() {
        this.body = this.scene.physics.add.sprite(this.x, this.y, this.type).setScale(0.2).play(this.state.idle)
        this.body.setSize(200, 630);

        // this.body.body.setBounds();
    }
    addControl() {
        this.scene.input.keyboard.on('keydown', (event) => {
            if (this.dead) return
            if (event.key === 'ArrowRight') {
                this.move(370, 0)
            } else if (event.key === 'ArrowLeft') {
                this.move(-370, 0)
            }
        });
        this.scene.input.keyboard.on('keyup', (event) => {
            if (this.dead) return
            this.move(0, 0)
            if (!this.idle) {
                this.idle = true
                this.run = false
                this.body.play(this.state.idle)
            }
        });
    }
    move(_velocityX, _velocityY) {
        if (this.dead) return
        if (_velocityX != 0 && !this.scene.runMusic.isPlaying) this.scene.runMusic.play()
        if (!this.run) {
            this.run = true
            this.idle = false
            this.body.play(this.state.run)
        }
        if (_velocityX > 0) this.body.flipX = true
        else if (_velocityX < 0) this.body.flipX = false
        // if(this.body.x<30/100*config.width&&_velocityX<0||this.body.x>73/100*config.width&&_velocityX>0)
        //    this.body.setVelocity(0,0)
        // else
        this.body.setVelocity(_velocityX, _velocityY)
    }
    dead() {

    }
    jump() {

    }
    update() {
    }
}

class QuestionVerify {
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
            this.scene.DupMusic.play()
            this.home.setColor('red');
            this.scene.scene.start("mainMenu")
        });
        this.home.on('pointerup', () => {
            this.home.setColor('white');
        });
    }
    displayQuestion(index) {
        var currentQuestion = verifyQuestions[index];
        this.questionText.setText(currentQuestion.question);

        for (var i = 0; i < 4; i++) {
            this.answerTexts[i].setText(currentQuestion.answers[i]);
        }
        this.addButtonSupport()
    }

    checkAnswer(index) {
        if (this.hasCheckAnswer) return
        if (!this.hasCheckAnswer)
            this.hasCheckAnswer = true
        var currentQuestion = verifyQuestions[this.currentQuestionIndex];
        if (index === currentQuestion.correctIndex) {
            this.maxScore = this.scene.totalScore;
            scoreCoin += this.maxScore
            localStorage.setItem('money', scoreCoin);
            this.displayCorrectTable("CORRECT !  ")
            this.answerTexts.forEach(element => {
                element.destroy()
            });
            this.questionText.destroy()
            // Thêm các hoạt động khi đáp án đúng ở đây
        } else {
            this.maxScore =  this.scene.totalScore
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
        if(this.supportButton)
        this.supportButton.visible=false
        // if(!this.displayScore) return
        this.scoreText.visible = true
        this.scene.time.delayedCall(200, () => {
            //this.scene.DupMusic.play()
            this.maxScore = this.scene.totalScore;
            if (this.scoreInital < this.maxScore)
                this.scoreInital += 1
            else {
                this.displayScore = false
                // scoreCoin += this.maxScore
                // this.restart.visible = true
                this.scene.restart.visible = true
                this.home.visible = true
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
        var currentQuestion = verifyQuestions[this.currentQuestionIndex];
        var index = 0
        var option1 = 0
        console.log(verifyQuestions[this.currentQuestionIndex])
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