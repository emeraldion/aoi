/** @format */

'use strict';

/*
Adapted from https://gist.github.com/jchild3rs/470be49a4bc4caf3ca8a

// Usage: 
gulp.task('docs', function(cb) {
  gulp.src('path/to/your/src')
    .pipe(hologram(cb));
});
*/

const gulp = require('gulp');
const notify = require('gulp-notify');
const gutil = require('gulp-util');
const map = require('map-stream');
const spawn = require('child_process').spawn;

/**
 * Facade/Plugin for compiling Hologram as a stream
 * @param task
 * @param taskCallback
 * @returns {*}
 */
module.exports = function(taskCallback) {
	// (child-process.spawn implementation)
	return map(file => {
		const args = ['./hologram_config.yml'];
		const hologram = spawn('hologram', args, { stdio: 'inherit' });

		hologram
			// Print hologram stdout to log.
			.on('data', data => gutil.log(data.toString().trim()))
			// Handle end of command execution.
			.on('close', code => {
				let error;
				if (code && 0 !== code) {
					error = new gutil.PluginError('hologram', 'Hologram failed with error code: ' + code);
				}
				if (typeof taskCallback === 'function') {
					taskCallback(error, file);
				}
			});
	});
};
