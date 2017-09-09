var WallsController = {
  decideWallXPosition: function (shiftDelta) {
      return randomNumber(GameFactory.ship.x + GameFactory.ship.width + shiftDelta, GameFactory.viewPortWidth);
  }
};