'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');

const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

const prefix = require('gulp-autoprefixer');
const minifyCSS = require('gulp-clean-css');

const jshint = require('gulp-jshint');

const del = require('del');
const pump = require('pump');

gulp.task('clean', function() {
    return del.sync([
        './dist/style/*',
        './dist/template/*',
        '/dist/*'
    ]);
});

gulp.task('lint-client', () => {
    return gulp.src('./client/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('browserify-client', ['lint-client'], (cb) => {
    pump([
        gulp.src(['client/index.js']),
        browserify(
            {
            insertGlobals: true,
            debug: true
        }),
        babel({presets: ['es2015']}),
        concat('packagy.min.js'),
        //uglify(),
        gulp.dest('build/')
    ], cb);
});

gulp.task('watch', () => {
    gulp.watch('client/**/*.js', ['browserify-client']);
    gulp.watch(['client/*.html', 'client/template/**/*.html'], ['views']);
    gulp.watch('client/**/*.css', ['styles-css']);
    gulp.watch('client/style/assets/*', ['assets']);
});

gulp.task('views', () => {
    //move the top level html files
    gulp.src('client/*.html')
        .pipe(gulp.dest('build/'));

    //move template files, preserve file structure
    gulp.src(['./client/template/**/*.html'], {
        base: './client/template/'
    })
        .pipe(gulp.dest('build/template'));
});

gulp.task('module-css', () => {
    return gulp.src('./node_modules/angular-material/angular-material.min.css')
        .pipe(gulp.dest('build/style'));
});

gulp.task('styles-css', ['module-css'] ,() => {
   return gulp.src('client/style/*.css')
       .pipe(prefix({
           cascade: true
       }))
       .pipe(minifyCSS())
       .pipe(gulp.dest('build/style'));
});

gulp.task('assets', () => {
    return gulp.src('client/style/assets/*')
       .pipe(gulp.dest('build/style/assets'));  
})



gulp.task('build', ['views', 'browserify-client', 'styles-css', 'assets']);

gulp.task('default', ['clean', 'build', 'watch']);