'use strict';
const ansiEscapes = require('ansi-escapes');
const supportsHyperlinks = require('supports-hyperlinks');

module.exports = (text, url, options = {}) => {
	if (!supportsHyperlinks.stdout) {
		return options.fallback ? options.fallback(text, url) : `${text} (${url})`;
	}

	return ansiEscapes.link(text, url);
};

module.exports.isSupported = supportsHyperlinks.stdout;
