"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimepickerWithConfig;

var _TimeKeeper = _interopRequireDefault(require("./TimeKeeper"));

var _useConfigContext = require("../hooks/useConfigContext");

var _useStateContext = require("../hooks/useStateContext");

var _jsxRuntime = require("@emotion/react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TimepickerWithConfig(_ref) {
  let {
    time,
    onChange,
    // config props:
    coarseMinutes,
    forceCoarseMinutes,
    switchToMinuteOnHourSelect,
    switchToMinuteOnHourDropdownSelect,
    closeOnMinuteSelect,
    hour24Mode,
    onDoneClick,
    doneButton,
    disabledTimeRange
  } = _ref;
  return (0, _jsxRuntime.jsx)(_useConfigContext.ConfigProvider, {
    coarseMinutes: coarseMinutes,
    forceCoarseMinutes: forceCoarseMinutes,
    switchToMinuteOnHourSelect: switchToMinuteOnHourSelect,
    switchToMinuteOnHourDropdownSelect: switchToMinuteOnHourDropdownSelect,
    closeOnMinuteSelect: closeOnMinuteSelect,
    hour24Mode: hour24Mode,
    onDoneClick: onDoneClick,
    doneButton: doneButton,
    children: (0, _jsxRuntime.jsx)(_useStateContext.StateProvider, {
      onChange: onChange,
      time: time,
      disabledTimeRange: disabledTimeRange,
      children: (0, _jsxRuntime.jsx)(_TimeKeeper.default, {})
    })
  });
}