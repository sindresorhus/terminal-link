'use strict';
const ansiEscapes = require('ansi-escapes');
const supportsHyperlinks = require('supports-hyperlinks');

const terminalLink = (text, url, options = {}) => {
	if (typeof options.target === 'undefined') {
		options.target = 'stdout';
	}

	if (!supportsHyperlinks[options.target]) {
		return options.fallback ? options.fallback(text, url) : `${text} (${url})`;
	}

	return ansiEscapes.link(text, url);
};

module.exports = (text, url, options = {}) => terminalLink(text, url, options);

module.exports.stderr = (text, url, options = {}) => terminalLink(text, url, options);

// TODO: Remove this for the next major release
module.exports.default = module.exports;
module.exports.isSupported = supportsHyperlinks.stdout;
module.exports.stderr.isSupported = supportsHyperlinks.stderr;
