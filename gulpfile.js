// 2017-07-06
//1. gulp rename 이 필요함
// npm install gulp-rename
//2. gulp browserSync 가 필요함.
// npm install browser-sync gulp --save-dev (https://browsersync.io/docs/gulp)

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var  imagemin = require('gulp-imagemin');
var sassPaths = [
];
var config = {
    srcPath : 'src/',
    desPath : 'dist/assets/'
};
//compile sass
gulp.task('sass', function () {
    return gulp.src(config.srcPath+'scss/app.scss')
        .pipe($.sass({
                includePaths: sassPaths,
                outputStyle: 'nested' // nested,compressed
            })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('dist/assets/css'));
});
gulp.task('imagemin', () =>
	gulp.src(config.srcPath + 'images/*')
		.pipe(imagemin())
		.pipe(gulp.dest(config.desPath + 'images'))
);
gulp.task('scripts', function () {
    var jsFiles = config.srcPath  + 'js/**/*.js',
        jsDest = config.desPath + 'js';
    return gulp.src(jsFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
gulp.task('default', ['sass'], function () {
    browserSync.init({
        server: "./"
    });
    gulp.watch(['src/scss/**/*.scss'], ['sass']);
    gulp.watch(['dist/assets/css/*.css', '*.html']).on('change', browserSync.reload);
});
