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
        this.state = 'INTRO';
        ctx.font = '24px serif';
        ctx.fillText('Lost Cruise', 100, 100);
        ctx.fillText('Keys:', 100, 150);
        ctx.fillText('Right Arrow -> Accelerate', 100, 200);
        ctx.fillText('Left Arrow -> Slow Down(Disabled)', 100, 250);
        ctx.fillText('Up Arrow -> Bubble Up', 100, 300);
        ctx.fillText('Down Arrow -> Sink', 100, 350);
        ctx.fillText('Break Walls To Find Portals!', 100, 400);
        ctx.fillText('Black Portal reveals the LOST WORLD :D', 100, 450);
        ctx.fillText('Green Portal allows the use of magical left arrow to ease the game :P', 100, 500);
        ctx.fillText('ENTER Key starts the game', 100, 550);
    },
    viewPortWidth: window.innerWidth,
    viewPortHeight: window.innerHeight
};