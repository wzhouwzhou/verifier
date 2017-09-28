'use strict';
let ex = {};
ex.name = 'Verifier';
ex.users = {
  WILLY: '259209114268336129',
};

ex.ownerIDs = [
  ex.users.WILLY,
  'some other id',
];

ex.prefix = 'v!';
ex.PREFIX=ex.prefix;
module.exports = ex;
