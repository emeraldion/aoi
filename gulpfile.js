/** @format */

'use strict';

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { src, dest, series, watch, parallel } from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import hologram from './gulp-hologram.js';
import livereload from 'gulp-livereload';
import * as http from 'http';
import st from 'st';

const sass = gulpSass(dartSass);
const __dirname = dirname(fileURLToPath(import.meta.url));

const DEST = './css';
const DIST = './dist';
const SASS_SOURCES = './sass/*.scss';
const STYLE_GUIDE_SOURCES = ['./sass/index.md', './doc_assets/*.html', './code_example_templates/*.erb'].concat([
	SASS_SOURCES
]);
const GENERATED_CSS = DEST + '/*.css';

function sassTask() {
	return src(SASS_SOURCES)
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(
			autoprefixer({
				cascade: false,
				remove: true // Remove cruft
			})
		)
		.pipe(dest(DEST));
}

function hologramTask(cb) {
	return src(STYLE_GUIDE_SOURCES)
		.pipe(hologram(cb))
		.pipe(livereload());
}

function minifyCssTask() {
	return src(GENERATED_CSS)
		.pipe(sourcemaps.init())
		.pipe(
			cleanCSS({ debug: true }, details => {
				console.log(`
file: ${details.name}
original: ${details.stats.originalSize}
minified: ${details.stats.minifiedSize}`);
			})
		)
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(DIST));
}

function serverTask(cb) {
	http.createServer(st({ path: join(__dirname), index: join('docs', 'index.html'), cache: false })).listen(8080, cb);
}

function watchTask() {
	livereload.listen({ port: 3456, basePath: __dirname });
	watch(SASS_SOURCES, sassTask);
	watch(STYLE_GUIDE_SOURCES, hologramTask);
	watch(GENERATED_CSS, minifyCssTask);
}

export {
	sassTask as sass,
	hologramTask as hologram,
	minifyCssTask as minifyCss,
	serverTask as server,
	watchTask as watch
};
export default series(sassTask, hologramTask, serverTask, watchTask);
