'use strict';
const ansiEscapes = require('ansi-escapes');
const supportsHyperlinks = require('supports-hyperlinks');

module.exports = (text, url, options = {}) => {
	if (!supportsHyperlinks.stdout) {
		return options.fallback ? options.fallback(text, url) : `${text} (${url})`;
	}

	return ansiEscapes.link(text, url);
};

// TODO: Remove this for the next major release
module.exports.default = module.exports;
module.exports.isSupported = supportsHyperlinks.stdout;
