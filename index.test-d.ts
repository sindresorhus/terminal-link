import {expectType} from 'tsd';
import terminalLink = require('.');

expectType<string>(terminalLink('text', 'url'));

expectType<string>(
	terminalLink('text', 'url', {
		fallback: (text, url) => `[${text}](${url})`
	})
);

expectType<boolean>(terminalLink.isSupported);
