var _ = require('lodash');
var users = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
];

_.find(users, function(o) { if (o.age < 40) console.log('---', o.age) });