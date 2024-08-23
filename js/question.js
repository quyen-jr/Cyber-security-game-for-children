var questions = [
    {
        question: "What is cyberbullying?",
        answers: ["A  Sending mean text messages or emails", "B  Posting hurtful comments online", "C  Spreading rumors or gossip through social media", "D  All of the above"],
        correctIndex: 3
    },
    {
        question: "Which of the following actions is considered cyberbullying?",
        answers: ["A  Sharing someone's private information without permission", "B  Complimenting a friend on social media", "C  Ignoring messages from a friend", "D  None of the above"],
        correctIndex: 0
    },
    {
        question: "What are the potential consequences of cyberbullying?",
        answers: ["A  Negative impact on mental health", "B  Damage to reputation", "C  Legal consequences", "D  None of the above"],
        correctIndex: 0
    },
    {
        question: "How can you protect yourself from cyberbullying?",
        answers: ["A  Avoid sharing personal information online", "B  Think twice before posting or sharing anything online", "C  Block or report cyberbullies", "D  None of the above"],
        correctIndex: 2
    },
    {
        question: "What should you do if you're being cyberbullied?",
        answers: ["A  Respond with insults or threats", "B  Keep the messages and tell no one", "C  Block the bully and report the behavior to a trusted adult", "D  None of the above"],
        correctIndex: 2
    },
    {
        question: "What is the first step you should take if you witness cyberbullying?",
        answers: ["A  Join in and support the bully", "B  Ignore the situation and pretend you didn't see anything", "C  Stand up for the victim and report the bullying to a trusted adult or authority", "D  None of the above"],
        correctIndex: 2
    },
    {
        question: "Why is cyberbullying harmful?",
        answers: ["A  It can lead to anxiety and depression", "B  It can damage relationships", "C  It can negatively affect academic performance", "D  None of the above"],
        correctIndex: 0
    },
    // add more question
];




class Question {
    constructor(_scene) {
        this.scene = _scene
        this.answerTexts = [];
        this.scoreText = null
        this.displayScore = false
        this.maxScore = 0;
        this.currentQuestionIndex = 0;
        this.scoreInital = 0
        this.questionText;
        this.hasCheckAnswer=false
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
        this.currentQuestionIndex=Math.floor(Math.random() * 6)
        this.displayQuestion(this.currentQuestionIndex);
        // restart 
        this.restart = this.scene.add.text(40 / 100 * config.width, 65 / 100 * config.height, "RESTART", { fontSize: '30px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5).setInteractive();
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
            this.scene.scene.restart();
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
        this.addButtonSupport()
      //  this.currentQuestionIndex
        var currentQuestion = questions[index];
        this.questionText.setText(currentQuestion.question);

        for (var i = 0; i < 4; i++) {
            this.answerTexts[i].setText(currentQuestion.answers[i]);
        }
    }

    checkAnswer(index) {
        if(this.hasCheckAnswer) return
        if(!this.hasCheckAnswer)
            this.hasCheckAnswer=true
        var currentQuestion = questions[this.currentQuestionIndex];
    //    console.log(currentQuestion.correctIndex+":  " + index)
        if (index === currentQuestion.correctIndex) {
            this.maxScore = 200;
            scoreCoin+=this.maxScore
            localStorage.setItem('money', scoreCoin);
            this.displayCorrectTable("CORRECT !  ")
            this.answerTexts.forEach(element => {
                element.destroy()
            });
            this.questionText.destroy()
            // Thêm các hoạt động khi đáp án đúng ở đây
        } else {
            this.maxScore = 100
            scoreCoin+=this.maxScore
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
        this.scene.add.text(40 / 100 * config.width, 100, _Text, { fontSize: '55px', fontFamily: 'Times New Roman', fill: 'white' }).setDepth(5);
    }
    displayScoreInTable() {
        if(this.supportButton)
         this.supportButton.visible=false
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
        var currentQuestion = questions[this.currentQuestionIndex];
        var index = 0
        var option1 = 0
      //  console.log(questions[this.currentQuestionIndex])
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