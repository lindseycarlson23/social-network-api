// models:
// -users (can have other users as friends; will have a friends array that references other users; Course.js 23 is the example)
// -thoughts (thoughts belong to users)
// -reactions (this will be like assignment; reactions will belong to thoughts)

const User = require('./user');

const Thought = require ('./thought');

module.exports = {User, Thought};