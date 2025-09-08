import ansiEscapes from 'ansi-escapes';
import supportsHyperlinks from 'supports-hyperlinks';

export default function terminalLink(text, url, {target = 'stdout', ...options} = {}) {
	if (!supportsHyperlinks[target]) {
		// If the fallback has been explicitly disabled, don't modify the text itself.
		if (options.fallback === false) {
			return text;
		}

		if (typeof options.fallback === 'function') {
			return options.fallback(text, url);
		}

		// Use raw URL bounded by whitespace for maximum compatibility.
		// Most terminal linkifiers only guarantee correct detection when URLs are
		// delimited by whitespace. No brackets, quotes, or special characters that
		// could interfere with URL detection or be included in the linked text.
		return `${text} ${url}`;
	}

	return ansiEscapes.link(text, url);
}

terminalLink.isSupported = supportsHyperlinks.stdout;
terminalLink.stderr = (text, url, options = {}) => terminalLink(text, url, {target: 'stderr', ...options});
terminalLink.stderr.isSupported = supportsHyperlinks.stderr;
