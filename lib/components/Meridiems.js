"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Meridiems;

var _react = require("react");

var _meridiems = require("./styles/meridiems");

var _useStateContext = _interopRequireDefault(require("../hooks/useStateContext"));

var _constants = require("../helpers/constants");

var _jsxRuntime = require("@emotion/react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Meridiems() {
  const {
    time,
    updateMeridiem
  } = (0, _useStateContext.default)();
  const setAM = (0, _react.useCallback)(() => {
    updateMeridiem(_constants.MERIDIEM.am);
  }, [updateMeridiem]);
  const setPM = (0, _react.useCallback)(() => {
    updateMeridiem(_constants.MERIDIEM.pm);
  }, [updateMeridiem]);
  const isPM = time.hour >= 12;
  return (0, _jsxRuntime.jsxs)("div", {
    css: _meridiems.meridiemWrapper,
    children: [(0, _jsxRuntime.jsx)("button", {
      type: "button",
      css: (0, _meridiems.meridiem)({
        isSelected: !isPM
      }),
      "data-testid": "meridiem_am",
      className: "react-timekeeper-button-reset react-timekeeper__meridiem-toggle ".concat(!isPM ? 'react-timekeeper__meridiem--active' : ''),
      onClick: setAM,
      children: "AM"
    }), (0, _jsxRuntime.jsx)("button", {
      type: "button",
      css: (0, _meridiems.meridiem)({
        isRight: true,
        isSelected: isPM
      }),
      "data-testid": "meridiem_pm",
      className: "react-timekeeper-button-reset react-timekeeper__meridiem-toggle ".concat(isPM ? 'react-timekeeper__meridiem--active' : ''),
      onClick: setPM,
      children: "PM"
    })]
  });
}