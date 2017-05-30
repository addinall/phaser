//CAPTAIN SLOG
// vim: set expandtab tabstop=4 shiftwidth=4 autoindent smartindent:
// File         : whack-mohammed.html
// System       : Advanced HTML5 Game programming
// Date         : January 2016
// Author       : Mark Addinall
// Synopsis     : More experimentation using advanced HTML5 techniques.
//                This time using the Phaser JS library
//                Game1 is 90% from the tutorial that comes with the software.
//                I taught myself how to use this last night and decided
//                that the demos were fun, however, a game of
//                WHACK-THE-PROPHET would be a HOOT!

//---------------------------------------------------
allans_snackbar.game = function(game) { 

    var score = 0;
    var score_text;
    var prophet;
    var cursor;

    var player;
    var bullets;


//------------------
function move_mo() {

    var move = game.rnd.integerInRange(1, 3);               // random number 1:3
    if (move > 1) {                                         // do nothing if (1)
        var size = game.rnd.integerInRange(1, 10);          // random number 1:10
        prophet.scale.setTo( 1/size, 1/size);               // resize prophet reciprocal of size

        prophet.x = game.world.randomX;                     // and stick him somewhere
        prophet.y = game.world.randomY;                     // in space!
    }
}


//-----------------------------------
function whacked_him(prophet, bullet) {

    prophet.health--;
    score += 10;
    score_text.text = 'Score: ' + score +  '    Prophet Health:    ' + prophet.health;
    bullet.kill();

}




//---------------
function fire() {

    //alert(game.time.now);
    //alert(player.next_shot);
    if (game.time.now > player.next_shot) {
        var bullet = bullets.getFirstExists(false);
        if (bullet) {
            player.next_shot = game.time.now + player.rate_of_fire;
            bullet.reset(player.x, player.y);
            bullet.body.velocity.y = -900;
            bulletTime = game.time.now + 200;
            pistol.play();
        }
    }
}




}



//-----------------
allans_snackbar.game.prototype = {

    create: function() {

    document.body.style.cursor = 'none';                    // get rid of OS cursor and replace
                                                            // with a sprite


    game.physics.startSystem(Phaser.Physics.ARCADE);        // We're going to be using physics, so enable 
                                                            // the Arcade Physics system

    background = game.add.tileSprite(0, 0, 1000, 700, 'desert');                           
                                                            //  A simple background for our game

   
    prophet = game.add.sprite(0,                            // The prophet and its settings
                             0, 
                            'mo');                          // stick Mohammed in the game
    
    game.physics.arcade.enable(prophet);                    // We need to enable physics on the prophet
    
    prophet.body.bounce.y = 0.4;                            // Player physics properties. Give the little 
                                                            // guy a slight bounce.
    prophet.body.gravity.y = 250;                           // arbitary 'massiness' falling speed mainly.  I know.....
    prophet.body.collideWorldBounds = true;
    prophet.health = 500;                                   // extra points for wasting the prick    

    player = game.add.sprite(100,500,'sight');              // this is us, gungight aiming point
    player.started = game.time.now;                         // started time from thread launch
    player.game_time = 500000;                              // milliseconds to end of game
    player.bounce_rate = 1.2;                               // scale between bounces, this
                                                            // gets harder per level up
    player.next_shot = game.time.now                        // next timed shot available
    player.rate_of_fire = 300;                              // pew!  pew!!  NOT
                                                            // pewpewpewpewpewpewpewpewpewepwewp!!!!

    bullets = game.add.group();                             // bullets are a group of 'bullet'
    bullets.enableBody = true;                              // they use physics so enable body
    bullets.physicsBodyType = Phaser.Physics.ARCADE;        // wot he just sed()
    bullets.createMultiple(30, 'bullet', 0, false);         // 30 in a clip
    bullets.setAll('anchor.x', 0.5);                        // anchor to my gunsight
    bullets.setAll('anchor.y', 0.5);                        // ditto
    bullets.setAll('checkWorldBounds', true);               // see if we leave the yooniverse
    bullets.setAll('outOfBoundsKill', true);                // if so, kill me


    pistol = game.add.audio('pistol');                      // pew!  pew!!

    score_text = game.add.text(16, 16, 'score: 0',          // ad a score, top left
            { fontSize: '32px', fill: '#000' });


    game.time.events.loop(Phaser.Timer.SECOND * 1.2,
                     move_mo, game);                        // jump Mphammed around and
                                                            // change sprite size
},

//------------------
    update: function() {

    // this is really the animation loop we used to code in vanilla Javascript games
    // as the setInterval function


    player.x = game.input.x;                    // make the gunsight follow the x,y
    player.y = game.input.y;                    // of the invisible cursor

    game.physics.arcade.overlap(bullets,        // tell the physics engine
                                prophet,        // that the prophet, and the
                                whacked_him,    // bullets will interact when
                                null, this);    // they meet. via whacked_him()

    if (game.input.activePointer.isDown) {      // pressed the go button?
        fire()                                  // pew!!!!
    }
}

}

