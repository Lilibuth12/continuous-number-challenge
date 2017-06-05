"use strict";

const math = require('mathjs');
const {randomNumber} = require('./utils');

class Question {

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
    const sumStr = `${num} ^ ${sum.power}`;

    return {
      desc: `${sumStr} = ?`,
      answer: Math.pow(num, sum.power)
    }
  }

}

module.exports = Question;