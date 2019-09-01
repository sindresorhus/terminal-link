'use strict';
const ansiEscapes = require('ansi-escapes');
const supportsHyperlinks = require('supports-hyperlinks');

const terminalLink = (text, url, {target = 'stdout', ...options} = {}) => {
	if (!supportsHyperlinks[target]) {
		return options.fallback ? options.fallback(text, url) : `${text} (\u200B${url}\u200B)`;
	}

	return ansiEscapes.link(text, url);
};

module.exports = (text, url, options = {}) => terminalLink(text, url, options);

module.exports.stderr = (text, url, options = {}) => terminalLink(text, url, {target: 'stderr', ...options});

module.exports.isSupported = supportsHyperlinks.stdout;
module.exports.stderr.isSupported = supportsHyperlinks.stderr;
