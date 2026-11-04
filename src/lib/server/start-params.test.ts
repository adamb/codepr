// Run: node --test src/lib/server/start-params.test.ts   (Node >= 23.6 strips TS types natively)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanIgHandle, cleanSubscriberId, firstParam, IG_PARAMS } from './start-params.ts';

test('cleanIgHandle', () => {
	assert.equal(cleanIgHandle('@Ana_PR.2'), 'ana_pr.2');
	assert.equal(cleanIgHandle('  ana  '), 'ana');
	assert.equal(cleanIgHandle('{{instagram_username}}'), '');
	assert.equal(cleanIgHandle('#{{Instagram Username}}'), '');
	assert.equal(cleanIgHandle('<script>alert(1)</script>'), '');
	assert.equal(cleanIgHandle('a'.repeat(31)), '');
	assert.equal(cleanIgHandle(''), '');
	assert.equal(cleanIgHandle(null), '');
});

test('cleanSubscriberId', () => {
	assert.equal(cleanSubscriberId('1234567890'), '1234567890');
	assert.equal(cleanSubscriberId('{{user.id}}'), '');
	assert.equal(cleanSubscriberId('12 34'), '');
});

test('firstParam with IG aliases', () => {
	assert.equal(firstParam(new URL('https://code.pr/start?username=%40Ana'), IG_PARAMS, 60), '@Ana');
	assert.equal(firstParam(new URL('https://code.pr/start?ig=bob&username=ana'), IG_PARAMS, 60), 'bob');
	assert.equal(firstParam(new URL('https://code.pr/start?ig=&ig_username=carl'), IG_PARAMS, 60), 'carl');
	assert.equal(firstParam(new URL('https://code.pr/start'), IG_PARAMS, 60), '');
});
