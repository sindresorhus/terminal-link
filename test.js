import process from 'node:process';
import test from 'ava';

// TODO: Tests don't currently work as we need to be able to clear `supports-color`, but our `importFresh` helper can only bypass the cache at top-level.

const importFresh = async modulePath => import(`${modulePath}?x=${new Date()}`);

// eslint-disable-next-line unicorn/no-await-expression-member
const importModule = async () => (await importFresh('./index.js')).default;

test.afterEach(() => {
	delete process.env.FORCE_HYPERLINK;
});

test('main', async t => {
	process.env.FORCE_HYPERLINK = 1;
	const terminalLink = await importModule();

	const actual = terminalLink('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, '\u001B]8;;https://sindresorhus.com\u0007My Website\u001B]8;;\u0007');
});

test('stderr', async t => {
	process.env.FORCE_HYPERLINK = 1;
	const terminalLink = await importModule();

	const actual = terminalLink.stderr('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, '\u001B]8;;https://sindresorhus.com\u0007My Website\u001B]8;;\u0007');
});

test('default fallback', async t => {
	process.env.FORCE_HYPERLINK = 0;
	const terminalLink = await importModule();

	const actual = terminalLink('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, 'My Website https://sindresorhus.com');
});

test('disabled fallback', async t => {
	process.env.FORCE_HYPERLINK = 0;
	const terminalLink = await importModule();

	const actual = terminalLink('My Website', 'https://sindresorhus.com', {
		fallback: false,
	});
	console.log(actual);
	t.is(actual, 'My Website');
});

test('explicitly enabled fallback', async t => {
	process.env.FORCE_HYPERLINK = 0;
	const terminalLink = await importModule();

	const actual = terminalLink('My Website', 'https://sindresorhus.com', {
		fallback: true,
	});
	console.log(actual);
	t.is(actual, 'My Website https://sindresorhus.com');
});

test('stderr default fallback', async t => {
	process.env.FORCE_HYPERLINK = 0;
	const terminalLink = await importModule();

	const actual = terminalLink.stderr('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, 'My Website https://sindresorhus.com');
});

test('custom fallback', async t => {
	process.env.FORCE_HYPERLINK = 0;
	const terminalLink = await importModule();

	const actual = terminalLink('My Website', 'https://sindresorhus.com', {
		fallback: (text, url) => `${text}: ${url}`,
	});
	console.log(actual);
	t.is(actual, 'My Website: https://sindresorhus.com');
});

test('custom fallback stderr', async t => {
	process.env.FORCE_HYPERLINK = 0;
	const terminalLink = await importModule();

	const actual = terminalLink.stderr('My Website', 'https://sindresorhus.com', {
		fallback: (text, url) => `${text}: ${url}`,
	});
	console.log(actual);
	t.is(actual, 'My Website: https://sindresorhus.com');
});

test('isSupported', async t => {
	const terminalLink = await importModule();
	t.is(typeof terminalLink.isSupported, 'boolean');
});

test('isSupported stderr', async t => {
	const terminalLink = await importModule();
	t.is(typeof terminalLink.stderr.isSupported, 'boolean');
});
