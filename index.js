"use strict";

const prompt = require('prompt');
const colors = require('colors');
const Question = require('./lib/Question');
const {randomNumber} = require('./lib/utils');

class NumberChallenge {

  constructor (config) {
    this.config = config;

    prompt.start();
    prompt.message = 'Question'.bold

    var question = this.generateQuestion();
    this.askQuestion(question);
  }

  // Public
  generateQuestion () {
    const config = this.config;
    const sum = config.sums[randomNumber(0, config.sums.length)];
    sum.operators = sum.operators ? sum.operators : 1;

    return Question.hasOwnProperty(sum.type) ? Question[sum.type](config, sum) : Question.default(config, sum); 
  }

  askQuestion (question) {
    const {triggers, messages} = this.config;

    prompt.get([{
      name: 'answer',
      description: question.desc.bold.grey
    }], (err, result) => {
      if (!result) 
        return console.log(messages.cancel().bold.red);

      if (triggers.skip.includes(result.answer))
        return console.log(messages.skip().bold.red);

      if (triggers.showAnswer.includes(result.answer))
        return console.log(messages.showAnswer(question.answer).bold.blue);
        
      if (result.answer != question.answer) {
        console.log(messages.incorrect().red);
        return this.askQuestion(question);
      }

      console.log(messages.correct().green);
    });
  }

}

module.exports = NumberChallenge;