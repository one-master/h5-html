var RootPath = './';

var baseJsList = [
    RootPath+'gamecq.js',
]


baseJsList.concatName = 'resultgamge.js'; //输出文件名称
baseJsList.distPath = 'dist/'; //输出文件目录

var gulp = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del');



gulp.task('baseJs', function() {
    return gulp.src(baseJsList)
        .pipe(concat(baseJsList.concatName)) //
        .pipe(gulp.dest(baseJsList.distPath)) //输出base-all.js到文件夹
        .pipe(rename({suffix: '.min'}))//rename压缩后的文件名
        .pipe(uglify()) //压缩
        .pipe(gulp.dest(baseJsList.distPath)); //输出
});




gulp.task('default',['baseJs']);
