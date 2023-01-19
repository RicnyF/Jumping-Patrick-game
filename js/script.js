const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
const gravity = .30
const inAir = 0;
const speed = 4
let pom = 0
let characterPosition = 0
let timer = 0;
let gameover = false;
var mouse = {
    x: 0,
    y: 0
}
var score = 000
var maxScore = 0
class EndScreen {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
        this.width = canvas.width
        this.height = canvas.height
    }
    draw() {
        c.clearRect(0, 0, canvas.width, canvas.height)
        c.fillStyle = "black"
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.fillStyle = "white"
        c.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 210, 200, 140)
        c.font = "100px Comic Sans MS";
        c.fillStyle = "red";
        c.textAlign = "center";
        c.fillText("YOU WIN", canvas.width / 2, canvas.height / 2 - 300);
        c.font = "50px Comic Sans MS";
        c.fillStyle = "white";
        c.textAlign = "center";
        c.fillText("Wanna play again?", canvas.width / 2, canvas.height / 2);

        c.fillStyle = "white";
        c.textAlign = "center";
        c.fillText("Wanna play again?", canvas.width / 2, canvas.height / 2);
        c.fillStyle = "red";
        c.textAlign = "center";
        c.fillText("RESET", canvas.width / 2, canvas.height / 2 + 300);
        gameover = true
    }
}
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 100
        this.height = 100

        this.image = {
            right: new Image(),
            left: new Image()
        }
        this.image.right.src = "img/character.png"

        this.image.left.src = "img/character2.png"

    }
    draw() {

        if (characterPosition == 0) {
            c.drawImage(this.image.right, this.position.x, this.position.y, this.width, this.height)
        }
        if (characterPosition == 1) {
            c.drawImage(this.image.left, this.position.x, this.position.y, this.width, this.height)
        }




    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        }
    }
}



class Platform {

    constructor({
        x,
        y
    }) {

        this.position = {
            x,
            y
        }
        this.image = new Image(),
            this.image.src = "img/platform.png",

            this.width = 300
        this.height = 30
    }
    draw() {
        c.fillStyle = 'blue'

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}
class ScoreBoard {
    constructor() {
        this.position = {
            x: 180,
            y: 40
        }
    }
    draw() {
        c.font = "40px Comic Sans MS";
        c.fillStyle = "white";
        c.textAlign = "center";
        if (score < 0) {
            c.fillText('Score: 0000', 120, 40);
        } else {

            if (score < 10) c.fillText('Score: 000' + score, 120, 40);
            if (score < 100 && score >= 10) c.fillText('Score: 00' + score, 120, 40);
            if (score >= 100 && score < 1000) c.fillText('Score: 0' + score, 120, 40);
            if (score >= 1000) c.fillText('Score: ' + score, 120, 40);

        }
        if (maxScore == 0) {
            c.fillText('High Score: 0000', canvas.width - 200, 40);
        } else {
            if (maxScore < 10) c.fillText('High Score: 000' + maxScore, canvas.width - 200, 40);
            if (maxScore < 100 && maxScore >= 10) c.fillText('High Score: 00' + maxScore, canvas.width - 200, 40);
            if (maxScore >= 100 && maxScore < 1000) c.fillText('High Score: 0' + maxScore, canvas.width - 200, 40);
            if (maxScore >= 1000) c.fillText('High Score: ' + maxScore, canvas.width - 200, 40);
        }
    }
}
class Background {

