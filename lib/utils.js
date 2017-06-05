"use strict"

module.exports.randomNumber = function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}