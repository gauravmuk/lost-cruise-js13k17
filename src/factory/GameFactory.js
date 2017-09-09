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
        for (var i = 0; i < 10; i++) {
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
        GameFactory.ship.update();
    },
    paint: function () {
        this.background.paint();
        this.ship.paint();
        this.paintWalls();
        this.collisionManager.wallBulletCollision();
        this.collisionManager.shipWallCollision();
        this.validateWalls();
    },
    initCollisionManager: function () {
        this.collisionManager = new CollisionManager();
    },
    initCamera: function () {
        this.camera = new Camera(GameFactory.ship.x, GameFactory.ship.y);
    },
    checkWallCount: function() {
      for (var i = 0; i < this.walls.length; i++) {
          if (!this.walls[i].alive) {
              this.walls.splice(i, 1);
          }
      }

      if (this.walls.length < 30) {
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
    viewPortWidth: window.innerWidth,
    viewPortHeight: window.innerHeight
};