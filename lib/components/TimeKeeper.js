"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimeKeeper;

var _react = require("@emotion/react");

var _global = _interopRequireDefault(require("./styles/global"));

var _main = _interopRequireDefault(require("./styles/main"));

var _TopBar = _interopRequireDefault(require("./TopBar"));

var _ClockWrapper = _interopRequireDefault(require("./ClockWrapper"));

var _DoneButton = _interopRequireDefault(require("./DoneButton"));

var _jsxRuntime = require("@emotion/react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TimeKeeper() {
  return (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [(0, _jsxRuntime.jsx)(_react.Global, {
      styles: /*#__PURE__*/(0, _react.css)(_global.default, process.env.NODE_ENV === "production" ? "" : ";label:TimeKeeper;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1RpbWVLZWVwZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVdtQiIsImZpbGUiOiIuLi8uLi9zcmMvY29tcG9uZW50cy9UaW1lS2VlcGVyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdsb2JhbCwgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnXG5cbmltcG9ydCBnbG9iYWxTdHlsZSBmcm9tICcuL3N0eWxlcy9nbG9iYWwnXG5pbXBvcnQgc3R5bGUgZnJvbSAnLi9zdHlsZXMvbWFpbidcbmltcG9ydCBUb3BCYXIgZnJvbSAnLi9Ub3BCYXInXG5pbXBvcnQgQ2xvY2tXcmFwcGVyIGZyb20gJy4vQ2xvY2tXcmFwcGVyJ1xuaW1wb3J0IERvbmVCdXR0b24gZnJvbSAnLi9Eb25lQnV0dG9uJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUaW1lS2VlcGVyKCkge1xuXHRyZXR1cm4gKFxuXHRcdDw+XG5cdFx0XHQ8R2xvYmFsIHN0eWxlcz17Y3NzKGdsb2JhbFN0eWxlKX0gLz5cblxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZWFjdC10aW1la2VlcGVyXCIgY3NzPXtzdHlsZX0+XG5cdFx0XHRcdDxUb3BCYXIgLz5cblx0XHRcdFx0PENsb2NrV3JhcHBlciAvPlxuXHRcdFx0XHQ8RG9uZUJ1dHRvbiAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC8+XG5cdClcbn1cbiJdfQ== */")
    }), (0, _jsxRuntime.jsxs)("div", {
      className: "react-timekeeper",
      css: _main.default,
      children: [(0, _jsxRuntime.jsx)(_TopBar.default, {}), (0, _jsxRuntime.jsx)(_ClockWrapper.default, {}), (0, _jsxRuntime.jsx)(_DoneButton.default, {})]
    })]
  });
}