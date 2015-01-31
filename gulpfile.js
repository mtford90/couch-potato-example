var gulp = require('gulp'),
    browserify = require('browserify'),
    connect = require('gulp-connect'),
    open = require('open'),
    reactify = require('reactify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    mocha = require('gulp-mocha'),
    source = require('vinyl-source-stream');


gulp.task('build', ['sass', 'fonts'], function () {
    var b = browserify({debug: true});
    b.transform(reactify);
    b.add('./src/app.jsx');
    return b.bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload());
});

gulp.task('fonts', function () {
    gulp.src('./fonts/**/*')
        .pipe(gulp.dest('./build/fonts'))
        .pipe(connect.reload());
});

gulp.task('watch', ['build'], function () {
    connect.server({
        host: 'localhost',
        port: 7683,
        livereload: {
            port: 6598
        }
    });
    open('http://localhost:7683/');
    gulp.watch(['src/**/*.js', 'src/**/*.jsx', 'index.html'], ['build']);
    gulp.watch(['scss/**/*.scss'], ['sass']);
    gulp.watch(['fonts/**/*'], ['fonts'])
});

