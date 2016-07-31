// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass'); //using compass instead, so remove later
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var compass = require('gulp-compass');

// Lint Task
gulp.task('lint', function () {
    return gulp.src('components/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass using Compass
gulp.task('compass', function () {
    return gulp.src('components/sass/style.scss')
        .pipe(compass({
        sass: 'components/sass',
        image: 'builds/development/images',
        style: 'expanded'
    }))
        .pipe(gulp.dest('builds/development/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src('builds/development/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('builds/production/js'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('components/scripts/*.js', ['lint', 'scripts']);
    gulp.watch('components/sass/*.scss', ['compass']);
});

// Default Task
//gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
gulp.task('default', ['lint', 'compass', 'watch']);