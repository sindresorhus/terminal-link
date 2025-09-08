import test from 'ava';
import supportsHyperlinks from 'supports-hyperlinks';
import terminalLink from './index.js';

const originalStdout = supportsHyperlinks.stdout;
const originalStderr = supportsHyperlinks.stderr;

test.afterEach(() => {
	supportsHyperlinks.stdout = originalStdout;
	supportsHyperlinks.stderr = originalStderr;
});

test('main', t => {
	supportsHyperlinks.stdout = true;

	const actual = terminalLink('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, '\u001B]8;;https://sindresorhus.com\u0007My Website\u001B]8;;\u0007');
});

test('stderr', t => {
	supportsHyperlinks.stderr = true;

	const actual = terminalLink.stderr('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, '\u001B]8;;https://sindresorhus.com\u0007My Website\u001B]8;;\u0007');
});

test('default fallback', t => {
	supportsHyperlinks.stdout = false;

	const actual = terminalLink('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, 'My Website https://sindresorhus.com');
});

test('disabled fallback', t => {
	supportsHyperlinks.stdout = false;

	const actual = terminalLink('My Website', 'https://sindresorhus.com', {
		fallback: false,
	});
	console.log(actual);
	t.is(actual, 'My Website');
});

test('explicitly enabled fallback', t => {
	supportsHyperlinks.stdout = false;

	const actual = terminalLink('My Website', 'https://sindresorhus.com', {
		fallback: true,
	});
	console.log(actual);
	t.is(actual, 'My Website https://sindresorhus.com');
});

test('stderr default fallback', t => {
	supportsHyperlinks.stderr = false;

	const actual = terminalLink.stderr('My Website', 'https://sindresorhus.com');
	t.is(actual, 'My Website https://sindresorhus.com');
});

test('custom fallback', t => {
	supportsHyperlinks.stdout = false;

	const actual = terminalLink('My Website', 'https://sindresorhus.com', {
		fallback: (text, url) => `${text}: ${url}`,
	});
	console.log(actual);
	t.is(actual, 'My Website: https://sindresorhus.com');
});

test('custom fallback stderr', t => {
	supportsHyperlinks.stderr = false;

	const actual = terminalLink.stderr('My Website', 'https://sindresorhus.com', {
		fallback: (text, url) => `${text}: ${url}`,
	});
	console.log(actual);
	t.is(actual, 'My Website: https://sindresorhus.com');
});

test('isSupported', t => {
	t.is(typeof terminalLink.isSupported, 'boolean');
});

test('isSupported stderr', t => {
	t.is(typeof terminalLink.stderr.isSupported, 'boolean');
});
