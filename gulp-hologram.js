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

import gutil from 'gulp-util';
import map from 'map-stream';
import { spawn } from 'child_process';

/**
 * Facade/Plugin for compiling Hologram as a stream
 * @param task
 * @param taskCallback
 * @returns {*}
 */
export default function(taskCallback) {
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
}
