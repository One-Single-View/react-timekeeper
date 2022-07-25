"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _time = require("./time");

/*
	module assumes 24h format
*/
function parseTime(time) {
  const match = time.match(_time.TIME_PARSE_24);

  if (!match) {
    throw new Error('Could not parse time for disabled time range');
  }

  return {
    hour: parseInt(match[1], 10),
    minute: parseInt(match[2], 10)
  };
}

function generateHourValidator(fromH, fromM, toH, toM) {
  const minH = fromH;
  const maxH = toH;
  const isSameHour = fromH === toH;

  if (fromH < toH || isSameHour && fromM < toM) {
    // regular range
    return hour => hour <= minH || hour >= maxH;
  } // overnight range: fromH > toH || (isSameHour && fromM > toM)


  return hour => hour <= minH && hour >= maxH;
}

function generateMinuteValidator(fromH, fromM, toH, toM, hourValidator) {
  return (h, m) => {
    // if hour is invalid, all minutes should be invalid
    if (!hourValidator(h)) {
      return false;
    }

    if (h === fromH) {
      return m <= fromM;
    } else if (h === toH) {
      return m >= toM;
    }

    return true;
  };
}

class DisabledTimeRange {
  constructor(from, to) {
    const {
      hour: fromH,
      minute: fromM
    } = parseTime(from);
    const {
      hour: toH,
      minute: toM
    } = parseTime(to);

    if (fromH === toH && fromM === toM) {
      throw new Error('invalid date range - same time');
    }

    this.validateHour = generateHourValidator(fromH, fromM, toH, toM);
    this.validateMinute = generateMinuteValidator(fromH, fromM, toH, toM, this.validateHour);
  }

}

exports.default = DisabledTimeRange;