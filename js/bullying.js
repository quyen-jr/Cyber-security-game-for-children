class Bullying extends Phaser.Scene {
    constructor() {
        super("bullying")
    }
    preload() {
        this.load.image('menuimg', './assets/Sunny Cloud Background.png')
        this.load.atlas("cards", "assets/bulying/bulying.png", "assets/bulying/bulying.json")
        // this.load.image('darkness', './assets/bulying/darkness.jpg')
        this.load.image('black', './assets/black.png')
        // this.load.image('double', './assets/bulying/double.jpg')
        // this.load.image('fairy', './assets/bulying/fairy.jpg')
        // this.load.image('fighting', './assets/bulying/fighting.jpg')
        // this.load.image('fire', './assets/bulying/fire.jpg')
        // this.load.image('grass', './assets/bulying/grass.jpg')
        // this.load.image('metal', './assets/bulying/metal.jpg')
        // this.load.image('lightning', './assets/bulying/lightning.jpg')
        // this.load.image('psychic', './assets/bulying/psychic.jpg')
        // this.load.image('water', './assets/bulying/water.jpg')
         this.load.image('back', './assets/bulying/Back_version_2.png')
        // audio
        this.load.audio('au1', './audio/Abstract2.mp3');
        this.load.audio('au2', './audio/African2.mp3');
        this.load.audio('au3', './audio/Coffee1.mp3');

    }
    create() {
        this.canPlay=false
        this.btnMusic = this.sound.add('au3').setVolume(6);
        this.DupMusic = this.sound.add('au2').setVolume(6);

        this.bgMid1 = this.add.image(0, 0, "menuimg").setOrigin(0, 0).setDisplaySize(config.width, config.height)
       // this.add.rectangle(24.5 / 100 * config.width, 1 / 100 * config.height, 50.5 / 100 * config.width, 95 / 100 * config.height, "0xfffff").setOrigin(0, 0)
      //  console.log(90 / 100 * config.height)
        this.cardList = [
            "facebook",
            "twitter",
            "whatsapp",
            "nin",
            "fear",
            "happy",
            "sadness",
            "snapchat",
            "wow",
            "instagram"
        ]
        this.shuffleCards()
        this.turn = 1
        this.posOfFirtCarHasPicked = null
        this.fistCardHasPick = null
        this.canClick = true
        this.displayQuestion = false
        //this.whenBeginSence()
        this.ques= new Question(this)
        this.addAvatarAndFrame()
        this.addMenuInstruction()
        
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
    addMenuInstruction() {
        this.darkness2 = this.add.image(0, 0, "black").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.darkness2.alpha = 0
        this.tweens.add({
            targets: this.darkness2,
            alpha: 0.95,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
                this.card.forEach(element => {
                    element.hideCard(1000)
                });
                this.textInstruction = this.add.text(29 / 100 * config.width, 30 / 100 * config.height, "Choose 2 identical cards", { fontSize: '70px', fontFamily: 'Times New Roman', fill: 'red' }).setDepth(5);
                setTimeout(() => {
                    this.addHome() 
                }, 2000);
                setTimeout(() => {
                    this.textInstruction.destroy()
                    this.tweens.add({
                        targets: this.darkness2,
                        alpha: 0,
                        duration: 1000,
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
    whenBeginSence(){
        this.darkness = this.add.rectangle(0, 0, config.width, config.height, 0x000000, 0.9).setOrigin(0, 0);
        this.tweens.add({
            targets: this.darkness,
            alpha: 0,
            duration: 1000,
            ease: 'ease-out',
            onComplete: function () {

            }})
    }
    shuffleCards() {
        this.cardSet = this.cardList.concat(this.cardList);
        for (let i = 0; i < this.cardSet.length; i++) {
            let j = Math.floor(Math.random() * this.cardSet.length);
            let temp = this.cardSet[i];
            this.cardSet[i] = this.cardSet[j];
            this.cardSet[j] = temp;
        }
        this.board = []
        var rows = 4
        var columns = 5
        for (let r = 0; r < rows; r++) {
            let row = [];
            for (let c = 0; c < columns; c++) {
                let cardImg = this.cardSet.pop()
                row.push(cardImg);
            }
            this.board.push(row);
        }

        this.card = []
        var index = 0
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.card[index] = new Card(this, 25 / 100 * config.width + j * 10/100*config.width, 2 / 100 * config.height + i * 23.3/100*config.height, this.board[i][j], index)
                index++
            }
        }
        //console.log(this.card);
    }
    addHome(){
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
            this.scene.start("mainMenu")
        });
        this.home.on('pointerup', () => {
            this.home.setColor('white');
        });
    }
    update() {
        if (!this.canPlay) return
        if ( this.checkToWin()&&!this.displayQuestion) {
           // console.log("you win")
            this.displayQuestion = true
            this.displayQuestions()
        }
        if(this.ques.displayScore){
            this.home.visible=false
            this.ques.displayScoreInTable()
        }

    }
    displayQuestions() {
        this.ques= null
        this.ques= new Question(this)
        this.darkness2 = this.add.image(0, 0,  "black").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.darkness2.alpha=0
        // for (let i = 0; i < 60; i++) {
        //     if(this.darkness2.alpha<=0.5){
        //         this.darkness2.alpha+=0.1
        //     }
           
            
        // }
        this.tweens.add({
            targets: this.darkness2,
            alpha: 0.9,
            duration: 2000,
            ease: 'Linear',
            onComplete:  ()=> {
                this.ques.createQuestions()
            }})
    }
    checkToWin() {
        for (let i = 0; i < this.card.length; i++) {
            if (this.card[i].win == false)
                return false

        }
        return true
    }
}
class Card {
    constructor(_scene, _x, _y, _img, _pos) {
        this.pos = _pos
        this.scene = _scene
        this.x = _x
        this.y = _y
        this.img = _img
        this.body = null
        this.isChose = false
        this.win = false
        this.defaultScale = 0.22479564032697547
        this.addImageToBoard()
    }
    addImageToBoard() {
        this.body = this.scene.add.image(this.x, this.y,"cards",this.img).setDisplaySize(10/100*config.width-5, 23.3/100*config.height-3).setOrigin(0, 0).setInteractive()
        this.body.on('pointerdown', () => {
       //     console.log("card clicked")

            if (this.isChose || this.win) return
            this.scene.btnMusic.play()
            if (this.scene.turn == 1) {
                this.isChose = true
                this.scene.fistCardHasPick = this.img
                this.scene.posOfFirtCarHasPicked = this.pos
                this.scene.turn = 2
            } else if (this.img == this.scene.fistCardHasPick&&this.scene.turn==2) {
                this.scene.DupMusic.play()
                this.displayCard()
                this.scene.card[this.scene.posOfFirtCarHasPicked].win = true
                this.scene.posOfFirtCarHasPicked = null
                this.scene.fistCardHasPick = null
                this.win = true
                this.scene.turn = 1
                this.isChose = true
                return
            } else{
                this.scene.card[this.scene.posOfFirtCarHasPicked].isChose = false
                this.scene.card[this.scene.posOfFirtCarHasPicked].hideCard(500)
                this.scene.posOfFirtCarHasPicked = null
                this.scene.fistCardHasPick = null
                this.isChose = false
                this.scene.turn = 1
                this.hideCard(400)
                
                //
            }
            this.displayCard()
        })
    }
    hideCard(_second) {
        this.scene.time.delayedCall(_second, () => { this.body.setFrame("back").setScale(1)
        
        this.body.setDisplaySize(10/100*config.width-5, 23.3/100*config.height-3).setOrigin(0, 0).setInteractive().setTint(0x808080);

    }) 
    }
    displayCard() {
        this.scene.time.delayedCall(20, () => { this.body.setFrame(this.img).setDisplaySize(10/100*config.width-5, 23.3/100*config.height-3).setOrigin(0, 0).setInteractive().clearTint();})//.setInteractive(); })
    }
}