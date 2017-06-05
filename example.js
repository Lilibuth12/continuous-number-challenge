#!/usr/bin/env node
"use strict";

const NumberChallenge = require('./index');

new NumberChallenge({
  decimals: false,
  sums: [
    {type: 'add', operator: '+', min: -200, max: 1000},
    {type: 'subtract', operator: '-', min: -200, max: 200},
    {type: 'multiply', operator: '*', min: 2, max: 14},
    {type: 'divide', operator: '÷', min: 2, max: 14},
    {type: 'powers', operator: '^', min: 2, max: 14, power: 2}
  ],
  triggers: {
    skip: ['SKIP'],
    showAnswer: ['I give up', 'answer please', 'no freaking idea', 'I don\'t know']
  },
  messages:{
    skip: () => `Okay fine, you escaped this time!`,
    showAnswer: (answer) => `The answer is: ${answer} :).\nRemember for next time!`,
    incorrect: () => `incorrect, try again :)`,
    correct: () => `Answered correctly! WHOOP! GO LIZZIE! xD`,
    cancel: () => `\nWOW rejected! YOU CANNOT ESCAPE MEEEEEE *chases waving numbers*`
  }
});