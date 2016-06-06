// Use Strict Mode
'use strict';
// An Array that hold the different avatars for our player to choose from
var avatar = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-pink-girl.png',
        'images/char-horn-girl.png',
        'images/char-princess-girl.png'
        ];

// The length of the steps the player take with each key stroke.
var player_move_x = 101;
var player_move_y = 85;

// Setting Y and X coordinates for our canvas grid.
var CONSTANT_VALUE_Y = [125,205,290,370];
var CONSTANT_VALUE_X = [1, 101, 202, 303, 404, 505, 606, 707];

// New Game Boolean
var newGame = true;
var playerIsAlive = true;
var avatarIndex;

// Setting the different speed levels of enemies
var enemySpeed = [];
function gameLevel(a, b) {
    for (var i = a; i  < b; i = i + 15) {
        enemySpeed.push(i);
    }
    return enemySpeed;
}

// Declaring the variable numOfGems which will hold the number of gems collected by the player.
var numOfGems = 0;
var highScore = localStorage.getItem('highScore') || 0;

// The number of enemies in the game, you can change this to change the difficuilty of the game.
var numOfEnemies = 5;

// A function that returns a random value from an array.
function randomizer(array) {
    return array[Math.floor(Math.random() * array.length)];
}

//This function is going to collect the gems and increase game difficulty/speed accordingly.
function collectGem() {
    numOfGems = numOfGems + 1;
    if (numOfGems > highScore) {
        highScore = numOfGems;
        localStorage.setItem('highScore', highScore);
    }
    if (numOfGems < 5) {
        gem.resetPosition();
    }
    else if (numOfGems < 10) {
        gem.resetPosition();
        gameLevel(400, 600);
    }
    else if (numOfGems < 15) {
        gem.resetPosition();
        gameLevel(600, 800);
    }
    else if (numOfGems < 20) {
        gem.resetPosition();
        gameLevel(800, 1000);

    }
    else {
        gem.resetPosition();
    }
}
// A function to reset the game once the new game button is clicked.
function resetGame() {
    numOfGems = 0;
    allEnemies = [];
    enemySpeed = [];
    gameLevel(100, 400);
    createEnemies(numOfEnemies);
    player.x = 0;
    player.y = 460;
    gem.x = randomizer(CONSTANT_VALUE_X);
    gem.y = randomizer(CONSTANT_VALUE_Y);
    playerIsAlive = true;
}
// Gems that our player will collect to win the game!
var Gem = function() {
    this.sprite = 'images/Gem-Orange.png';
    this.x = randomizer(CONSTANT_VALUE_X);
    this.y = randomizer(CONSTANT_VALUE_Y);
};

Gem.prototype.update = function(dt) {

};
Gem.prototype.resetPosition = function() {
    this.x = randomizer(CONSTANT_VALUE_X);
    this.y = randomizer(CONSTANT_VALUE_Y);
};
Gem.prototype.hide = function() {
    this.x = -1000;
    this.y = -1000;
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -20; // enemies starts moving from the left side of the canvas.
    this.y = randomizer(CONSTANT_VALUE_Y);
    this.speed = randomizer(enemySpeed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 808) {
        this.x = -100;
        this.y = randomizer(CONSTANT_VALUE_Y);
        this.speed = randomizer(enemySpeed);
    }
    this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Declaring our Player class.
var Player = function() {
    this.sprite = 'images/char-cat-girl.png'; // Default Avatar to load the player!
    //Intiail poisiton of the created player
    this.x = 0;
    this.y = 460;
};

Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;
};
// A method called when the player is dead.
Player.prototype.killed = function(dt) {
    playerIsAlive = false;
    allEnemies.forEach(function(enemy) {
        enemy.speed = 0;
        });
    showMenu();
};

Player.prototype.stepIntoWater = function () {
    numOfGems = numOfGems - 1;
    this.y = this.y - player_move_y + 10;
    if (numOfGems < 0) {
        this.killed();
    }
    else {
       this.y = 460;
    }
}

Player.prototype.handleInput = function(key) {
    if (playerIsAlive) {
        switch(key) {
        case "up":
            if (this.y > 150) {
                this.y = this.y - player_move_y;
            }
            else {
               //Player is Going to step into the water, which should send them into water and lose them one Gem
               this.stepIntoWater();
            }
            break;
        case "down":
            if (this.y > 400) {
                // Don't Move
            }
            else {
                this.y = this.y + player_move_y;
            }
            break;
        case "left":
            if (this.x > 0) {
                this.x = this.x - player_move_x;
            }
            else {
                this.x = 700;
            }
            break;
        case "right":
            if (this.x > 610) {
               this.x = 0;
            }
            else {
                this.x = this.x + player_move_x;
            }
            break;
        case "space":
            resetGame();
         }
    }
    else {
        // Do nothing!
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// createEnemies() is Function that instantiates Multiple enmeies depending on the level
// And push them to the allEnemies Array.
// Parameter a is the number of enemies, that could be set when calling the function.
var allEnemies = [];
function createEnemies(a) {
    for (var i = 0; i < a; i++) {
        var enemy = new Enemy();
        allEnemies.push(enemy);
    }
}

// instantiate our objects.
var player = new Player();
var gem = new Gem();
createEnemies(numOfEnemies);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * Load the main menu
 */

/**
 * Show the main menu after loading all assets
 */
function showMenu() {
        if(newGame) {
            $('#main').show();
        }
        else {
            $('#end').show();
        }
}

// A function so the player can select his favorite avatar
function setAvatar(index){
    newGame = false;
    avatarIndex = index;
    player.sprite = avatar[index];
}
/**
 * Click handlers for the  menu screens
 */
$('.boy').click(function() {
    setAvatar(0);
    resetGame();
  $('#main').hide();
});
$('.cat').click(function() {
    setAvatar(1);
    resetGame();
  $('#main').hide();
});
$('.pink').click(function() {
    setAvatar(2);
    resetGame();
  $('#main').hide();
});
$('.horn').click(function() {
    setAvatar(3);
    resetGame();
  $('#main').hide();
});
$('.princess').click(function() {
    setAvatar(4);
    resetGame();
  $('#main').hide();
});

$('.play').click(function() {
  resetGame();
  $('#end').hide();
});
$('.select').click(function() {
    newGame = true;
    $('#end').hide();
    showMenu();
});