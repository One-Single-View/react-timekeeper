"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DoneButton;

var _useConfigContext = _interopRequireDefault(require("../hooks/useConfigContext"));

var _doneButton = _interopRequireDefault(require("./styles/done-button"));

var _useStateContext = _interopRequireDefault(require("../hooks/useStateContext"));

var _jsxRuntime = require("@emotion/react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DoneButton() {
  const {
    onDoneClick,
    doneButton
  } = (0, _useConfigContext.default)();
  const {
    getComposedTime
  } = (0, _useStateContext.default)();

  if (doneButton) {
    return doneButton(getComposedTime());
  }

  if (onDoneClick) {
    return (0, _jsxRuntime.jsx)("span", {
      css: _doneButton.default,
      onClick: e => onDoneClick(getComposedTime(), e),
      className: "react-timekeeper__done-button",
      "data-testid": "done-button",
      children: "Done"
    });
  }

  return null;
}