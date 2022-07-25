"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ClockWrapper;

var _react = require("react");

var _reactSpring = require("react-spring");

var _ClockHand = _interopRequireDefault(require("./ClockHand"));

var _Numbers = require("./Numbers");

var _constants = require("../helpers/constants");

var _utils = require("../helpers/utils");

var _clock = _interopRequireDefault(require("./styles/clock"));

var _useConfigContext = _interopRequireDefault(require("../hooks/useConfigContext"));

var _useStateContext = _interopRequireDefault(require("../hooks/useStateContext"));

var _jsxRuntime = require("@emotion/react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exitPosition(mode) {
  return (0, _utils.isHourMode)(mode) ? _constants.INITIAL_HOUR_TRANSFORM : _constants.INITIAL_MINUTE_TRANSFORM;
}

function initialPosition(mode) {
  return (0, _utils.isMinuteMode)(mode) ? _constants.INITIAL_HOUR_TRANSFORM : _constants.INITIAL_MINUTE_TRANSFORM;
}

function ClockWrapper(_ref) {
  let {
    clockEl
  } = _ref;
  const firstRun = (0, _react.useRef)(true);
  const {
    hour24Mode
  } = (0, _useConfigContext.default)();
  const {
    mode,
    time,
    meridiem,
    disabledTimeRangeValidator
  } = (0, _useStateContext.default)();
  const transitions = (0, _reactSpring.useTransition)(mode, {
    unique: true,
    from: !firstRun.current && {
      opacity: 0,
      translate: initialPosition(mode),
      translateInner: _constants.INNER_NUMBER_POSITIONING.exit
    },
    enter: {
      opacity: 1,
      translate: (0, _constants.getOuterNumberPosition)(mode),
      translateInner: _constants.INNER_NUMBER_POSITIONING.enter
    },
    leave: {
      opacity: 0,
      translate: exitPosition(mode),
      translateInner: _constants.INNER_NUMBER_POSITIONING.exit
    }
  });
  (0, _react.useEffect)(() => {
    // don't show intial animation on first render - ie: {from : ...}
    firstRun.current = false;
  }, []);
  return (0, _jsxRuntime.jsxs)("div", {
    className: "react-timekeeper__clock",
    css: _clock.default,
    ref: clockEl,
    children: [transitions((anim, currentMode) => (0, _utils.isMinuteMode)(currentMode) ? (0, _jsxRuntime.jsx)(_Numbers.MinuteNumbers, {
      anim: anim,
      disabledTimeRangeValidator: disabledTimeRangeValidator,
      hour: time.hour
    }) : (0, _jsxRuntime.jsx)(_Numbers.HourNumbers, {
      anim: anim,
      mode: currentMode,
      hour24Mode: hour24Mode,
      disabledTimeRangeValidator: disabledTimeRangeValidator,
      meridiem: meridiem
    })), (0, _jsxRuntime.jsx)(_ClockHand.default, {
      time: time,
      mode: mode
    })]
  });
}