var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
    return gulp.src([
        'lib/jsfxr.js',
        'src/events/Keyboard.js',
        'src/utils/Utils.js',
        'src/model/Camera.js',
        'src/model/Bullet.js',
        'src/model/Wall.js',
        'src/model/Ship.js',
        'src/model/Background.js',
        'src/factory/GameFactory.js',
        'src/paint/CollisionManager.js',
        'src/paint/WallsController.js',
        'src/paint/AnimationFrameController.js',
        'src/GameMaker.js'
    ])
        .pipe(concat('ship.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});