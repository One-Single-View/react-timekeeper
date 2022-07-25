"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ClockWrapper;

var _react = require("react");

var _useConfigContext = _interopRequireDefault(require("../hooks/useConfigContext"));

var _Clock = _interopRequireDefault(require("./Clock"));

var _Meridiems = _interopRequireDefault(require("./Meridiems"));

var _clockWrapper = _interopRequireDefault(require("./styles/clock-wrapper"));

var _useClockEvents = _interopRequireDefault(require("../hooks/useClockEvents"));

var _constants = require("../helpers/constants");

var _utils = require("../helpers/utils");

var _useStateContext = _interopRequireDefault(require("../hooks/useStateContext"));

var _jsxRuntime = require("@emotion/react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ClockWrapper() {
  const config = (0, _useConfigContext.default)(); // clock events

  const clock = (0, _react.useRef)(null);
  const {
    mode,
    updateTimeValue
  } = (0, _useStateContext.default)();
  /*
  	LOGIC AROUND COARSE
  	- on drag, if count < 2, do not force coarse
  	- on mouseup, if count < 2 do not force coarse
  	- handlepoint
  		- if `wasTapped` OR `forceCoarse` config, then coarse it
  	- coarse is just rounding number to an increment before setting unit
  		LOGIC AROUND CAN CHANGE UNIT
  	- on drag, CAN NOT change unit
  	- on mouseup, can change unit
  	- AFTER time has been set, then determine if need to change unit
  		- based on this and user input
  */

  /*
  	converts angle into time, also factors in any rounding to the closest increment
  */

  const calculateTimeValue = (0, _react.useCallback)((angle, _ref) => {
    let {
      canAutoChangeMode = false,
      wasTapped = false,
      isInnerClick = false
    } = _ref;
    // total number of allowable increments, 12/24 for hours, 60 for min
    const totalIncrements = _constants.CLOCK_VALUES[mode].increments; // minimum increment used for rounding

    let minIncrement = 1; // coarse minutes

    if ((0, _utils.isMinuteMode)(mode) && (wasTapped || config.forceCoarseMinutes)) {
      minIncrement = config.coarseMinutes;
    }

    const val = angle / 360 * totalIncrements;
    let selected = Math.round(val / minIncrement) * minIncrement;
    /*
    	normalize value, acounts for angle that 12 is selected at, eg:
    	- if 12 clicked between 12 and 1, results in 0
    	- if 12 clicked between 11 and 12, results in 12
    */

    if ((0, _utils.isHourMode)(mode)) {
      selected = selected % 12;
    }

    if (mode === _constants.MODE.HOURS_24 && config.hour24Mode) {
      if (!isInnerClick) {
        selected += 12;
      } // fixes 12pm and midnight, both angle -> selected return 0
      // for midnight need a final selected of 0, and for noon need 12


      if (selected === 12) selected = 0;else if (selected === 0) selected = 12;
    } // update time officially on timekeeper


    updateTimeValue(selected, {
      type: 'clock',
      canAutoChangeMode
    });
  }, [config.forceCoarseMinutes, config.coarseMinutes, config.hour24Mode, mode, updateTimeValue]);
  const {
    bind
  } = (0, _useClockEvents.default)(clock, calculateTimeValue);
  return (0, _jsxRuntime.jsxs)("div", { ...bind,
    className: "react-timekeeper__clock-wrapper",
    css: _clockWrapper.default,
    "data-testid": "clock-wrapper",
    children: [(0, _jsxRuntime.jsx)(_Clock.default, {
      clockEl: clock
    }), !config.hour24Mode && (0, _jsxRuntime.jsx)(_Meridiems.default, {})]
  });
}