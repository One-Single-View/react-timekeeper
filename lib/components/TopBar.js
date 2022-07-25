"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TopBar;

var _react = require("react");

var _TimeDropdown = _interopRequireDefault(require("./TimeDropdown"));

var _useStateContext = _interopRequireDefault(require("../hooks/useStateContext"));

var _useConfigContext = _interopRequireDefault(require("../hooks/useConfigContext"));

var styles = _interopRequireWildcard(require("./styles/top-bar"));

var _constants = require("../helpers/constants");

var _utils = require("../helpers/utils");

var _jsxRuntime = require("@emotion/react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TopBar() {
  const {
    hour24Mode
  } = (0, _useConfigContext.default)();
  const {
    mode,
    time,
    updateMeridiem,
    setMode
  } = (0, _useStateContext.default)();
  const [open, setOpen] = (0, _react.useState)(null); // time clicks

  function timeClick(type) {
    const current = mode === _constants.MODE.MINUTES ? 'minute' : 'hour';

    if (type === current) {
      setOpen(current);
    } else {
      const m = mode === _constants.MODE.MINUTES ? _constants.MODE.HOURS_24 : _constants.MODE.MINUTES;
      setMode(m);
    }
  } // double ternary nastiness


  const hour = hour24Mode ? time.hour : time.hour % 12 === 0 ? 12 : time.hour % 12; // meridiem

  const meridiem = time.hour >= 12 ? _constants.MERIDIEM.pm : _constants.MERIDIEM.am;

  function toggleMeridiem() {
    const m = meridiem === _constants.MERIDIEM.am ? _constants.MERIDIEM.pm : _constants.MERIDIEM.am;
    updateMeridiem(m);
  }

  const isHour = (0, _utils.isHourMode)(mode);
  const formattedMinute = ('0' + time.minute).slice(-2);

  const closeDropdown = () => setOpen(null);

  return (0, _jsxRuntime.jsxs)("div", {
    css: styles.wrapper(hour24Mode),
    className: "react-timekeeper__top-bar",
    "data-testid": "topbar",
    children: [(0, _jsxRuntime.jsxs)("div", {
      css: styles.hourWrapper(hour24Mode),
      className: "react-timekeeper__tb-minute-wrapper",
      children: [(0, _jsxRuntime.jsx)("span", {
        css: [styles.time(isHour), process.env.NODE_ENV === "production" ? "" : ";label:TopBar;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1RvcEJhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0RLIiwiZmlsZSI6Ii4uLy4uL3NyYy9jb21wb25lbnRzL1RvcEJhci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgVGltZURyb3Bkb3duIGZyb20gJy4vVGltZURyb3Bkb3duJ1xuaW1wb3J0IHVzZVRpbWVrZWVwZXJTdGF0ZSBmcm9tICcuLi9ob29rcy91c2VTdGF0ZUNvbnRleHQnXG5pbXBvcnQgdXNlQ29uZmlnIGZyb20gJy4uL2hvb2tzL3VzZUNvbmZpZ0NvbnRleHQnXG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9zdHlsZXMvdG9wLWJhcidcbmltcG9ydCB7IE1PREUsIE1FUklESUVNIH0gZnJvbSAnLi4vaGVscGVycy9jb25zdGFudHMnXG5pbXBvcnQgeyBpc0hvdXJNb2RlIH0gZnJvbSAnLi4vaGVscGVycy91dGlscydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVG9wQmFyKCkge1xuXHRjb25zdCB7IGhvdXIyNE1vZGUgfSA9IHVzZUNvbmZpZygpXG5cdGNvbnN0IHsgbW9kZSwgdGltZSwgdXBkYXRlTWVyaWRpZW0sIHNldE1vZGUgfSA9IHVzZVRpbWVrZWVwZXJTdGF0ZSgpXG5cdGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlPG51bGwgfCAnaG91cicgfCAnbWludXRlJz4obnVsbClcblxuXHQvLyB0aW1lIGNsaWNrc1xuXHRmdW5jdGlvbiB0aW1lQ2xpY2sodHlwZTogJ21pbnV0ZScgfCAnaG91cicpIHtcblx0XHRjb25zdCBjdXJyZW50ID0gbW9kZSA9PT0gTU9ERS5NSU5VVEVTID8gJ21pbnV0ZScgOiAnaG91cidcblx0XHRpZiAodHlwZSA9PT0gY3VycmVudCkge1xuXHRcdFx0c2V0T3BlbihjdXJyZW50KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBtID0gbW9kZSA9PT0gTU9ERS5NSU5VVEVTID8gTU9ERS5IT1VSU18yNCA6IE1PREUuTUlOVVRFU1xuXHRcdFx0c2V0TW9kZShtKVxuXHRcdH1cblx0fVxuXG5cdC8vIGRvdWJsZSB0ZXJuYXJ5IG5hc3RpbmVzc1xuXHRjb25zdCBob3VyID0gaG91cjI0TW9kZSA/IHRpbWUuaG91ciA6IHRpbWUuaG91ciAlIDEyID09PSAwID8gMTIgOiB0aW1lLmhvdXIgJSAxMlxuXG5cdC8vIG1lcmlkaWVtXG5cdGNvbnN0IG1lcmlkaWVtID0gdGltZS5ob3VyID49IDEyID8gTUVSSURJRU0ucG0gOiBNRVJJRElFTS5hbVxuXHRmdW5jdGlvbiB0b2dnbGVNZXJpZGllbSgpIHtcblx0XHRjb25zdCBtID0gbWVyaWRpZW0gPT09IE1FUklESUVNLmFtID8gTUVSSURJRU0ucG0gOiBNRVJJRElFTS5hbVxuXHRcdHVwZGF0ZU1lcmlkaWVtKG0pXG5cdH1cblxuXHRjb25zdCBpc0hvdXIgPSBpc0hvdXJNb2RlKG1vZGUpXG5cdGNvbnN0IGZvcm1hdHRlZE1pbnV0ZSA9ICgnMCcgKyB0aW1lLm1pbnV0ZSkuc2xpY2UoLTIpXG5cblx0Y29uc3QgY2xvc2VEcm9wZG93biA9ICgpID0+IHNldE9wZW4obnVsbClcblxuXHRyZXR1cm4gKFxuXHRcdDxkaXZcblx0XHRcdGNzcz17c3R5bGVzLndyYXBwZXIoaG91cjI0TW9kZSl9XG5cdFx0XHRjbGFzc05hbWU9XCJyZWFjdC10aW1la2VlcGVyX190b3AtYmFyXCJcblx0XHRcdGRhdGEtdGVzdGlkPVwidG9wYmFyXCJcblx0XHQ+XG5cdFx0XHR7LyogaG91ciAqL31cblx0XHRcdDxkaXZcblx0XHRcdFx0Y3NzPXtzdHlsZXMuaG91cldyYXBwZXIoaG91cjI0TW9kZSl9XG5cdFx0XHRcdGNsYXNzTmFtZT1cInJlYWN0LXRpbWVrZWVwZXJfX3RiLW1pbnV0ZS13cmFwcGVyXCJcblx0XHRcdD5cblx0XHRcdFx0PHNwYW5cblx0XHRcdFx0XHRjc3M9e1tzdHlsZXMudGltZShpc0hvdXIpXX1cblx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB0aW1lQ2xpY2soJ2hvdXInKX1cblx0XHRcdFx0XHRkYXRhLXRlc3RpZD1cInRvcGJhcl9ob3VyXCJcblx0XHRcdFx0XHRjbGFzc05hbWU9e2ByZWFjdC10aW1la2VlcGVyX190Yi1ob3VyICR7XG5cdFx0XHRcdFx0XHRpc0hvdXIgPyAncmVhY3QtdGltZWtlZXBlcl9fdGItaG91ci0tYWN0aXZlJyA6ICcnXG5cdFx0XHRcdFx0fWB9XG5cdFx0XHRcdD5cblx0XHRcdFx0XHR7aG91cn1cblx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHR7b3BlbiA9PT0gJ2hvdXInICYmIDxUaW1lRHJvcGRvd24gY2xvc2U9e2Nsb3NlRHJvcGRvd259IC8+fVxuXHRcdFx0PC9kaXY+XG5cblx0XHRcdDxzcGFuIGNzcz17c3R5bGVzLmNvbG9ufSBjbGFzc05hbWU9XCJyZWFjdC10aW1la2VlcGVyX190Yi1jb2xvblwiPlxuXHRcdFx0XHQ6XG5cdFx0XHQ8L3NwYW4+XG5cblx0XHRcdHsvKiBtaW51dGUgKi99XG5cdFx0XHQ8ZGl2XG5cdFx0XHRcdGNzcz17c3R5bGVzLm1pbnV0ZVdyYXBwZXIoaG91cjI0TW9kZSl9XG5cdFx0XHRcdGNsYXNzTmFtZT1cInJlYWN0LXRpbWVrZWVwZXJfX3RiLWhvdXItd3JhcHBlclwiXG5cdFx0XHQ+XG5cdFx0XHRcdDxzcGFuXG5cdFx0XHRcdFx0Y3NzPXtzdHlsZXMudGltZSghaXNIb3VyKX1cblx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB0aW1lQ2xpY2soJ21pbnV0ZScpfVxuXHRcdFx0XHRcdGRhdGEtdGVzdGlkPVwidG9wYmFyX21pbnV0ZVwiXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXtgcmVhY3QtdGltZWtlZXBlcl9fdGItbWludXRlICR7XG5cdFx0XHRcdFx0XHRpc0hvdXIgPyAnJyA6ICdyZWFjdC10aW1la2VlcGVyX190Yi1taW51dGUtLWFjdGl2ZSdcblx0XHRcdFx0XHR9YH1cblx0XHRcdFx0PlxuXHRcdFx0XHRcdHtmb3JtYXR0ZWRNaW51dGV9XG5cdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0e29wZW4gPT09ICdtaW51dGUnICYmIDxUaW1lRHJvcGRvd24gY2xvc2U9e2Nsb3NlRHJvcGRvd259IC8+fVxuXHRcdFx0PC9kaXY+XG5cblx0XHRcdHsvKiBtZXJpZGllbSAqL31cblx0XHRcdHshaG91cjI0TW9kZSAmJiAoXG5cdFx0XHRcdDxidXR0b25cblx0XHRcdFx0XHRuYW1lPVwibWVyaWRpZW1cIlxuXHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e3RvZ2dsZU1lcmlkaWVtfVxuXHRcdFx0XHRcdGNzcz17c3R5bGVzLm1lcmlkaWVtfVxuXHRcdFx0XHRcdGRhdGEtdGVzdGlkPVwidG9wYmFyX21lcmlkaWVtXCJcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJyZWFjdC10aW1la2VlcGVyLWJ1dHRvbi1yZXNldCByZWFjdC10aW1la2VlcGVyX190Yi1tZXJpZGllbVwiXG5cdFx0XHRcdD5cblx0XHRcdFx0XHR7bWVyaWRpZW19XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0KX1cblx0XHQ8L2Rpdj5cblx0KVxufVxuIl19 */"],
        onClick: () => timeClick('hour'),
        "data-testid": "topbar_hour",
        className: "react-timekeeper__tb-hour ".concat(isHour ? 'react-timekeeper__tb-hour--active' : ''),
        children: hour
      }), open === 'hour' && (0, _jsxRuntime.jsx)(_TimeDropdown.default, {
        close: closeDropdown
      })]
    }), (0, _jsxRuntime.jsx)("span", {
      css: styles.colon,
      className: "react-timekeeper__tb-colon",
      children: ":"
    }), (0, _jsxRuntime.jsxs)("div", {
      css: styles.minuteWrapper(hour24Mode),
      className: "react-timekeeper__tb-hour-wrapper",
      children: [(0, _jsxRuntime.jsx)("span", {
        css: styles.time(!isHour),
        onClick: () => timeClick('minute'),
        "data-testid": "topbar_minute",
        className: "react-timekeeper__tb-minute ".concat(isHour ? '' : 'react-timekeeper__tb-minute--active'),
        children: formattedMinute
      }), open === 'minute' && (0, _jsxRuntime.jsx)(_TimeDropdown.default, {
        close: closeDropdown
      })]
    }), !hour24Mode && (0, _jsxRuntime.jsx)("button", {
      name: "meridiem",
      type: "button",
      onClick: toggleMeridiem,
      css: styles.meridiem,
      "data-testid": "topbar_meridiem",
      className: "react-timekeeper-button-reset react-timekeeper__tb-meridiem",
      children: meridiem
    })]
  });
}