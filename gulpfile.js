'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const hologram = require('./gulp-hologram');

const SOURCES = './sass/*.scss';
const DEST = './css';

gulp.task('default', ['sass', 'watch']);

gulp.task('sass', () => {
  gulp.src(SOURCES)
    .pipe(hologram())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      remove: true // Remove cruft
    }))
    .pipe(gulp.dest(DEST));
});

gulp.task('watch', () => {
	gulp.watch(SOURCES, ['sass']);
});
