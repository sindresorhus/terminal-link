import {serial as test} from 'ava';
import clearModule from 'clear-module';

test.beforeEach(() => {
	clearModule.all();
});

test.afterEach(() => {
	delete process.env.FORCE_HYPERLINK;
});

test('main', t => {
	process.env.FORCE_HYPERLINK = 1;
	const terminalLink = require('.');

	const actual = terminalLink('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, '\u001B]8;;https://sindresorhus.com\u0007My Website\u001B]8;;\u0007');
});

test('stderr', t => {
	process.env.FORCE_HYPERLINK = 1;
	const terminalLink = require('.');

	const actual = terminalLink.stderr('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, '\u001B]8;;https://sindresorhus.com\u0007My Website\u001B]8;;\u0007');
});

test('default fallback', t => {
	process.env.FORCE_HYPERLINK = 0;
	const terminalLink = require('.');

	const actual = terminalLink('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, 'My Website (\u200Bhttps://sindresorhus.com\u200B)');
});

test('disabled fallback', t => {
	process.env.FORCE_HYPERLINK = 0;
	const terminalLink = require('.');

	const actual = terminalLink('My Website', 'https://sindresorhus.com', {
		fallback: false
	});
	console.log(actual);
	t.is(actual, 'My Website');
});

test('stderr default fallback', t => {
	process.env.FORCE_HYPERLINK = 0;
	const terminalLink = require('.');

	const actual = terminalLink.stderr('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, 'My Website (\u200Bhttps://sindresorhus.com\u200B)');
});

test('custom fallback', t => {
	process.env.FORCE_HYPERLINK = 0;
	const terminalLink = require('.');

	const actual = terminalLink('My Website', 'https://sindresorhus.com', {
		fallback: (text, url) => `${text}: ${url}`
	});
	console.log(actual);
	t.is(actual, 'My Website: https://sindresorhus.com');
});

test('custom fallback stderr', t => {
	process.env.FORCE_HYPERLINK = 0;
	const terminalLink = require('.');

	const actual = terminalLink.stderr('My Website', 'https://sindresorhus.com', {
		fallback: (text, url) => `${text}: ${url}`
	});
	console.log(actual);
	t.is(actual, 'My Website: https://sindresorhus.com');
});

test('isSupported', t => {
	const terminalLink = require('.');
	t.is(typeof terminalLink.isSupported, 'boolean');
});

test('isSupported stderr', t => {
	const terminalLink = require('.');
	t.is(typeof terminalLink.stderr.isSupported, 'boolean');
});
