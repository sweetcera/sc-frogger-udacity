var Score = function  drawScore() {
    ctx.font = "italic bold 16px Roboto";
    ctx.fillStyle = "#0000";
    ctx.fillText("score: "+ player.score, 1, 100);
}

// Enemies our player must avoid
var Enemy = function(y,speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
    this.speed = Math.floor(Math.random() * 3 + 2);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x += this.speed;
    if(this.x > 500) {
        this.x = -100;
 }
}

function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++)

        if (allEnemies[i].x < player.x + 0 &&
            allEnemies[i].x + 30 > player.x
            && allEnemies[i].y < player.y + 10
            && allEnemies[i].y + player.y + 20)
        {
            player.reset();
            player.score -= 100;
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function() {

    this.sprite = 'images/char-cat-girl.png';
     this.x = 200;
     this.y = 405;
     this.width = 30;
     // movement sensetivity
     this.dx = 90;
     this.dy = 95;
     this.score = 0;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function() {
    // Sets player boundries and resets when finished!
    if (this.x > 400) {
        this.x = 400;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y > 400) {
        this.y = 400;
    } else if (this.y < 0) {
        this.y = 0
        alert("Winner!")
        player.score += 100;
        this.reset();
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
}

// Player movement keys
Player.prototype.handleInput = function(keys) {
    if ('up' === keys) {
        this.y -= this.dy;
    }
    if ('down' === keys) {
        this.y += this.dy;
    }
    if ('left' === keys) {
        this.x -= this.dx;
    }
    if ('right' === keys) {
        this.x += this.dx;
    }
};

var Gem = function (x, y) {
     this.sprite = 'images/gem-blue.png';
     this.x =  [2, 275, 300];
     this.y =  [200, 150, 80];

 }

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Gem.prototype.update = function () {
 this.x = Math.floor(Math.random() + 15);
 this.y = Math.floor(Math.random() + 13);

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(50);
var enemy2 = new Enemy(140);
var enemy3 = new Enemy(220);

var allEnemies = [enemy1, enemy2, enemy3];


var player = new Player();

var gem = new Gem ();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});