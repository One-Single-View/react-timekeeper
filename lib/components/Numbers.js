"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinuteNumbers = exports.HourNumbers = void 0;

var _react = require("react");

var _reactSpring = require("react-spring");

var _constants = require("../helpers/constants");

var _math = require("../helpers/math");

var _numbers = require("./styles/numbers");

var _jsxRuntime = require("@emotion/react/jsx-runtime");

/*
	can memoize components since `anim` object doesn't actually change
*/
function Hours(_ref) {
  let {
    anim,
    mode,
    hour24Mode,
    disabledTimeRangeValidator,
    meridiem
  } = _ref;
  const {
    opacity,
    translate: translateOuter,
    translateInner
  } = anim;
  const {
    numbersOuter,
    numbersInner
  } = (0, _react.useMemo)(() => {
    const {
      numbers: numbersOuter,
      numbersInner
    } = _constants.CLOCK_VALUES[mode];
    let normalizeOuterIndex; // for 12h mode, 12 is actually index 0

    if (mode === _constants.MODE.HOURS_12 && meridiem === 'am') {
      normalizeOuterIndex = i => i % 11 + 1;
    } else if (mode === _constants.MODE.HOURS_12 && meridiem === 'pm') {
      normalizeOuterIndex = i => i % 11 + 13;
    } else {
      // for 24h mode, 12/24 is last index for ring
      normalizeOuterIndex = i => i % 12 + 13;
    }

    const normalizeInnerIndex = i => i % 12 + 1;

    return {
      numbersOuter: numbersOuter.map((value, i) => {
        var _disabledTimeRangeVal;

        return {
          value,
          enabled: (_disabledTimeRangeVal = disabledTimeRangeValidator === null || disabledTimeRangeValidator === void 0 ? void 0 : disabledTimeRangeValidator.validateHour(normalizeOuterIndex(i))) !== null && _disabledTimeRangeVal !== void 0 ? _disabledTimeRangeVal : true
        };
      }),
      numbersInner: numbersInner === null || numbersInner === void 0 ? void 0 : numbersInner.map((value, i) => {
        var _disabledTimeRangeVal2;

        return {
          value,
          enabled: (_disabledTimeRangeVal2 = disabledTimeRangeValidator === null || disabledTimeRangeValidator === void 0 ? void 0 : disabledTimeRangeValidator.validateHour(normalizeInnerIndex(i))) !== null && _disabledTimeRangeVal2 !== void 0 ? _disabledTimeRangeVal2 : true
        };
      })
    };
  }, [mode, meridiem, disabledTimeRangeValidator]);
  return (0, _jsxRuntime.jsxs)(_reactSpring.animated.div, {
    style: {
      opacity
    },
    css: _numbers.numbersWrapperStyle,
    className: "react-timekeeper__clock-hours",
    children: [numbersOuter.map((_ref2, i) => {
      let {
        value,
        enabled
      } = _ref2;
      return (0, _jsxRuntime.jsx)(_reactSpring.animated.span, {
        css: (0, _numbers.numbersStyle)({
          hour24Mode,
          enabled
        }),
        "data-testid": "number_hour_outer",
        style: {
          transform: translateOuter.to(v => (0, _math.transform)(i + 1, v))
        },
        children: value
      }, value);
    }), hour24Mode && numbersInner.map((_ref3, i) => {
      let {
        value,
        enabled
      } = _ref3;
      return (0, _jsxRuntime.jsx)(_reactSpring.animated.span, {
        css: (0, _numbers.numbersStyle)({
          hour24Mode,
          inner: true,
          enabled
        }),
        "data-testid": "number_hour_inner",
        style: {
          transform: translateInner.to(v => (0, _math.transform)(i + 1, v))
        },
        children: value
      }, value);
    })]
  });
}

const HourNumbers = /*#__PURE__*/(0, _react.memo)(Hours, (prev, next) => {
  return prev.mode === next.mode && prev.hour24Mode === next.hour24Mode && prev.meridiem === next.meridiem && prev.disabledTimeRangeValidator === next.disabledTimeRangeValidator;
});
exports.HourNumbers = HourNumbers;

function Minutes(_ref4) {
  let {
    anim,
    hour,
    disabledTimeRangeValidator
  } = _ref4;
  const {
    opacity,
    translate
  } = anim;
  const minutes = (0, _react.useMemo)(() => {
    return _constants.MINUTES.map(value => {
      var _disabledTimeRangeVal3;

      return {
        value,
        enabled: (_disabledTimeRangeVal3 = disabledTimeRangeValidator === null || disabledTimeRangeValidator === void 0 ? void 0 : disabledTimeRangeValidator.validateMinute(hour, parseInt(value, 10))) !== null && _disabledTimeRangeVal3 !== void 0 ? _disabledTimeRangeVal3 : true
      };
    });
  }, [disabledTimeRangeValidator, hour]);
  return (0, _jsxRuntime.jsx)(_reactSpring.animated.div, {
    style: {
      opacity
    },
    css: _numbers.numbersWrapperStyle,
    className: "react-timekeeper__clock-minutes",
    children: minutes.map((_ref5, i) => {
      let {
        value,
        enabled
      } = _ref5;
      return (0, _jsxRuntime.jsx)(_reactSpring.animated.span, {
        css: (0, _numbers.numbersStyle)({
          enabled
        }),
        "data-testid": "number_minute",
        style: {
          transform: translate.to(v => (0, _math.transform)(i + 1, v))
        },
        children: value
      }, value);
    })
  });
}

const MinuteNumbers = /*#__PURE__*/(0, _react.memo)(Minutes, (prev, next) => {
  return prev.disabledTimeRangeValidator === next.disabledTimeRangeValidator && prev.hour === next.hour;
});
exports.MinuteNumbers = MinuteNumbers;