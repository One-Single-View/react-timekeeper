"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIME_PARSE_24 = void 0;
exports.composeTime = composeTime;
exports.parseMeridiem = parseMeridiem;
exports.parseTime = parseTime;
const TIME_PARSE_MERIDIEM = new RegExp(/^(\d{1,2}?):(\d{2}?)\s?(am|pm)$/i);
const TIME_PARSE_24 = new RegExp(/^(\d{1,2}?):(\d{2}?)$/);
exports.TIME_PARSE_24 = TIME_PARSE_24;
const defaultTime = {
  hour: 12,
  minute: 30
}; // parse and normalize time to 24h

function parseTime(time) {
  if (time == null) {
    return defaultTime;
  }

  let hour = 0;
  let minute = 0;
  let meridiem = null; // parse basic numbers from string or object

  if (typeof time === 'string') {
    // if is string
    let match = time.match(TIME_PARSE_MERIDIEM);

    if (match) {
      // 12 hr string
      hour = parseInt(match[1], 10);
      minute = parseInt(match[2], 10);
      meridiem = match[3].toLowerCase();
    } else {
      // 24 hr string
      match = time.match(TIME_PARSE_24);

      if (!match) {
        throw new Error('Could not parse time (string)');
      }

      hour = parseInt(match[1], 10);
      minute = parseInt(match[2], 10);
    }
  } else if (typeof time === 'object') {
    // if is object
    if (!Number.isInteger(time.hour) || !Number.isInteger(time.minute)) {
      throw new Error('Time and minute must both be valid integers');
    }

    hour = time.hour;
    minute = time.minute;

    if ('meridiem' in time) {
      meridiem = time.meridiem.toLowerCase();
    }
  }

  if (minute > 60) {
    throw new Error('Minute out of range (> 60)');
  } // normalize hours


  if (meridiem != null) {
    if (hour > 12) {
      throw new Error('Hour out of range (> 12)');
    } // handling the 12 hr conversion


    if (meridiem === 'pm' && hour !== 12) {
      hour += 12;
    } else if (meridiem === 'am' && hour === 12) {
      hour = 0;
    }
  } else {
    // handling the 24 hour conversion
    if (hour > 24) {
      throw new Error('Hour out of range (> 24)');
    }

    if (hour === 24) {
      hour = 0;
    }
  }

  return {
    hour,
    minute
  };
}

function parseMeridiem(time) {
  const parsed = parseTime(time); // assumes time is 0 -> 23, where 0 is midnight

  return parsed.hour >= 12 ? 'pm' : 'am';
} // formats time output to poss to parent


function composeTime(hour, minute, disabledTimeRangeValidator) {
  const paddedMinute = ('0' + minute).slice(-2);
  const hour24 = hour === 24 ? 0 : hour;
  const meridiem = hour >= 12 ? 'pm' : 'am';
  let hour12 = hour;

  if (hour > 12) {
    hour12 = hour - 12;
  } else if (hour === 0) {
    hour12 = hour = 12;
  }

  let isValid = true;

  if (disabledTimeRangeValidator) {
    if (!disabledTimeRangeValidator.validateHour(hour24) || !disabledTimeRangeValidator.validateMinute(hour24, minute)) {
      isValid = false;
    }
  }

  return {
    formatted24: "".concat(hour24, ":").concat(paddedMinute),
    formatted12: "".concat(hour12, ":").concat(paddedMinute, " ").concat(meridiem),
    formattedSimple: "".concat(hour12, ":").concat(paddedMinute),
    hour: hour24,
    hour12,
    minute,
    meridiem,
    isValid
  };
}