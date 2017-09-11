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
        grd.addColorStop(0, '#02b0ea');
        grd.addColorStop(1, '#2d72da');

        ctx.fillStyle = grd;

        ctx.fillRect(0, 0, this.viewPortWidth, this.viewPortHeight);

        this.state = 'INTRO';
        ctx.font = '96px p';
        ctx.fillStyle = '#8AC926';

        var currentText = 'Lost Cruise';
        textWidth = ctx.measureText(currentText).width;
        ctx.fillText(currentText, canvas.width / 2 - textWidth / 2, 100);

        ctx.fillStyle = '#FFCA3A';
        ctx.font = '20px p';

        currentText = 'How to play:';
        ctx.fillText(currentText, canvas.width / 2 - ctx.measureText(currentText).width / 2, 150);
        currentText = 'Right Arrow to Accelerate';
        ctx.fillText(currentText, canvas.width / 2 - ctx.measureText(currentText).width / 2, 200);
        currentText = 'Left Arrow to Slow Down(Disabled)';
        ctx.fillText(currentText, canvas.width / 2 - ctx.measureText(currentText).width / 2, 250);
        currentText = 'Up Arrow to Bubble Up';
        ctx.fillText(currentText, canvas.width / 2 - ctx.measureText(currentText).width / 2, 300);
        currentText = 'Down Arrow to Sink';
        ctx.fillText(currentText, canvas.width / 2 - ctx.measureText(currentText).width / 2, 350);
        currentText = 'Space Button shoots bullets';
        ctx.fillText(currentText, canvas.width / 2 - ctx.measureText(currentText).width / 2, 400);

        ctx.fillStyle = '#D64933';
        ctx.font = '30px p';
        currentText = 'Break Walls To Find Portals!';
        ctx.fillText(currentText, canvas.width / 2 - ctx.measureText(currentText).width / 2, 450);
        currentText = 'Black Portal reveals the LOST WORLD :D';
        ctx.fillText(currentText, canvas.width / 2 - ctx.measureText(currentText).width / 2, 500);
        currentText = 'Green Portal allows the use of magical left arrow to ease the game :P';
        ctx.fillText(currentText, canvas.width / 2 - ctx.measureText(currentText).width / 2, 550);
        currentText = 'ENTER Key starts the game, BEGIN!';
        ctx.fillText(currentText, canvas.width / 2 - ctx.measureText(currentText).width / 2, 600);
        ctx.fill();
    },
    viewPortWidth: window.innerWidth,
    viewPortHeight: window.innerHeight
};