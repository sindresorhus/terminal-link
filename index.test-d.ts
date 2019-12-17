import {expectType} from 'tsd';
import terminalLink = require('.');

expectType<string>(terminalLink('text', 'url'));

expectType<string>(
	terminalLink('text', 'url', {
		fallback: (text, url) => `[${text}](${url})`
	})
);

expectType<string>(
	terminalLink('text', 'url', {
		fallback: false
	})
);

expectType<boolean>(terminalLink.isSupported);

// stderr

expectType<string>(terminalLink.stderr('text', 'url'));

expectType<string>(
	terminalLink.stderr('text', 'url', {
		fallback: (text, url) => `[${text}](${url})`
	})
);

expectType<boolean>(terminalLink.stderr.isSupported)
