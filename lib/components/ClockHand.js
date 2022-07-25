"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ClockHand;

var _react = require("react");

var _reactSpring = require("react-spring");

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _clockHand = require("./styles/clock-hand");

var _math = require("../helpers/math");

var _jsxRuntime = require("@emotion/react/jsx-runtime");

function rotate(r) {
  return "rotate(".concat(r, " ").concat(_constants.CLOCK_RADIUS, " ").concat(_constants.CLOCK_RADIUS, ")");
}

function getAngle(mode, time) {
  const increments = _constants.CLOCK_VALUES[mode].increments;
  const value = (0, _utils.getTimeValue)(mode, time);
  return value * (360 / increments);
}

function ClockHand(_ref) {
  let {
    mode,
    time
  } = _ref;
  const prevState = (0, _react.useRef)({
    time,
    mode
  });
  const dragCount = (0, _react.useRef)(0); // clockhand positioning

  const inner = time.hour > 0 && time.hour <= 12;
  const handLength = (0, _constants.getClockHandLength)(mode, inner);
  const circlePosition = (0, _constants.getClockHandCirclePosition)(mode, inner);
  const circleRadius = (0, _constants.getClockHandCircleRadius)(mode, inner);
  const [anim, api] = (0, _reactSpring.useSpring)(() => {
    return {
      immediate: true,
      rotation: getAngle(mode, time),
      length: handLength,
      position: circlePosition
    };
  });
  const {
    rotation,
    length,
    position
  } = anim;
  (0, _react.useEffect)(() => {
    const current = rotation.get();
    const next = getAngle(mode, time);

    if (prevState.current.mode !== mode) {
      dragCount.current = 0;
      prevState.current.mode = mode; // mode changed, animate clockhand to next mode angle

      const finalAngle = (0, _math.calcAnimationAngle)(current, next);
      api.start({
        immediate: false,
        rotation: finalAngle,
        length: handLength,
        position: circlePosition
      });
    } else if (!(0, _utils.isSameTime)(prevState.current.time, time)) {
      // time changed, no animation necessary - just update clockhand (without animation)
      prevState.current.time = time;
      dragCount.current++;
      /*
      TODO - consider making this a config option?
      if on hour mode and `switchToMinuteOnHourSelect` is enabled, don't display
      change in time, just wait for mode to change
      */
      // if (isHourMode(mode) && config.switchToMinuteOnHourSelect && dragCount.current < 2) {
      // 	return
      // }

      api.start({
        immediate: true,
        rotation: next,
        length: handLength,
        position: circlePosition
      });
    }
  }, [circlePosition, handLength, mode, rotation, api, time]); // mini circle on clockhand between increments on minutes

  const value = (0, _utils.getTimeValue)(mode, time);
  let showIntermediateValueDisplay;

  if (mode === _constants.MODE.MINUTES && value % 5) {
    showIntermediateValueDisplay = (0, _jsxRuntime.jsx)("circle", {
      className: "react-timekeeper__hand-intermediate-circle",
      css: _clockHand.intermediateMinuteCircle,
      cx: _constants.CLOCK_RADIUS,
      cy: _constants.NUMBER_OUTER_POSITION,
      r: 4
    });
  }

  return (0, _jsxRuntime.jsx)("svg", {
    width: _constants.CLOCK_SIZE,
    height: _constants.CLOCK_SIZE,
    viewBox: "0 0 ".concat(_constants.CLOCK_SIZE, " ").concat(_constants.CLOCK_SIZE),
    xmlns: "http://www.w3.org/2000/svg",
    className: "react-timekeeper__clock-hand",
    children: (0, _jsxRuntime.jsxs)(_reactSpring.animated.g, {
      transform: rotation.to(a => rotate(a)),
      children: [(0, _jsxRuntime.jsx)(_reactSpring.animated.line, {
        className: "react-timekeeper__clock-hand",
        css: _clockHand.line,
        x1: _constants.CLOCK_RADIUS,
        y1: _constants.CLOCK_RADIUS,
        x2: _constants.CLOCK_RADIUS,
        y2: length,
        strokeWidth: "1",
        "data-testid": "clock-hand"
      }), (0, _jsxRuntime.jsx)("circle", {
        className: "react-timekeeper__hand-circle-center",
        css: _clockHand.centerCircle,
        cx: _constants.CLOCK_RADIUS,
        cy: _constants.CLOCK_RADIUS,
        r: 1.5
      }), (0, _jsxRuntime.jsx)(_reactSpring.animated.circle, {
        className: "react-timekeeper__hand-circle-outer",
        css: _clockHand.outerCircle,
        cx: _constants.CLOCK_RADIUS,
        cy: position,
        r: circleRadius
      }), showIntermediateValueDisplay]
    })
  });
}