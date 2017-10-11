'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');

const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const prefix = require('gulp-autoprefixer');
const minifyCSS = require('gulp-clean-css');

const jshint = require('gulp-jshint');

const del = require('del');

gulp.task('clean', function() {
    return del([
        './dist/style/*',
        './dist/template/*'
    ]);
});

gulp.task('lint-client', () => {
    return gulp.src('./client/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('browserify-client', ['lint-client'], () => {
    return gulp.src(['client/index.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat('packagy.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', () => {
   gulp.watch('client/**/*.js', ['browerify-client']);
    gulp.watch(['client/*.html', 'client/template/**/*.html'], ['views']);
});

gulp.task('views', () => {
    //move the top level html files
    gulp.src('client/*.html')
        .pipe(gulp.dest('build/'));

    //move template files, preserve file structure
    gulp.src(['./client/template/**/*.html'], {
        base: './'
    })
        .pipe(gulp.dest('build/template'));
});



gulp.task('styles-css', () => {
   return gulp.src('client/style/*.css')
       .pipe(prefix({
           cascade: true
       }))
       .pipe(minifyCSS())
       .pipe(gulp.dest('build/style'));
});

gulp.task('uglify', ['browserify-client'], () => {
   return gulp.src('build/packagy.js')
       .pipe(uglify())
       .pipe(rename('packagy.min.js'))
       .pipe(gulp.dest('build/'));
});

gulp.task('build', ['views', 'uglify', 'styles-css']);

gulp.task('default', ['clean', 'build', 'watch']);