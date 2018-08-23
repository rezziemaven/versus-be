'use strict';

const fetch = require('node-fetch');

const endpoint =
  'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?';

const params = input => {
  return {
    key: 'AIzaSyBzBvfaosQJN9iUMMRAPD9ATnIPjofrCto',
    input: input,
    inputtype: 'textquery',
    fields: 'formatted_address,name,opening_hours,geometry'
  };
};

const paramToString = params => {
  let queryString = '';
  for (let key in params) {
    const keyString = params[key].split(' ').join('%20');
    queryString = queryString.concat(key.toString(), '=', keyString, '&');
  }
  return queryString.slice(0, queryString.length - 1);
};

exports.getLocation = async ctx => {
  const paramStr = paramToString(params(ctx.request.body.input));
  await fetch(endpoint + paramStr)
    .then(res => res.json())
    .then(data => {
      ctx.body = data;
      ctx.status = 200;
    })
    .catch(err => console.error(err));
};
