'use strict';

// src/services/game/hooks/create-game.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

function shuffle(array) {

}

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const user = hook.params.user;

    // Assign the logged in user as the creator of the game
    hook.data.userId = user._id;

    // Set up the set of cards and shuffle them
    const words = ['book', 'table', 'chair']
    hook.data.words = words

    // Add the logged in user as the first player
    hook.data.players = [{
      userId: user._id,
      name: user.name,
      color: '#f00',
      pairs: []
    }];

  };
};
