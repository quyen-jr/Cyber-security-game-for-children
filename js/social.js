var randomizedQuestions = [
    {
        question: "What is the purpose of social media platforms?",
        answers: ["A  To connect with friends and family", "B  To share content and information", "C  To promote businesses and brands", "D  To play online games"],
        correctIndex: 0
    },
    {
        question: "Which of the following is a popular social media platform?",
        answers: ["A  Facebook", "B  Amazon", "C  Netflix", "D  Google+"],
        correctIndex: 0
    },
    {
        question: "What are the potential risks of using social media?",
        answers: ["A  Privacy concerns", "B  Addiction to social media", "C  Exposure to cyberbullying", "D  Financial loss due to scams"],
        correctIndex: 0
    },
    {
        question: "How can you manage your time effectively on social media?",
        answers: ["A  Set specific time limits for usage", "B  Prioritize offline activities", "C  Use productivity tools to track usage", "D  Turn off notifications"],
        correctIndex: 0
    },
    {
        question: "What should you consider before sharing personal information on social media?",
        answers: ["A  Who will have access to the information", "B  The potential consequences of sharing", "C  Privacy settings of the platform", "D  The popularity of the post"],
        correctIndex: 0
    },
    {
        question: "How can you protect your privacy on social media?",
        answers: ["A  Review and adjust privacy settings regularly", "B  Avoid sharing sensitive information", "C  Be cautious when accepting friend requests from strangers", "D  Post regularly to keep your profile active"],
        correctIndex: 0
    },
    {
        question: "What is the term used to describe the phenomenon of comparing one's own life to others' highlight reels?",
        answers: ["A  Social media envy", "B  FOMO (Fear of Missing Out)", "C  Social media depression", "D  Comparison syndrome"],
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
var socialMediaQuestions = []


class Social extends Phaser.Scene {
    constructor() {
        super("social")
        socialMediaQuestions = randomizeQuestions(randomizedQuestions);
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
        this.load.tilemapTiledJSON("map2", "assets/social/map1.json")
        this.load.atlas("player", "assets/social/player.png", "assets/social/player.json")
        this.load.atlas("enemy", "assets/social/enemy.png", "assets/social/enemy.json")
        this.load.atlas("heart", "assets/social/spritesheet.png", "assets/social/spritesheet.json")
        this.load.image("bg", "assets/social/bg.png")

        this.load.spritesheet('explosion', 'assets/social/Burst of ice.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.image('black', './assets/black.png')
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
        this.heart[0] = this.add.image(10 / 100 * config.width, 9 / 100 * config.height, "heart", "heart")
        this.heart[1] = this.add.image(14 / 100 * config.width, 9 / 100 * config.height, "heart", "heart")
    }
    addAudio() {
        this.jumpMusic = this.sound.add('jump').setVolume(5);
        this.runMusic = this.sound.add('run').setVolume(20);
        this.deadMusic = this.sound.add('dead').setVolume(4);
        this.btnMusic = this.sound.add('au3').setVolume(6);
        this.DupMusic = this.sound.add('au2').setVolume(6);
        this.attackMusic = this.sound.add('attackAudio').setVolume(5);
        this.explosionMusic = this.sound.add('explosion').setVolume(5);
    }
    addGameAudio(){
        this.canPlayGameAu=false
        this.gameMusic = this.sound.add('gameAu').setVolume(1);
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
        this.add.image(0, 0, 'bg').setOrigin(0, 0)
        this.addPlayerAnimate()
        this.addEnemyAnimate()
        this.addExplodeEffect()
        this.addHeart()
        this.addAudio()
        this.addGameAudio()
        // this.add.image(0,0,"tiles")
        const map = this.make.tilemap({ key: "map2", tileWidth: 32, tileHeight: 32 })
        const tileset = map.addTilesetImage("map1", "tiles")
        const layer = map.createLayer("behind", tileset, 0, -350)
        this.layerFront = map.createLayer("front", tileset, 0, -350)


        
        this.layerFront.displayWidth=config.width
        layer.displayWidth=config.width

        this.playerState = {
            attack: "attack_anims",
            run: "run_anims",
            idle: "idle_anims",
            hurt: "hurt_anims",
            dead: "dead_anims",
        }
        this.enemyState = {
            attack: "enemy_attack_anims",
            run: "enemy_run_anims",
            idle: "enemy_idle_anims",
            hurt: "enemy_hurt_anims",
            dead: "enemy_dead_anims",
        }
        this.currentIndex = 0;
        this.addEnemy()
        this.player = new ObjectGame(this, 100, 480, "player", this.playerState)
        this.canAttack = false;
        this.beAttacked = false
        this.player.body.flipX = true
        this.canAskNewQues = true
        this.win = false
        this.lose = false;
        this.table = false
        this.addCollision()
        //this.addQuestion()
        this.canPlay = false
        this.addAvatarAndFrame()
        this.addMenuInstruction()
    }
    addEnemy() {
        var minPixels = config.width * (50 / 100);
        var maxPixels = config.width * (70 / 100);
        var randomValue = Math.random() * (maxPixels - minPixels) + minPixels;
        this.enemy = new ObjectGame(this, randomValue, 480, "enemy", this.enemyState)
        var minPixels = config.width * (60 / 100);
        var maxPixels = config.width * (80 / 100);
        var randomValue = Math.random() * (maxPixels - minPixels) + minPixels;
        this.enemy2 = new ObjectGame(this, randomValue + 5 / 100 * window.innerWidth, 480, "enemy", this.enemyState)
    }
    addCollision() {
        this.physics.add.collider(this.player.body, this.layerFront)
        this.physics.add.collider(this.enemy.body, this.layerFront)
        this.physics.add.collider(this.enemy2.body, this.layerFront)
        this.layerFront.setCollisionBetween(1, 40)
        this.layerFront.setCollisionBetween(2, 40)
        this.layerFront.setCollisionBetween(3, 40)
        this.layerFront.setCollisionBetween(6, 40)
        this.layerFront.setCollisionBetween(7, 40)
        this.layerFront.setCollisionBetween(8, 40)
        this.layerFront.setCollisionBetween(9, 40)
    }
    addHome() {
        this.home = this.add.text(90 / 100 * config.width, 5 / 100 * config.height, "HOME", { fontSize: '30px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(8).setInteractive();
        // this.home.visible = false
        this.home.on('pointerover', () => {
            this.home.setColor('#00ff00');
        });
        this.home.on('pointerout', () => {
            this.home.setColor('white');
        });
        this.home.on('pointerdown', () => {
            this.DupMusic.play()
            this.home.setColor('red');
            this.canPlayGameAu=true
            this.gameMusic.stop()
            this.scene.start("mainMenu")
        });
        this.home.on('pointerup', () => {
            this.home.setColor('white');
        });
    }
    addQuestion() {
        if (!this.enemy && !this.enemy2) return
        this.canAskNewQues = false
        if (this.currentIndex > 6) {
            this.lose = true
            return
        }
        this.ques = null
        this.ques = new QuestionSocial(this)
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
            socialMediaQuestions = randomizeQuestions(randomizedQuestions);
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
            this.canPlayGameAu=true
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
    addMenuInstruction() {
        this.darkness2 = this.add.image(0, 0, "black").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.darkness2.alpha = 0
        this.tweens.add({
            targets: this.darkness2,
            alpha: 0.9,
            duration: 2000,
            ease: 'Linear',
            onComplete: () => {
                this.textInstruction = this.add.text(22 / 100 * config.width, 100, "Answer the questions to destroy monsters", { fontSize: '55px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5);
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
        if(!this.gameMusic.isPlaying&&!this.canPlayGameAu)
            this.gameMusic.play()
        else if(this.canPlayGameAu) this.gameMusic.stop()
        // if(!this.enemy&&!this.enemy2) this.win=trueF
        if (this.lose && !this.table) {
            this.home.visible = false
            this.deadMusic.play()
            this.player.body.play(this.player.state.dead)
            this.addDark("YOU LOSS")
            this.table = true

        }
        if (this.lose) return
        if (this.win && !this.table) {
            this.home.visible = false
            this.addDark("YOU WIN!")
            this.table = true
        }
        if (this.win) {
            if (this.player.comeBack)
                this.player.update()
            return;
        }

        if (this.canAskNewQues)
            this.addQuestion()
        if (this.ques && this.ques.displayScore == true)
            this.ques.displayScoreInTable()
        this.player.update()
        if (this.enemy) this.enemy.update()
        if (this.enemy2) this.enemy2.update()
        if (this.enemy && !this.enemy.body) this.enemy = null
        if (this.enemy2 && !this.enemy2.body) this.enemy2 = null
    }
}
class ObjectGame {
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
        this.attack = false
        this.idle = true
        this.comeBack = false
        this.targets = null
        this.createObject()
    }
    createObject() {
        this.body = this.scene.physics.add.sprite(this.x, this.y, this.type).setScale(0.2).play(this.state.idle)
        this.body.setSize(400, 630);
        // element.setOffset(97, 140);
    }
    comebackInitial() {
        if (!this.comeBack) {
            //this.scene.runMusic.stop()
            return
        }
        // if (!this.scene.runMusic.isPlaying) {
        //     // console.log("runnnnnnn")
        //     this.scene.runMusic.play()
        // }
        // if (!this.run) {
        //     this.body.play(this.state.run)
        //     this.run = true
        // }
        // this.body.setVelocity(-400, 0)
        // this.body.flipX = false
        // if (this.body.x <= this.initalX) {
        //     this.body.setVelocity(0, 0)
        this.comeBack = false
        //     this.body.flipX = true
        this.attack = false
        this.run = false
        if (!this.idle) {
            this.idle = true
            this.body.play(this.state.idle)
        }
        this.scene.canAttack = false
        if (!this.scene.canAskNewQues)
            this.scene.canAskNewQues = true
        //  }
    }
    moveTo(_object) {
        if (this.run && !this.scene.runMusic.isPlaying) {
            this.scene.runMusic.play()
        }
        else if (!this.run) this.scene.runMusic.stop()
        if (this.comeBack || this.attack) return
        if (!this.run) {
            this.idle = false
            this.run = true
            this.body.play(this.state.run)
        }
        if (_object.body.x > this.body.x) {
            this.body.setVelocity(400, 0)
        } else {
            this.body.setVelocity(-400, 0)
        }
        // for player
        this.scene.physics.add.overlap(this.body, _object.body, () => {
            //  console.log('Overlap detected!');
            this.body.setVelocity(0, 0)
            this.run = false
            this.targets = _object
            if (!this.attack) {
                this.scene.attackMusic.play()
                this.body.play(this.state.attack)
                this.attack = true
            }
        });
    }
    attack(_object) {

    }
    dead() {

    }
    hurt() {

    }
    update() {
        if (!this.body) return
        if (this.type == "player" && this.scene.canAttack && !this.comeBack) {
            var object = null
            if (!this.scene.enemy && this.scene.enemy2) object = this.scene.enemy2
            else
                if (this.scene.enemy && !this.scene.enemy2) object = this.scene.enemy
                else if (!this.scene.enemy && !this.scene.enemy2) {

                } else
                    object = (this.scene.enemy.x > this.scene.enemy2.x) ? this.scene.enemy2 : this.scene.enemy;
            if (object != null)
                this.moveTo(object)
            else this.scene.win = true
        }
        if (this.type == "enemy" && this.scene.beAttacked && !this.comeBack && !this.scene.explouseEffect.visible) {
            this.scene.explouseEffect.visible = true
            this.scene.explouseEffect.setPosition(this.scene.player.body.x, this.scene.player.body.y)
            this.scene.explouseEffect.play('explouse_anim')
            this.scene.explosionMusic.play()
            if (this.scene.heart.length > 0) {
                this.scene.heart[this.scene.heart.length - 1].destroy()
                this.scene.heart.pop()
                if (this.scene.heart.length == 0) {
                    this.scene.lose = true
                }
            }
            this.body.play(this.state.attack)
            this.comeBack = true
            setTimeout(() => {
                this.scene.beAttacked = false
                this.scene.canAskNewQues = true
                this.scene.explouseEffect.visible = false
                this.comeBack = false
            }, 700);
            this.idle = false
        }
        if (this.body && this.body.anims.currentAnim.key == "enemy_attack_anims") {
            if (this.body.anims.currentFrame.index == 8) {
                if (!this.idle) {
                    this.idle = true
                    this.body.play(this.state.idle)
                }
            }
        }
        if (this.body.anims.currentAnim.key == "attack_anims") {
            if (this.body.anims.currentFrame.index == 8) {
                if (!this.idle) {
                    this.idle = true
                    this.body.play(this.state.idle)
                    this.comeBack = true
                    this.idle = false
                    this.targets.body.destroy()
                    this.targets.body = null
                    this.targets = null
                }
            }

        }
        if (this.comeBack && this.type == "player") {
            setTimeout(() => {
                this.comebackInitial()
            }, 500);
        }
        if (!this.scene.enemy && !this.scene.enemy2) this.scene.win = true
    }
}

class QuestionSocial {
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
        this.support=false
        this.supportButton=null

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
                    if (this.maxScore == 200)
                        this.scene.canAttack = true
                    else this.scene.beAttacked = true
                    // console.log(this.scene.canAttack)
                    // console.log(this.scene.beAttacked)
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
            this.canPlayGameAu=true
            this.gameMusic.stop()
            this.scene.scene.start("mainMenu")
        });
        this.home.on('pointerup', () => {
            this.home.setColor('white');
        });
    }
    displayQuestion(index) {
        var currentQuestion = socialMediaQuestions[index];
        this.questionText.setText(currentQuestion.question);

        for (var i = 0; i < 4; i++) {
            this.answerTexts[i].setText(currentQuestion.answers[i]);
        }
        this.addButtonSupport()
    }

    checkAnswer(index) {
        if(this.supportButton)
            this.supportButton.destroy()
        //  console.log(index + "   " + socialMediaQuestions[this.currentQuestionIndex].question)
        if (this.hasCheckAnswer) return
        if (!this.hasCheckAnswer)
            this.hasCheckAnswer = true
        var currentQuestion = socialMediaQuestions[this.currentQuestionIndex];
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
    addButtonSupport(){
        if(scoreCoin>1000){
            this.supportButton= this.scene.add.text(100, 200 + 4 * 50, 'Delete 2 option with 1000 coin', { fontSize: '20px', fontFamily: 'Times New Roman', fill: 'White' }).setDepth(5).setInteractive();
            this.supportButton.on('pointerover', () => {
                this.supportButton.setColor('#00ff00');
            });
            this.supportButton.on('pointerout', () => {
                this.supportButton.setColor('white');
            });
            this.supportButton.on('pointerdown', () => {
                scoreCoin-=1000
                localStorage.setItem('money', scoreCoin)
                this.supportButton.setColor('red');
                this.scene.DupMusic.play()
             
                this.removeTwoAnswers()
            });
        }
    }
    removeTwoAnswers(){
        if(this.supportButton)
            this.supportButton.destroy()
        var currentQuestion = socialMediaQuestions[this.currentQuestionIndex];
        var index=0
        var option1=0
        while(index!=2){
            const randomNumber = Math.floor(Math.random() * 4);
            if(randomNumber!=currentQuestion.correctIndex&&randomNumber!=option1){
                this.answerTexts[randomNumber].destroy()
                option1=randomNumber
                index++
            }
            
        }
    }
}