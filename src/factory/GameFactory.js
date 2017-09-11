var GameFactory = {
    addCanvas: function (entity) {
        canvas = entity;
        this.addCtx();
    },
    addCtx: function () {
        ctx = canvas.getContext('2d');
    },
    addBackground: function () {
        this.background = new Background();
    },
    addShip: function () {
        this.ship = new Ship();
    },
    addWalls: function () {
        for (var i = 0; i < 20; i++) {
            this.walls = this.walls || [];
            this.walls.push(new Wall());
        }
    },
    paintWalls: function () {
        for (var i = 0; i < this.walls.length; i++) {
            this.walls[i].paint();
        }
    },
    update: function () {
        if (this.state !== 'INTRO') {
            GameFactory.ship.update();
        }
    },
    paint: function () {
        if (this.state === 'INTRO' && keys[13]) {
            this.state = 'RUNNING';
            bootstrap();
        }

        if (this.state === 'RUNNING') {
            this.background.paint();
            this.ship.paint();
            this.paintWalls();
            this.collisionManager.wallBulletCollision();
            this.collisionManager.shipWallCollision();
            this.validateWalls();
        }
    },
    initCollisionManager: function () {
        this.collisionManager = new CollisionManager();
    },
    initCamera: function () {
        this.camera = new Camera(GameFactory.ship.x, GameFactory.ship.y);
    },
    checkWallCount: function () {
        for (var i = 0; i < this.walls.length; i++) {
            if (!this.walls[i].alive) {
                this.walls.splice(i, 1);
            }
        }

        if (this.walls.length < 20) {
            this.walls.push(new Wall({isMovementHappening: true}));
        }
    },
    validateWalls: function () {
        for (var i = 0; i < this.walls.length; i++) {
            if (this.walls[i].x < 0) {
                this.walls[i].alive = false;
                this.checkWallCount();
            } else if (this.walls[i].x < 50) {
                this.checkWallCount();
            }
        }
    },
    setLostMode: function () {
        this.isLost = true;
        this.ship.isLost = true;
        for (var i = 0; i < this.walls.length; i++) {
            this.walls[i].isLost = true;
        }
    },
    undoPortalMode: function () {
        this.isLost = false;
        this.ship.isLost = false;
        for (var i = 0; i < this.walls.length; i++) {
            this.walls[i].isLost = false;
        }
    },
    activateReverseMode: function () {
        var self = this;
        self.reverseMode = true;
        setTimeout(function () {
            self.reverseMode = false;
        }, 5000);
    },
    state: 'RUNNING',
    score: 0,
    introScreen: function () {
        var textWidth;


        var grd = ctx.createRadialGradient(this.viewPortWidth / 2, this.viewPortHeight / 2, 10, this.viewPortWidth / 2, this.viewPortHeight / 2, 500);
        grd.addColorStop(0, '#1B1F3B');
        grd.addColorStop(1, '#B14AED');

        ctx.fillStyle = grd;

        ctx.fillRect(0, 0, this.viewPortWidth, this.viewPortHeight);

        this.state = 'INTRO';
        ctx.font = '96px p';
        ctx.fillStyle = '#18206F';
        textWidth = ctx.measureText('Lost Cruise').width;
        ctx.fillText('Lost Cruise', canvas.width / 2 - textWidth / 2, 100);

        ctx.fillStyle = '#D138BF';
        ctx.font = '20px p';
        ctx.fillText('How to play:', canvas.width / 2 - ctx.measureText('How to play:').width / 2, 150);
        ctx.fillText('Right Arrow for Accelerate', canvas.width / 2 - ctx.measureText('Right Arrow for Accelerate').width / 2, 200);
        ctx.fillText('Left Arrow for Slow Down(Disabled)', canvas.width / 2 - ctx.measureText('Left Arrow for Slow Down(Disabled)').width / 2, 250);
        ctx.fillText('Up Arrow for Bubble Up', canvas.width / 2 - ctx.measureText('Up Arrow for Bubble Up').width / 2, 300);
        ctx.fillText('Down Arrow for Sink', canvas.width / 2 - ctx.measureText('Down Arrow for Sink').width / 2, 350);
        ctx.fillText('Space Button shoots bullets', canvas.width / 2 - ctx.measureText('Space Button shoots bullets').width / 2, 400);

        ctx.fillStyle = '#320A28';
        ctx.font = '30px p';
        ctx.fillText('Break Walls To Find Portals!', canvas.width / 2 - ctx.measureText('Break Walls To Find Portals!').width / 2, 450);
        ctx.fillText('Black Portal reveals the LOST WORLD :D', canvas.width / 2 - ctx.measureText('Black Portal reveals the LOST WORLD :D').width / 2, 500);
        ctx.fillText('Green Portal allows the use of magical left arrow to ease the game :P', canvas.width / 2 - ctx.measureText('Green Portal allows the use of magical left arrow to ease the game :P').width / 2, 550);
        ctx.fillText('ENTER Key starts the game, BEGIN!', canvas.width / 2 - ctx.measureText('ENTER Key starts the game, BEGIN!').width / 2, 600);
        ctx.fill();
    },
    viewPortWidth: window.innerWidth,
    viewPortHeight: window.innerHeight
};