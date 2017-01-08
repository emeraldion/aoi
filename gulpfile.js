'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const hologram = require('./gulp-hologram');

const SASS_SOURCES = './sass/*.scss';
const STYLE_GUIDE_SOURCES = './doc_assets/*.html';
const DEST = './css';

gulp.task('default', ['sass', 'hologram', 'watch']);

gulp.task('sass', () => {
  gulp.src(SASS_SOURCES)
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      remove: true // Remove cruft
    }))
    .pipe(gulp.dest(DEST));
});

gulp.task('hologram', () => {
  gulp.src(STYLE_GUIDE_SOURCES)
    .pipe(hologram());
});

gulp.task('watch', () => {
	gulp.watch([STYLE_GUIDE_SOURCES, SASS_SOURCES], ['sass', 'hologram']);
});