    constructor({
        x,
        y
    }) {

        this.position = {
            x,
            y
        }
        this.image = new Image(),
            this.image.src = "img/background.png",

            this.width = 1920
        this.height = canvas.height
    }
    draw() {
        c.fillStyle = 'blue'

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}
class Finish {
    constructor({
        x,
        y
    }) {

        this.position = {
            x,
            y
        }
        this.image = new Image(),
            this.image.src = "img/finish.png",

            this.width = 100
        this.height = 300
    }
    draw() {
        c.fillStyle = 'blue'
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

let player = new Player()
let scoreboard = new ScoreBoard()
let platforms = [new Platform({
        x: 50,
        y: canvas.height - 420
    }), new Platform({
        x: -150,
        y: canvas.height - 420
    }),
    new Platform({
        x: 500,
        y: canvas.height - 650
    }), new Platform({
        x: 700,
        y: canvas.height - 650
    }), new Platform({
        x: 50,
        y: canvas.height - 120
    }), new Platform({
        x: 250,
        y: canvas.height - 120
    }), new Platform({
        x: 800,
        y: canvas.height - 120
    }), new Platform({
        x: 1500,
        y: canvas.height - 420
    }), new Platform({
        x: 1700,
        y: canvas.height - 420
    }), new Platform({
        x: 1900,
        y: canvas.height - 650
    }), new Platform({
        x: 2700,
        y: canvas.height - 420
    }), new Platform({
        x: 3200,
        y: canvas.height - 120
    }), new Platform({
        x: 3800,
        y: canvas.height - 420
    }), new Platform({
        x: 3800,
        y: canvas.height - 50
    }), new Platform({
        x: 4100,
        y: canvas.height - 220
    }), new Platform({
        x: 4400,
        y: canvas.height - 420
    }), new Platform({
        x: 4800,
        y: canvas.height - 220
    }), new Platform({
        x: 5100,
        y: canvas.height - 520
    }), new Platform({
        x: 5900,
        y: canvas.height - 120
    }), new Platform({
        x: 6300,
        y: canvas.height - 420
    }), new Platform({
        x: 6500,
        y: canvas.height - 650
    }), new Platform({
        x: 7300,
        y: canvas.height - 50
    }), new Platform({
        x: 7600,
        y: canvas.height - 220
    }), new Platform({
        x: 7800,
        y: canvas.height - 420
    }), new Platform({
        x: 8300,
        y: canvas.height - 220
    }), new Platform({
        x: 8400,
        y: canvas.height - 650
    }), new Platform({
        x: 8600,
        y: canvas.height - 420
    }), new Platform({
        x: 9000,
        y: canvas.height - 120
    }), new Platform({
        x: 9300,
        y: canvas.height - 420
    }), new Platform({
        x: 10100,
        y: canvas.height - 50
    }), new Platform({
        x: 10300,
        y: canvas.height - 50
    }), new Platform({
        x: 10700,
        y: canvas.height - 220
    }), new Platform({
        x: 10800,
        y: canvas.height - 650
    }), new Platform({
        x: 11200,
        y: canvas.height - 420
    }), new Platform({
        x: 11200,
        y: 150
    }), new Platform({
        x: 11800,
        y: canvas.height - 650
    }), new Platform({
        x: 12500,
        y: canvas.height - 420
    }), new Platform({
        x: 13200,
        y: canvas.height - 500
    }), new Platform({
        x: 13800,
        y: canvas.height - 650
    }), new Platform({
        x: 14300,
        y: canvas.height - 300
    }), new Platform({
        x: 15000,
        y: canvas.height - 500
    }), new Platform({
        x: 15300,
        y: canvas.height - 500
    }), new Platform({
        x: 15500,
        y: canvas.height - 500
    })
]

let finish = new Finish({
    x: 15400,
    y: canvas.height - 780
})
let endgame = new EndScreen
let background = [new Background({
    x: -1920,
    y: -1
}), new Background({
    x: 0,
    y: -1
}), new Background({
    x: 1920,
    y: -1
}, new Background({
    x: 3840,
    y: -1
}))]
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    down: {
        pressed: false
    }
}
let winCondition = 0;






function restart() {
    player.velocity.x = 0;
    player.velocity.y = 0;
    keys.left.pressed = false
    keys.right.pressed = false
    keys.down.pressed = false
    if (score > maxScore) maxScore = score
    score = 0
    scoreboard = new ScoreBoard()
    player = new Player()

    platforms = [new Platform({
            x: 50,
            y: canvas.height - 420
        }), new Platform({
            x: -150,
            y: canvas.height - 420
        }),
        new Platform({
            x: 500,
            y: canvas.height - 650
        }), new Platform({
            x: 700,
            y: canvas.height - 650
        }), new Platform({
            x: 50,
            y: canvas.height - 120
        }), new Platform({
            x: 250,
            y: canvas.height - 120
        }), new Platform({
            x: 800,
            y: canvas.height - 120
        }), new Platform({
            x: 1500,
            y: canvas.height - 420
        }), new Platform({
            x: 1700,
            y: canvas.height - 420
        }), new Platform({
            x: 1900,
            y: canvas.height - 650
        }), new Platform({
            x: 2700,
            y: canvas.height - 420
        }), new Platform({
            x: 3200,
            y: canvas.height - 120
        }), new Platform({
            x: 3800,
            y: canvas.height - 420
        }), new Platform({
            x: 3800,
            y: canvas.height - 50
        }), new Platform({
            x: 4100,
            y: canvas.height - 220
        }), new Platform({
            x: 4400,
            y: canvas.height - 420
        }), new Platform({
            x: 4800,
            y: canvas.height - 220
        }), new Platform({
            x: 5100,
            y: canvas.height - 520
        }), new Platform({
            x: 5900,
            y: canvas.height - 120
        }), new Platform({
            x: 6300,
            y: canvas.height - 420
        }), new Platform({
            x: 6500,
            y: canvas.height - 650
        }), new Platform({
            x: 7300,
            y: canvas.height - 50
        }), new Platform({
            x: 7600,
            y: canvas.height - 220
        }), new Platform({
            x: 7800,
            y: canvas.height - 420
        }), new Platform({
            x: 8300,
            y: canvas.height - 220
        }), new Platform({
            x: 8400,
            y: canvas.height - 650
        }), new Platform({
            x: 8600,
            y: canvas.height - 420
        }), new Platform({
            x: 9000,
            y: canvas.height - 120
        }), new Platform({
            x: 9300,
            y: canvas.height - 420
        }), new Platform({
            x: 10100,
            y: canvas.height - 50
        }), new Platform({
            x: 10300,
            y: canvas.height - 50
        }), new Platform({
            x: 10700,
            y: canvas.height - 220
        }), new Platform({
            x: 10800,
            y: canvas.height - 650
        }), new Platform({
            x: 11200,
            y: canvas.height - 420
        }), new Platform({
            x: 11200,
            y: 150
        }), new Platform({
            x: 11800,
            y: canvas.height - 650
        }), new Platform({
            x: 12500,
            y: canvas.height - 420
        }), new Platform({
            x: 13200,
            y: canvas.height - 500
        }), new Platform({
            x: 13800,
            y: canvas.height - 650
        }), new Platform({
            x: 14300,
            y: canvas.height - 300
        }), new Platform({
            x: 15000,
            y: canvas.height - 500
        }), new Platform({
            x: 15300,
            y: canvas.height - 500
        }), new Platform({
            x: 15500,
            y: canvas.height - 500
        })
    ]

    finish = new Finish({
        x: 15400,
        y: canvas.height - 780
    })
    background = [new Background({
        x: -1920,
        y: -1
    }), new Background({
        x: 0,
        y: -1
    }), new Background({
        x: 1920,
        y: -1
    }, new Background({
        x: 3840,
        y: -1
    }))]
    gameover = false


}


function animate() {
    requestAnimationFrame(animate)
    gameover == false
    c.clearRect(0, 0, canvas.width, canvas.height);
    background.forEach(background => {
        background.draw();
    })
    player.update();
    platforms.forEach(platform => {
        platform.draw()
    })
    finish.draw()
    scoreboard.draw()

    //pocitani vyhry
    if (keys.right.pressed) {
        score += 1


    }
    if (keys.left.pressed) {
        winCondition -= speed
        score -= 1
    }
    //posouvani charakteru
    if (keys.right.pressed && player.position.x < 700) {

        player.velocity.x = speed;

    } else if (keys.left.pressed && player.position.x > 600) {
        player.velocity.x = -speed


    } else {
        player.velocity.x = 0;
        // posouvani pozadi
        if (keys.right.pressed) {
            platforms.forEach(platform => {
                platform.position.x -= speed
            })
            background.forEach(background => {
                background.position.x -= 0.5
            })
            finish.position.x -= speed


        } else if (keys.left.pressed) {
            platforms.forEach(platform => {
                platform.position.x += speed

            })
            background.forEach(background => {
                background.position.x += 0.5
            })
            finish.position.x += speed

        }

    }

    //colize platform
    platforms.forEach(platform => {


        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width && keys.down.pressed == false) {
            player.velocity.y = 0
        }
    })
    if (player.position.y > canvas.height) {
        var audio = new Audio('sounds/death.mp3')
        audio.play();
        timer = 0;
        restart();

    }
    //vyhodnoceni vyhry

