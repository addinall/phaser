// CAPTAIN SLOG
// vim: set expandtab tabstop=4 shiftwidth=4 autoindent smartindent:
// File         : boot.js
// System       : Advanced HTML5 Game programming
// Date         : January 2016
// Author       : Mark Addinall
// Synopsis     : More experimentation using advanced HTML5 techniques.
//                This time using the Phaser JS library
//                Game1 is 90% from the tutorial that comes with the software.
//                I taught myself how to use this last night and decided
//                that the demos were fun, however, a game of
//                WHACK-THE-PROPHET would be a HOOT!
//
//                This is the bootloader for the game.  It creates a new
//                game object and injects it into the HTML DOM.
//                It also sets the games 'states' in advance.

var alans_snackbar = {};

//-------------------------------------
alans_snackbar.boot = function (game) {

};


//-------------------------------
alans_snackbar.boot.prototype = {

    init: function () {

        // Unless you specifically know your game needs to support multi-touch 
        // I would recommend setting this to 1
        this.input.maxPointers = 1;

        // Phaser will automatically pause if the browser tab the game is in 
        // loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            // If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            // Same goes for mobile settings.
            // In this case we're saying "scale the game, no lower than 
            // 480x260 and no higher than 1024x768"

            this.scale.scaleMode                = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape           = true;
            this.scale.pageAlignHorizontally    = true;
        }

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'assets/splash/snackbar.png');
        this.load.image('preloaderBar', 'assets/splash/loading.png');

    },

    create: function () {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('preloader');

    }

};




//--------------------------
window.onload = function() {

    //--------------------------------------------------------------
    var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'game_here');

    game.state.add('boot', alans_snackbar.boot);
    game.state.add('preloader', alans_snackbar.preloader);
    game.state.add('mainmenu', alans_snackbar.mainmenu);
    game.state.add('game', alans_snackbar.game);

    game.state.start('boot');

}

