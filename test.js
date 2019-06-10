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
	const m = require('.');

	const actual = m('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, '\u001B]8;;https://sindresorhus.com\u0007My Website\u001B]8;;\u0007');
});

test('stderr', t => {
	process.env.FORCE_HYPERLINK = 1;
	const m = require('.');

	const actual = m.stderr('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, '\u001B]8;;https://sindresorhus.com\u0007My Website\u001B]8;;\u0007');
});

test('default fallback', t => {
	process.env.FORCE_HYPERLINK = 0;
	const m = require('.');

	const actual = m('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, 'My Website (https://sindresorhus.com)');
});

test('stderr default fallback', t => {
	process.env.FORCE_HYPERLINK = 0;
	const m = require('.');

	const actual = m.stderr('My Website', 'https://sindresorhus.com');
	console.log(actual);
	t.is(actual, 'My Website (https://sindresorhus.com)');
});

test('custom fallback', t => {
	process.env.FORCE_HYPERLINK = 0;
	const m = require('.');

	const actual = m('My Website', 'https://sindresorhus.com', {
		fallback: (text, url) => `${text}: ${url}`
	});
	console.log(actual);
	t.is(actual, 'My Website: https://sindresorhus.com');
});

test('custom fallback stderr', t => {
	process.env.FORCE_HYPERLINK = 0;
	const m = require('.');

	const actual = m.stderr('My Website', 'https://sindresorhus.com', {
		fallback: (text, url) => `${text}: ${url}`
	});
	console.log(actual);
	t.is(actual, 'My Website: https://sindresorhus.com');
});

test('isSupported', t => {
	const m = require('.');
	t.is(typeof m.isSupported, 'boolean');
});

test('isSupported stderr', t => {
	const m = require('.');
	t.is(typeof m.stderr.isSupported, 'boolean');
});
