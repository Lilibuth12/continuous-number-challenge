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
    const sum = config.sums[this.randomNumber(0, config.sums.length)];

    const nums = math.range(0, config.operators+1).map(() => {
      return this.randomNumber(sum.min, sum.max + 1);
    });
    const sumStr = nums._data.join(` ${sum.operator} `);

    return {
        desc: `${sumStr} = ?`,
        answer: math.eval(sumStr)
    };
  }

  askQuestion (question) {
      prompt.get([{
          name: 'answer',
          description: question.desc
      }], (err, result) => {
          if( result.answer != question.answer )
            return this.askQuestion(question);

          console.log('Answered correctly!')
      });
  }
  
  // Private (not really) Utils etc.
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

}

new NumberChallenge({
  operators: 1,
  decimals: false,
  sums: [
    {type: 'add', operator: '+', min: -100, max: 100},
    {type: 'subtract', operator: '-', min: -100, max: 100},
    {type: 'multiply', operator: '*', min: 2, max: 14}
  ]
});