    if (player.position.x > finish.position.x && player.position.y > finish.position.y) {

        endgame.draw();
        player.velocity.x = 0
        player.velocity.y = 0
    }




}
animate();



//event listenery
addEventListener('click', function () {

    if (gameover == true && mouse.x > canvas.width / 2 - 100 && mouse.x < canvas.width / 2 + 100 && mouse.y > canvas.height / 2 + 210 && mouse.y < canvas.height / 2 + 360) {
        restart();
    }
})
addEventListener('mousemove', function (mouseHelp) {
    mouse.x = mouseHelp.x
    mouse.y = mouseHelp.y
})
addEventListener('keydown', ({
    keyCode
}) => {

    switch (keyCode) {
        case 65:
            //leftd
            if (gameover == false) {
                keys.left.pressed = true
                characterPosition = 1
            }
            break;
        case 83:
            //down
            if (gameover == false) {
                keys.down.pressed = true
            }
            break;
        case 68:
            //right
            if (gameover == false) {
                keys.right.pressed = true
                characterPosition = 0
            }
            break;

        case 87:
            //jump
            if (player.velocity.y == 0 && gameover == false) {
                player.velocity.y -= 15
                var audio = new Audio('sounds/jump.mp3')
                audio.play();
            }
            break;
    }

})
addEventListener('keyup', ({
    keyCode
}) => {
    switch (keyCode) {
        case 65:
            //left

            //nastaveni aby charakter po puštění klávesy ještě chvíli letěl
            if (gameover == false) {
                var i = speed,
                    interval = setInterval(function () {
                        player.velocity.x -= i * 2
                        i--;

                        if (i <= 0) clearInterval(interval);
                    }, 50);

                keys.left.pressed = false
            }
            break;

        case 83:
            //down
            if (gameover == false) {
                keys.down.pressed = false
            }
            break;
        case 68:
            //right
            if (gameover == false) {
                var i = speed,
                    interval = setInterval(function () {
                        player.velocity.x += i * 2
                        i--;

                        if (i <= 0) clearInterval(interval);
                    }, 50);

                keys.right.pressed = false
            }
            break;
        case 87:
            //jump

            break;
    }

})