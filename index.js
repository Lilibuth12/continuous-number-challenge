#!/usr/bin/env node
"use strict";

var prompt = require('prompt');
var math = require('mathjs');

class NumberChallenge {

  constructor (config) {
    this.config = config;

    prompt.start();

    var question = this.generateQuestion();
    this.askQuestion(question);
  }

  // Public
  generateQuestion () {
    const config = this.config;
    const sum = config.sums[randomNumber(0, config.sums.length)];
    sum.operators = sum.operators ? sum.operators : 1;

    return Questions.hasOwnProperty(sum.type) ? Questions[sum.type](config, sum) : Questions.default(config, sum); 
  }

  askQuestion (question) {
      prompt.get([{
          name: 'answer',
          description: question.desc
      }], (err, result) => {
          if( result.answer === 'SKIP')
            return console.log('Okay fine, you escaped this time!')
            
          if( result.answer != question.answer )
            return this.askQuestion(question);

          console.log('Answered correctly!')
      });
  }

}

class Questions {

  static default (config, sum) {
    const nums = math.range(0, sum.operators + 1).map(() => randomNumber(sum.min, sum.max + 1));
    const sumStr = nums._data.join(` ${sum.operator} `);

    return {
        desc: `${sumStr} = ?`,
        answer: math.eval(sumStr)
    };
  }

  static divide (config, sum) {
    const nums = math.range(0, sum.operators + 1).map(() => randomNumber(sum.min, sum.max + 1));
    nums._data.splice(1, 0, math.eval(nums._data.join(` * `))); // Adds the answer at the second place in the list
    const answer = nums._data.shift(); // Pops off the first num as the answer
    const sumStr = nums._data.join(` ${sum.operator} `);

    return {
      desc: `${sumStr} = ?`,
      answer: answer
    }
  }

  static powers (config, sum) {
    const num = randomNumber(sum.min, sum.max + 1);
    const power = sum.operators + 1;
    const sumStr = `${num} ** ${power}`;

    return {
      desc: `${sumStr} = ?`,
      answer: Math.pow(num, power)
    }
  }

}

// Private (not really) Utils etc.
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

new NumberChallenge({
  decimals: false,
  sums: [
    {type: 'add', operator: '+', min: -100, max: 100},
    {type: 'subtract', operator: '-', min: -100, max: 100},
    {type: 'multiply', operator: '*', min: 2, max: 14},
    {type: 'divide', operator: '÷', min: 2, max: 14},
    {type: 'powers', operator: '**', min: 2, max: 14}
  ]
});