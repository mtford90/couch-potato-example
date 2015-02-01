var gulp = require('gulp'),
    browserify = require('browserify'),
    connect = require('gulp-connect'),
    open = require('open'),
    reactify = require('reactify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    mocha = require('gulp-mocha'),
    source = require('vinyl-source-stream');

var PUBLIC_BUILD_DIR = './public/build',
    CSS_DIR = PUBLIC_BUILD_DIR + '/css',
    SRC_DIR = './public/src',
    JS_SRC = ['src/**/*.js', 'src/**/*.jsx'],
    APP_ROOT = SRC_DIR + '/app.jsx',
    APP_BUNDLE = 'app.js';


gulp.task('build', ['sass', 'fonts'], function () {
    var b = browserify({debug: true});
    b.transform(reactify);
    b.add(APP_ROOT);
    return b.bundle()
        .pipe(source(APP_BUNDLE))
        .pipe(gulp.dest(PUBLIC_BUILD_DIR))
        .pipe(connect.reload());
});


gulp.task('sass', function () {
    gulp.src('./public/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(CSS_DIR))
        .pipe(connect.reload());
});

gulp.task('fonts', function () {
    gulp.src('./public/fonts/**/*')
        .pipe(gulp.dest('./public/build/fonts'))
        .pipe(connect.reload());
});

gulp.task('watch', ['build'], function () {
    connect.server({
        root: './public/',
        host: 'localhost',
        port: 7683,
        livereload: {
            port: 6598
        }
    });
    open('http://localhost:7683/');
    gulp.watch(JS_SRC.concat(['index.html']), ['build']);
    gulp.watch(['scss/**/*.scss'], ['sass']);
    gulp.watch(['fonts/**/*'], ['fonts'])
});

