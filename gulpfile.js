'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const hologram = require('./gulp-hologram');

const DEST = './css';
const DIST = './dist';
const SASS_SOURCES = './sass/*.scss';
const STYLE_GUIDE_SOURCES = [
  './sass/index.md',
  './doc_assets/*.html',
  './code_example_templates/*.erb'].concat([SASS_SOURCES]);
const GENERATED_CSS = DEST + '/*.css';

gulp.task('sass', () => {
  return gulp.src(SASS_SOURCES)
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      remove: true // Remove cruft
    }))
    .pipe(gulp.dest(DEST));
});

gulp.task('hologram', () => {
  return gulp.src(STYLE_GUIDE_SOURCES)
    .pipe(hologram());
});

gulp.task('minify-css', () => {
  return gulp.src(GENERATED_CSS)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({debug: true}, details => {
      console.log(`file: ${details.name}
  original: ${details.stats.originalSize}
  minified: ${details.stats.minifiedSize}`);
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST));
});

gulp.task('watch', () => {
  gulp.watch(SASS_SOURCES, ['sass']);
  gulp.watch(STYLE_GUIDE_SOURCES, ['hologram']);
  gulp.watch(GENERATED_CSS, ['minify-css']);
});

gulp.task('default', ['sass', 'hologram', 'watch']);
