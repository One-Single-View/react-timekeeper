"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VISIBLE_NUMBERS_PER_CIRCLE = exports.NUMBER_REGULAR_FONT_SIZE = exports.NUMBER_RADIUS_REGULAR = exports.NUMBER_OUTER_POSITION = exports.MODE = exports.MINUTES = exports.MERIDIEM = exports.INNER_NUMBER_RADIUS = exports.INNER_NUMBER_POSITIONING = exports.INITIAL_MINUTE_TRANSFORM = exports.INITIAL_HOUR_TRANSFORM = exports.HOUR_24_OUTER_FONT_SIZE = exports.HOUR_24_INNER_FONT_SIZE = exports.CLOCK_VALUES = exports.CLOCK_SIZE = exports.CLOCK_RADIUS = void 0;
exports.getClockHandCirclePosition = getClockHandCirclePosition;
exports.getClockHandCircleRadius = getClockHandCircleRadius;
exports.getClockHandLength = getClockHandLength;
exports.getOuterNumberPosition = getOuterNumberPosition;
const MINUTES = ['05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, '00'].map(a => a.toString());
exports.MINUTES = MINUTES;
const MINUTES_60 = Array.from(Array(60), (_, i) => i.toString());
const HOURS_12 = Array.from(Array(12), (_, i) => (i + 1).toString());
const HOURS_24 = Array.from(Array(23), (_, i) => (i + 1).toString()).concat('00');
let MODE;
exports.MODE = MODE;

(function (MODE) {
  MODE["MINUTES"] = "MINUTES";
  MODE["HOURS_12"] = "HOURS_12";
  MODE["HOURS_24"] = "HOURS_24";
})(MODE || (exports.MODE = MODE = {}));

let MERIDIEM;
/*
	- increments is how many splits on clock, visible or invisible
*/

exports.MERIDIEM = MERIDIEM;

(function (MERIDIEM) {
  MERIDIEM["am"] = "am";
  MERIDIEM["pm"] = "pm";
})(MERIDIEM || (exports.MERIDIEM = MERIDIEM = {}));

const CLOCK_VALUES = {
  [MODE.MINUTES]: {
    increments: 60,
    numbers: MINUTES,
    dropdown: MINUTES_60
  },
  [MODE.HOURS_12]: {
    increments: 12,
    numbers: HOURS_12,
    dropdown: HOURS_12
  },
  [MODE.HOURS_24]: {
    increments: 12,
    numbers: HOURS_24.slice(12),
    numbersInner: HOURS_24.slice(0, 12),
    dropdown: HOURS_24
  }
}; // number of actual numbers to display

exports.CLOCK_VALUES = CLOCK_VALUES;
const VISIBLE_NUMBERS_PER_CIRCLE = 12; // radius of clock, in px

exports.VISIBLE_NUMBERS_PER_CIRCLE = VISIBLE_NUMBERS_PER_CIRCLE;
const CLOCK_RADIUS = 110;
exports.CLOCK_RADIUS = CLOCK_RADIUS;
const CLOCK_SIZE = CLOCK_RADIUS * 2;
/*
	radius of invisible inner circle for 24 hour numbers
	- controls how far out the inner circle comes and
	how far in numbers come as well
 */

exports.CLOCK_SIZE = CLOCK_SIZE;
const INNER_NUMBER_RADIUS = 77; // font sizes

exports.INNER_NUMBER_RADIUS = INNER_NUMBER_RADIUS;
const NUMBER_REGULAR_FONT_SIZE = 16;
exports.NUMBER_REGULAR_FONT_SIZE = NUMBER_REGULAR_FONT_SIZE;
const HOUR_24_INNER_FONT_SIZE = 15;
exports.HOUR_24_INNER_FONT_SIZE = HOUR_24_INNER_FONT_SIZE;
const HOUR_24_OUTER_FONT_SIZE = 13; // size of circle surrounding individual numbers
// loosely based on font sizes above

exports.HOUR_24_OUTER_FONT_SIZE = HOUR_24_OUTER_FONT_SIZE;
const NUMBER_RADIUS_REGULAR = 34;
exports.NUMBER_RADIUS_REGULAR = NUMBER_RADIUS_REGULAR;
const NUMBER_RADIUS_HOUR_24_OUTER = 32;
const NUMBER_RADIUS_HOUR_24_INNER = 28; // positioning of numbers

const NUMBER_OUTER_POSITION = 22;
exports.NUMBER_OUTER_POSITION = NUMBER_OUTER_POSITION;
const NUMBER_OUTER_POSITION_24_HOUR = 18; // controls how far out to move numbers during 24h mode

const NUMBER_INNER_POSITION_24_HOUR = CLOCK_RADIUS - INNER_NUMBER_RADIUS + NUMBER_RADIUS_HOUR_24_INNER / 2;

function getOuterNumberPosition(mode) {
  return mode === MODE.HOURS_24 ? NUMBER_OUTER_POSITION_24_HOUR : NUMBER_OUTER_POSITION;
} // initial position of hours/minutes before animating to final position


const INITIAL_HOUR_TRANSFORM = NUMBER_OUTER_POSITION - 32;
exports.INITIAL_HOUR_TRANSFORM = INITIAL_HOUR_TRANSFORM;
const INITIAL_MINUTE_TRANSFORM = NUMBER_OUTER_POSITION + 28; // clock hand stuff

exports.INITIAL_MINUTE_TRANSFORM = INITIAL_MINUTE_TRANSFORM;

function getClockHandLength(mode, inner) {
  if (mode !== MODE.HOURS_24) {
    return NUMBER_OUTER_POSITION;
  }

  return inner ? NUMBER_INNER_POSITION_24_HOUR : NUMBER_OUTER_POSITION_24_HOUR;
}

function getClockHandCirclePosition(mode, inner) {
  if (mode !== MODE.HOURS_24) {
    return NUMBER_OUTER_POSITION;
  }

  return inner ? NUMBER_INNER_POSITION_24_HOUR : NUMBER_OUTER_POSITION_24_HOUR;
}

function getClockHandCircleRadius(mode, inner) {
  if (mode !== MODE.HOURS_24) {
    return NUMBER_RADIUS_REGULAR / 2;
  }

  return inner ? NUMBER_RADIUS_HOUR_24_INNER / 2 : NUMBER_RADIUS_HOUR_24_OUTER / 2;
}

const animationChange = 22;
const INNER_NUMBER_POSITIONING = {
  exit: NUMBER_INNER_POSITION_24_HOUR + animationChange,
  enter: NUMBER_INNER_POSITION_24_HOUR
};
exports.INNER_NUMBER_POSITIONING = INNER_NUMBER_POSITIONING;