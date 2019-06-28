'use strict';
const ansiEscapes = require('ansi-escapes');
const supportsHyperlinks = require('supports-hyperlinks');

const terminalLink = (text, url, {target = 'stdout', ...options} = {}) => {
	if (!supportsHyperlinks[target]) {
		return options.fallback ? options.fallback(text, url) : `${text} (${url})`;
	}

	return ansiEscapes.link(text, url);
};

module.exports = (text, url, options = {}) => terminalLink(text, url, options);

module.exports.stderr = (text, url, options = {}) => terminalLink(text, url, {target: 'stderr', ...options});

// TODO: Remove this for the next major release
module.exports.default = module.exports;
module.exports.isSupported = supportsHyperlinks.stdout;
module.exports.stderr.isSupported = supportsHyperlinks.stderr;
