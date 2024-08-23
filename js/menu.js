class Menu extends Phaser.Scene {
    constructor() {
        super("mainMenu")
    }
    preload() {
        this.load.image('menuimg', './assets/Sunny Cloud Background.png')
        this.load.image('btn', './assets/button.png')
        this.load.image('password', './assets/password.png')
        this.load.image('social', './assets/social.png')
        this.load.image('verifi', './assets/verifi.png')
        this.load.image('bullying', './assets/bullying.png')
        this.load.image('frame', './assets/12.png')
        this.load.atlas("avatars", "assets/avatars.png", "assets/avatars.json")
        this.load.audio('au1', './audio/Abstract2.mp3');
        this.load.audio('au5', './audio/Abstract2.mp3');
        this.load.audio('au3', './audio/Coffee1.mp3');
        this.load.audio('bgAu', './audio/bg.mp3');
        this.load.audio('gameAu', './audio/game.mp3');
        console.log(config.height)
        //
    }
    create() {
        this.stopMusic = false
        this.btnMusic = this.sound.add('au3').setVolume(6);
        this.DupMusic = this.sound.add('au5').setVolume(15);
        this.bgMusic = this.sound.add('bgAu').setVolume(0.5);
        var delta = 9
        if (config.width <= 1300)
            delta = 13
        // console.log(config.width+" "+ config.height)
        this.money = this.add.text(delta / 100 * config.width, 3.5 / 100 * config.height, "COIN : " + scoreCoin, { fontSize: '20px', fontFamily: 'Times New Roman', fill: 'yellow' }).setDepth(5);
        this.canChangeMenu = true
        this.cameras.main.setViewport(0, 0, config.width, config.height);
        this.cameras.main.zoom = 1.25
        this.virtualCamera = { x: 0, y: 0 }
        this.setUpBackground()
        this.addButtonAction()
        this.addIsland()
        this.cameras2 = this.cameras.add(0, 0, config.width, config.height)
        this.cameras2.ignore([this.bgLeft1, this.bgLeft2, this.bgMid1, this.bgMid2, this.bgRight1,
        this.bgRight2, this.socialIsland, this.bullyingIsland, this.passwordIsland, this.verifiIsland, this.socialText, this.bullyingText, this.passwordText, this.verifiText,
        this.buttonSocialBackground, this.buttonSocialText, this.buttonBullyingBackground, this.buttonBullyingText,this.socialPrice])
        this.addShop()
      
      
        this.cameras.main.ignore([this.btnLeft, this.btnRight, this.money, this.avatarEquiped, this.frame, this.shop, this.avatars, this.price, this.buyButton, this.price, this.closeShopButton])
     //   if(    this.socialPrice )this.cameras.main.ignore([this.socialPrice])
    }
    addIsland() {
        this.socialPrice = this.add.text(37 / 100 * config.width, 50 / 100 * config.height,   '5000$', { fontFamily: 'Times New Roman', fontSize: '50px', fill: 'green' }).setDepth(5).setInteractive();
        this.socialPrice.visible=false
        //  this.moveToSection("right")
        this.cameras.main.scrollX -= config.width * 2,
            //  this.cameras.main.scrollX + distance,
            //    this.moveToSection("left")
            this.islandPrice = {
                bullying: 3000,
                social: 5000,
                password: 1000
            }


        this.islandsHasBuy = null
        if (!localStorage.getItem('islandsHasBuy')) {
            // Nếu không có, lưu dữ liệu mặc định vào local storage
            localStorage.setItem('islandsHasBuy', JSON.stringify({
                social: false,
                bullying: false,
                verify: true,
                password: false
            }));
        } else {
            // Nếu có, lấy dữ liệu từ local storage và gán cho biến this.islandsHasBuy
            this.islandsHasBuy = JSON.parse(localStorage.getItem('islandsHasBuy'));
        }
        // localStorage.setItem('islandsHasBuy', JSON.stringify({
        //     social: false,
        //     bullying: false,
        //     verify: true,
        //     password: false
        // }));  
        // this.islandsHasBuy = JSON.parse(localStorage.getItem('islandsHasBuy'));





        // social 
        this.socialIsland = this.add.image(40 / 100 * config.width, 50 / 100 * config.height, "social").setScale(0.3).setTint("black")



        var textX = 60 / 100 * config.width
        var textY = 30 / 100 * config.height
        this.socialText = this.add.text(textX, textY, 'SOCIAL MEDIA', { fontFamily: 'Times New Roman', fontSize: '50px', fill: '#ff8000' }).setDepth(5).setInteractive();

        this.socialText.visible = false

        if (!this.islandsHasBuy.social) {
           // this.socialPrice = this.add.text(37 / 100 * config.width, 50 / 100 * config.height,   '5000$', { fontFamily: 'Times New Roman', fontSize: '50px', fill: 'green' }).setDepth(5).setInteractive();
        
            this.socialPrice.visible=true
           this.socialIsland.setInteractive()
            this.socialIsland.on('pointerover', () => {
                this.socialIsland.setTint("0x333333")
            })
            this.socialIsland.on('pointerout', () => {
                this.socialIsland.setTint("black")
            })
            this.socialIsland.on('pointerdown', () => {
                this.DupMusic.play()
            })
        }
        if (this.islandsHasBuy.social) this.displaySocial()




        this.bullyingIsland = this.add.image(40 / 100 * config.width + config.width, 50 / 100 * config.height, "bullying").setScale(0.5).setTint("black")

        var textX = 60 / 100 * config.width + config.width
        var textY = 30 / 100 * config.height
        this.bullyingText = this.add.text(textX, textY, 'CYBER BULLYING', { fontFamily: 'Times New Roman', fontSize: '50px', fill: '#99994d' }).setDepth(5).setInteractive();
        this.bullyingText.visible = false
        if (!this.islandsHasBuy.bullying) {
            this.bulyingPrice = this.add.text(38 / 100 * config.width + config.width, 50 / 100 * config.height, '3000$', { fontFamily: 'Times New Roman', fontSize: '50px', fill: 'green' }).setDepth(5).setInteractive();
            this.bullyingIsland.setInteractive()
            this.bullyingIsland.on('pointerover', () => {
                this.bullyingIsland.setTint("0x333333")
            })
            this.bullyingIsland.on('pointerout', () => {
                this.bullyingIsland.setTint("black")
            })
            this.bullyingIsland.on('pointerdown', () => {
                this.DupMusic.play()
            })
        }
        if (this.islandsHasBuy.bullying) {
            this.displayBulying()
        }

        // bulying







        //
        this.passwordIsland = this.add.image(40 / 100 * config.width - config.width - 50, 50 / 100 * config.height, "password").setScale(0.3).setTint("black")

        var textX = 67 / 100 * config.width - config.width - 50
        var textY = 30 / 100 * config.height
        this.passwordText = this.add.text(textX, textY, 'PASSWORD', { fontFamily: 'Times New Roman', fontSize: '50px', fill: '#e68a00' }).setDepth(5).setInteractive()
        this.passwordText.visible = false


        if (!this.islandsHasBuy.password) {
           this.passwordPrice = this.add.text(36 / 100 * config.width - config.width - 50, 47 / 100 * config.height, '1000$', { fontFamily: 'Times New Roman', fontSize: '50px', fill: 'green' }).setDepth(5).setInteractive();
        
          this.passwordIsland.setInteractive()
            this.passwordIsland.on('pointerover', () => {
                this.passwordIsland.setTint("0x333333")
            })
            this.passwordIsland.on('pointerout', () => {
                this.passwordIsland.setTint("black")
            })
            this.passwordIsland.on('pointerdown', () => {
                this.DupMusic.play()
            })
        }
        if (this.islandsHasBuy.password) this.displayPassword()

        //
        this.verifiIsland = this.add.image(40 / 100 * config.width - 50 - config.width * 2, 50 / 100 * config.height, "verifi").setScale(0.3)

        var textX = 59.2 / 100 * config.width - config.width - 50 - config.width
        var textY = 30 / 100 * config.height
        this.verifiText = this.add.text(textX, textY, 'VERIFICATION OF INFOMATION', { fontFamily: 'Times New Roman', fontSize: '29px', fill: '#00ff00' }).setDepth(5).setInteractive();
        this.tweens.add({
            targets: this.verifiIsland,
            y: '+=40',
            duration: 1000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: this.verifiIsland,
            scaleX: '+=0.005',
            scaleY: '+=0.005',
            duration: 1000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });

    }
    addButtonAction() {
        this.btnLeft = this.add.sprite(96 / 100 * config.width, 50 / 100 * config.height, "btn").setScale(1.5).setInteractive();
        this.btnRight = this.add.sprite(5 / 100 * config.width, 50 / 100 * config.height, "btn").setScale(1.5).setInteractive();
        this.btnRight.flipX = true
        //
        this.btnLeft.on('pointerover', () => {
            this.btnLeft.setScale(1.7)
        })
        this.btnLeft.on('pointerout', () => {
            this.btnLeft.setScale(1.5)
        })
        this.btnLeft.on('pointerdown', () => {
            this.DupMusic.play()
            if (this.shop.visible) return
            this.btnLeft.setScale(1.5)
            if (this.cameras.main.scrollX + 10 <= config.width && this.canChangeMenu) {
                this.moveToSection("left")
                this.canChangeMenu = false
            }
        })
        this.btnLeft.on('pointerup', () => {
            this.btnLeft.setScale(1.7)
        })
        //right
        this.btnRight.on('pointerover', () => {
            this.btnRight.setScale(1.7)
        })
        this.btnRight.on('pointerout', () => {
            this.btnRight.setScale(1.5)
        })
        this.btnRight.on('pointerdown', () => {
            this.DupMusic.play()
            if (this.shop.visible) return
            this.btnRight.setScale(1.5)
            if (this.cameras.main.scrollX - 20 >= -config.width * 2 && this.canChangeMenu) {
                this.canChangeMenu = false
                this.moveToSection("right")
            }
        })
        this.btnRight.on('pointerup', () => {
            this.btnRight.setScale(1.7)
        })
        this.addButtonToPlayGame()

    }
    displayBulying() {
        // this.bullyingIsland.d
        if (this.bulyingPrice)
            this.bulyingPrice.visible = false
        this.bullyingText.visible = true
        this.buttonBullyingText.setText('PLAY GAME')
        this.bullyingIsland.clearTint()
        this.bullyingIsland.disableInteractive()
        this.tweens.add({
            targets: this.bullyingIsland,
            y: '+=40',
            duration: 1000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: this.bullyingIsland,
            scaleX: '+=0.005',
            scaleY: '+=0.005',
            duration: 1000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
    }
    displayPassword() {
        if (this.passwordPrice)
            this.passwordPrice.visible = false
        this.passwordText.visible = true
        this.buttonPassText.setText('PLAY GAME')
        this.passwordIsland.clearTint()
        this.passwordIsland.disableInteractive()
        this.tweens.add({
            targets: this.passwordIsland,
            y: '+=40',
            duration: 1000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: this.passwordIsland,
            scaleX: '+=0.005',
            scaleY: '+=0.005',
            duration: 1000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });

    }
    displaySocial() {
        if (this.socialPrice)
            this.socialPrice.visible = false
        this.socialText.visible = true
        this.buttonSocialText.setText('PLAY GAME')
        this.socialIsland.clearTint()
        this.socialIsland.disableInteractive()
        this.tweens.add({
            targets: this.socialIsland,
            y: '+=40',
            duration: 1000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: this.socialIsland,
            scaleX: '+=0.005',
            scaleY: '+=0.005',
            duration: 1000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
    }
    addButtonToPlayGame() {
        this.buttonSocialBackground = this.add.rectangle(70 / 100 * config.width, 50 / 100 * config.height, 150, 50, 0xffe066).setInteractive();
        this.buttonSocialBackground.setOrigin(0.5);

        //#region  social
        this.buttonSocialText = this.add.text(70 / 100 * config.width, 50 / 100 * config.height, 'BUY ISLAND', { fontFamily: 'Times New Roman', fontSize: '22px', fill: '#000000' });
        this.buttonSocialText.setOrigin(0.5);

        this.buttonSocialBackground.setInteractive();
        this.buttonSocialBackground.on('pointerdown', () => {
            this.DupMusic.play()
        });
        this.buttonSocialBackground.on('pointerover', () => {
            this.buttonSocialBackground.setScale(1.05)
        })
        this.buttonSocialBackground.on('pointerout', () => {
            this.buttonSocialBackground.setScale(1)
        })
        this.buttonSocialBackground.on('pointerdown', () => {
            this.DupMusic.play()
            if (this.shop.visible) return
            this.buttonSocialBackground.setScale(1)
            if (!this.islandsHasBuy.social) {
                if (scoreCoin < this.islandPrice.social) return
                scoreCoin -= this.islandPrice.social
                localStorage.setItem('money', scoreCoin);
                localStorage.setItem('islandsHasBuy', JSON.stringify({
                    social: this.islandsHasBuy.social,
                    bullying: this.islandsHasBuy.bullying,
                    verify: true,
                    password: this.islandsHasBuy.password
                }));
                this.islandsHasBuy.social = true
                this.money.setText("COIN : " + scoreCoin)
                this.displaySocial()
                return
            }
            this.playScene("social")
        })
        this.buttonSocialBackground.on('pointerup', () => {
            this.buttonSocialBackground.setScale(1.05)
        })
        //#endregion


        //#region  bulying

        this.buttonBullyingBackground = this.add.rectangle(73 / 100 * config.width + config.width, 50 / 100 * config.height, 150, 50, 0xc3c388).setInteractive();
        this.buttonBullyingBackground.setOrigin(0.5);

        this.buttonBullyingText = this.add.text(73 / 100 * config.width + config.width, 50 / 100 * config.height, 'BUY ISLAND', { fontFamily: 'Times New Roman', fontSize: '22px', fill: '#000000' });
        this.buttonBullyingText.setOrigin(0.5);
        //  this.buttonBullyingText.visible=false
        //this.buttonBullyingBackground.visible=false
        this.buttonBullyingBackground.setInteractive();
        this.buttonBullyingBackground.on('pointerdown', () => {
            this.DupMusic.play()
            if (this.shop.visible) return
            if (!this.islandsHasBuy.bullying) {
                if (scoreCoin < this.islandPrice.bullying) return
                scoreCoin -= this.islandPrice.bullying
                localStorage.setItem('money', scoreCoin);
                localStorage.setItem('islandsHasBuy', JSON.stringify({
                    social: this.islandsHasBuy.social,
                    bullying: true,
                    verify: this.islandsHasBuy.verify,
                    password: this.islandsHasBuy.password
                }));
                this.islandsHasBuy.bullying = true
                this.money.setText("COIN : " + scoreCoin)
                this.displayBulying()
                return
            }
            this.buttonBullyingBackground.setScale(1)
            this.playScene("bullying")
        });
        this.buttonBullyingBackground.on('pointerover', () => {
            this.buttonBullyingBackground.setScale(1.05)
        })
        this.buttonBullyingBackground.on('pointerout', () => {
            this.buttonBullyingBackground.setScale(1)
        })
        this.buttonBullyingBackground.on('pointerdown', () => {
            // this.DupMusic.play()
            this.buttonBullyingBackground.setScale(1)
        })
        this.buttonBullyingBackground.on('pointerup', () => {
            this.buttonBullyingBackground.setScale(1.05)
        })

        //#endregion
        //
        this.buttonPassBackground = this.add.rectangle(72 / 100 * config.width - config.width, 50 / 100 * config.height, 150, 50, 0xe68a00).setInteractive();
        this.buttonPassBackground.setOrigin(0.5);

        this.buttonPassText = this.add.text(72 / 100 * config.width - config.width, 50 / 100 * config.height, 'BUY ISLAND', { fontFamily: 'Times New Roman', fontSize: '22px', fill: 'white' });
        this.buttonPassText.setOrigin(0.5);
        this.buttonPassBackground.setInteractive();
        this.buttonPassBackground.on('pointerdown', () => {
            this.DupMusic.play()
        });
        this.buttonPassBackground.on('pointerover', () => {
            this.buttonPassBackground.setScale(1.05)
        })
        this.buttonPassBackground.on('pointerout', () => {
            this.buttonPassBackground.setScale(1)
        })
        this.buttonPassBackground.on('pointerdown', () => {
            this.DupMusic.play()
            if (this.shop.visible) return
            this.buttonPassBackground.setScale(1)
            if (!this.islandsHasBuy.password) {
                if (scoreCoin < this.islandPrice.password) return
                scoreCoin -= this.islandPrice.password
                localStorage.setItem('money', scoreCoin);
                localStorage.setItem('islandsHasBuy', JSON.stringify({
                    social: this.islandsHasBuy.social,
                    bullying: this.islandsHasBuy.bullying,
                    verify: this.islandsHasBuy.verify,
                    password: true
                }));
                this.islandsHasBuy.password = true
                this.money.setText("COIN : " + scoreCoin)
                this.displayPassword()
                return
            }

            this.playScene("password")
        })
        this.buttonPassBackground.on('pointerup', () => {
            this.buttonPassBackground.setScale(1.05)
        })
        // verifi
        this.buttonVerifiBackground = this.add.rectangle(68 / 100 * config.width - config.width * 2, 50 / 100 * config.height, 150, 50, 0x00cc00).setInteractive();
        this.buttonVerifiBackground.setOrigin(0.5);

        this.buttonVerifiText = this.add.text(68 / 100 * config.width - config.width * 2, 50 / 100 * config.height, 'PLAY GAME', { fontFamily: 'Times New Roman', fontSize: '22px', fill: 'white' });
        this.buttonVerifiText.setOrigin(0.5);

        this.buttonVerifiBackground.setInteractive();
        this.buttonVerifiBackground.on('pointerdown', function () {
        });
        this.buttonVerifiBackground.on('pointerover', () => {
            this.buttonVerifiBackground.setScale(1.05)
        })
        this.buttonVerifiBackground.on('pointerout', () => {
            this.buttonVerifiBackground.setScale(1)
        })
        this.buttonVerifiBackground.on('pointerdown', () => {
            this.DupMusic.play()
            if (this.shop.visible) return
            this.buttonVerifiBackground.setScale(1)


            this.playScene("verify")
        })
        this.buttonVerifiBackground.on('pointerup', () => {
            this.buttonVerifiBackground.setScale(1.05)
        })
    }
    playScene(_text) {

        //  this.bgMusic.stop()
        this.tweens.add({
            targets: this.cameras.main,
            zoom: 1,
            duration: 1200,
            ease: 'ease-out',
            onComplete: () => {
                this.tweens.add({
                    targets: this.cameras.main,
                    zoom: 20.25,
                    duration: 300,
                    ease: 'ease-in',
                    onComplete: () => {
                        this.stopMusic = true
                        this.bgMusic.stop()
                        this.scene.start(_text);

                    }
                });
            }
        });
    }
    setUpBackground() {
        this.parallaxEffect = 0.3
        this.xPosition = 0
        this.length = config.width * 2
        this.bgMid1 = this.add.image(0, 0, "menuimg").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.bgMid2 = this.add.image(config.width, 0, "menuimg").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.bgMid2.flipX = true

        this.bgRight1 = this.add.image(config.width * 2, 0, "menuimg").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.bgRight2 = this.add.image(config.width * 3, 0, "menuimg").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.bgRight2.flipX = true

        this.bgLeft1 = this.add.image(-config.width, 0, "menuimg").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.bgLeft2 = this.add.image(-config.width * 2, 0, "menuimg").setOrigin(0, 0).setDisplaySize(config.width, config.height)
        this.bgLeft1.flipX = true
    }
    update() {
        if (!this.bgMusic.isPlaying && !this.stopMusic)
            this.bgMusic.play()
        this.parallaxBackground()
    }
    moveToSection(_direction) {
        var distanceMove = config.width
        var distance = -distanceMove
        if (_direction == "left")
            distance = distanceMove
        this.tweens.add({
            targets: this.cameras.main,
            scrollX: this.cameras.main.scrollX + distance,
            duration: 1000,
            ease: 'ease-out'
        });
        this.tweens.add({
            targets: this.cameras.main,
            zoom: 1,
            duration: 800,
            ease: 'ease-out',
            onComplete: () => {
                this.tweens.add({
                    targets: this.cameras.main,
                    zoom: 1.25,
                    duration: 600,
                    ease: 'ease-in',
                    onComplete: () => {
                        this.canChangeMenu = true
                    }
                });
            }
        });
    }
    parallaxBackground() {

        var distanceMoved = this.cameras.main.scrollX * (1 - this.parallaxEffect);
        var distanceToMove = this.cameras.main.scrollX * this.parallaxEffect;

        this.bgMid1.x = this.xPosition + distanceToMove
        this.bgMid2.x = this.xPosition + distanceToMove + config.width
        this.bgRight1.x = this.xPosition + distanceToMove + config.width * 2
        this.bgRight2.x = this.xPosition + distanceToMove + config.width * 3
        this.bgLeft1.x = this.xPosition + distanceToMove - config.width
        this.bgLeft2.x = this.xPosition + distanceToMove - config.width * 2

        if (distanceMoved > this.xPosition + this.length) {
            this.xPosition += this.length;
        } else if (distanceMoved < this.xPosition - this.length) {
            this.xPosition -= this.length;
        }
    }


    addShop(_Text) {
        this.avatars = []
        this.price = []
        this.hasBuy = []
        // this.hasBuy[0]=true
        //localStorage.setItem('hasBuy', JSON.stringify(this.hasBuy));
        if (localStorage.getItem('hasBuy')) {
            this.hasBuy = JSON.parse(localStorage.getItem('hasBuy'));
        } else {
            // Khởi tạo giá trị mặc định nếu không có dữ liệu trong local storage
            this.hasBuy = [];
        }
        console.log(this.hasBuy)
        for (let i = 0; i < 7; i++) {
            this.avatars[i] = this.add.sprite(29 / 100 * config.width + 7 / 100 * config.width * i, 30 / 100 * config.height, "avatars").setFrame("CasualAvatar_0" + i).setScale(0.16555).setDepth(8).setInteractive()
            this.avatars[i].visible = false
            //console.log
            if (!this.hasBuy[i])
                this.price[i] = this.add.text(27 / 100 * config.width + 7 / 100 * config.width * i, 37 / 100 * config.height, "price :" + i * 10 + "k", { fontSize: '20px', fontFamily: 'Times New Roman', fill: 'green' }).setDepth(8);
            else
                this.price[i] = this.add.text(27 / 100 * config.width + 7 / 100 * config.width * i, 37 / 100 * config.height, "", { fontSize: '20px', fontFamily: 'Times New Roman', fill: 'green' }).setDepth(8);
            this.price[i].visible = false
        }


        this.addAvatarAndFrame()


        this.changeAvatarbutton = this.add.text(3 / 100 * config.width, 11 / 100 * config.height, "Change", { fontSize: '20px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(7);
        this.changeAvatarbutton.visible = false

        this.shop = this.add.rectangle(25 / 100 * config.width, 20 / 100 * config.height, 50 / 100 * config.width, 50 / 100 * config.height, 0xffffff).setDepth(6).setOrigin(0, 0);
        this.shop.visible = false
        this.shop.alpha = 0.9

        //buy 
        this.buyButton = this.add.text(3 / 100 * config.width, 11 / 100 * config.height, "BUY", { fontSize: '20px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(9).setOrigin(0, 0);
        this.buyButton.visible = false

        //close
        this.closeShopButton = this.add.text(70 / 100 * config.width, 65 / 100 * config.height, "CLOSE", { fontSize: '20px', fontFamily: 'Times New Roman', fill: 'red' }).setDepth(8).setInteractive();
        this.closeShopButton.visible = false

        this.avatarEquiped.on('pointerover', () => {
            this.avatarEquiped.setTint(0x808080)
            this.changeAvatarbutton.visible = true
        })
        this.avatarEquiped.on('pointerout', () => {
            this.avatarEquiped.clearTint()
            this.changeAvatarbutton.visible = false
        })
        this.avatarEquiped.on('pointerdown', () => {
            this.DupMusic.play()
            this.avatarEquiped.clearTint()
            this.displayShop()


        })
        this.avatarEquiped.on('pointerup', () => {
            if (this.shop.visible) return
            this.avatarEquiped.clearTint()
            this.changeAvatarbutton.visible = false
        })
    }
    addAvatarAndFrame() {
        if (!localStorage.getItem('avatar'))
            localStorage.setItem('avatar', "CasualAvatar_00");
        var avatarequip = localStorage.getItem('avatar')
        this.avatarEquiped = this.add.sprite(2.35 / 100 * config.width, 3.62 / 100 * config.height, 'avatars', avatarequip).setScale(0.16555).setOrigin(0, 0).setInteractive().setDepth(6)
        this.frame = this.add.rectangle(2.1 / 100 * config.width, 3.2 / 100 * config.height, 50, 50, 0xff0000).setDepth(5).setOrigin(0, 0).setAlpha(1)
        this.frame.setDisplaySize(this.avatarEquiped.width * 0.16555 + 0.5 / 100 * config.width, this.avatarEquiped.height * 0.16555 + 0.8 / 100 * config.height)
    }
    closeShop() {
        this.closeShopButton.visible = false
        this.changeAvatarbutton.visible = false
        this.shop.visible = false
        for (let i = 0; i < 7; i++) {
            // this.avatars[i]=this.add.sprite(29/100*config.width+7/100*config.width*i,30/100*config.height,"avatars").setFrame("CasualAvatar_0"+i).setScale(0.16555).setDepth(8)
            this.avatars[i].visible = false
            this.price[i].visible = false
        }
    }
    displayShop() {
        this.closeShopButton.visible = true
        this.closeShopButton.on('pointerover', () => {
            this.closeShopButton.setTint(0x808080)
        })
        this.closeShopButton.on('pointerout', () => {
            this.closeShopButton.clearTint()
        })
        this.closeShopButton.on('pointerdown', () => {
            this.DupMusic.play()
            this.closeShopButton.clearTint()
            this.closeShop()

        })
        this.closeShopButton.on('pointerup', () => {
            this.closeShopButton.clearTint()
        })

        //
        this.changeAvatarbutton.visible = false
        this.shop.visible = true

        for (let i = 0; i < 7; i++) {
            // this.avatars[i]=this.add.sprite(29/100*config.width+7/100*config.width*i,30/100*config.height,"avatars").setFrame("CasualAvatar_0"+i).setScale(0.16555).setDepth(8)
            this.avatars[i].visible = true
            this.price[i].visible = true
            this.avatars[i].on('pointerover', () => {
                if (this.hasBuy[i]) this.buyButton.setText("USE").setColor("yellow")
                else this.buyButton.setText("BUY").setColor("white")
                this.avatars[i].setTint(0x808080)
                this.buyButton.visible = true
                this.buyButton.setPosition(this.avatars[i].x - 1.1 / 100 * config.width, this.avatars[i].y)
            })
            this.avatars[i].on('pointerout', () => {
                this.avatars[i].clearTint()
                this.buyButton.visible = false
            })
            this.avatars[i].on('pointerdown', () => {
                this.DupMusic.play()
                this.avatars[i].clearTint()
                this.buyButton.visible = false
                if (this.hasBuy[i]) {

                    this.changeAvatar(i)
                    return
                }
                this.checkCanBuy(i * 10000, i)


            })
            this.avatars[i].on('pointerup', () => {
                this.avatars[i].clearTint()
                this.buyButton.visible = false
            })
        }

    }
    changeAvatar(_index) {
        this.avatarEquiped.setFrame("CasualAvatar_0" + _index)
        localStorage.setItem('avatar', "CasualAvatar_0" + _index);
    }
    checkCanBuy(_money, _index) {
        if (scoreCoin >= _money) {
            scoreCoin -= _money;
            this.money.setText("COIN : " + scoreCoin)
            localStorage.setItem('money', scoreCoin);
            this.hasBuy[_index] = true
            this.price[_index].setText("")
            localStorage.setItem('hasBuy', JSON.stringify(this.hasBuy));
            this.performPurchase(_index);
        } else {
        }
    }

    performPurchase(_index) {
        this.hasBuy[_index] = true;
    }
}