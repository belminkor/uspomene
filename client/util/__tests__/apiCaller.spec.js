import test from 'ava';
import callApi, { API_URL } from '../apiCaller';
import nock from 'nock';

test('method defaults to GET', async t => {
  const reply = { foo: 'bar' };
  nock(API_URL)
    .get('/foo')
    .reply(200, reply);
  return await callApi('foo').then(response => {
    t.deepEqual(response, reply);
  });
});

test('sends the body', async t => {
  const body = { id: 5 };
  const reply = { foo: 'bar' };
  nock(API_URL)
    .post('/foo', body)
    .reply(200, reply);
  return await callApi('foo', 'post', body).then(response => {
    t.deepEqual(response, reply);
  });
});

test('returns the error', async t => {
  const reply = { message: 'Errrrrrrrrr' };
  nock(API_URL)
    .get('/send_error')
    .reply(500, reply);
  return await callApi('send_error').then(error => {
    t.deepEqual(error, reply);
  });
});
