var gulp         = require('gulp');

var scss         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss    = require('gulp-minify-css');

var concat       = require('gulp-concat');

var path = {
    scss : 'resourses/scss/',
    css  : 'dest/css/',
    js   : {
        app  : 'resourses/js/',
        dest : 'dest/js/'
    }
};

/*
* CSS task
* */

gulp.task('scss', function () {
    return gulp.src( path.scss + '*.scss' )
        .pipe( scss().on('error', scss.logError) )
        .pipe( gulp.dest( 'dest/css/' ) )
});

gulp.task('combine-css', ['scss'], function() {
    return gulp.src(path.css + 'style.css')
        .pipe(autoprefixer({
            browsers: [
                'last 5 version',
                'IE > 9'
            ],
            cascade: false
        }))
        .pipe( minifyCss() )
        .pipe(gulp.dest( path.css ));
});

/*
* JavaScript task
* */

gulp.task('build-app-js', function () {
   return gulp.src([
       path.js.app + 'script.js',
       path.js.app + 'app.js'
   ])
       .pipe(concat('app.js'))
       .pipe(gulp.dest(path.js.dest));
});

gulp.task('watch', function() {
    gulp.watch(path.scss + '**/*.scss', ['combine-css']);
    gulp.watch(path.js.app + '**/*.js', ['build-app-js']);
});

gulp.task('default', ['watch', 'combine-css', 'build-app-js']);

