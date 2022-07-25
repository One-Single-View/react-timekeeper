"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimeDropdown;

var _react = require("react");

var styles = _interopRequireWildcard(require("./styles/time-dropdown"));

var _useConfigContext = _interopRequireDefault(require("../hooks/useConfigContext"));

var _dom = require("../helpers/dom");

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _useStateContext = _interopRequireDefault(require("../hooks/useStateContext"));

var _jsxRuntime = require("@emotion/react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let scrollbarWidth = null;

function TimeDropdown(_ref) {
  let {
    close
  } = _ref;
  const {
    hour24Mode
  } = (0, _useConfigContext.default)();
  const {
    updateTimeValue,
    mode,
    time,
    meridiem,
    disabledTimeRangeValidator
  } = (0, _useStateContext.default)();
  const container = (0, _react.useRef)(null);
  const selectedOption = (0, _react.useRef)(null);
  const options = (0, _react.useMemo)(() => {
    const o = _constants.CLOCK_VALUES[mode].dropdown;

    let validator = () => true;

    if (disabledTimeRangeValidator) {
      if (mode === _constants.MODE.HOURS_12) {
        if (meridiem === 'am') {
          validator = (_, i) => disabledTimeRangeValidator.validateHour((i + 1) % 12);
        } else {
          validator = (_, i) => {
            // account for last number (12) which should be first (noon, 1pm, ...) in 24h format
            const num = i === 11 ? 12 : i + 13;
            return disabledTimeRangeValidator.validateHour(num);
          };
        }
      } else if (mode === _constants.MODE.HOURS_24) {
        validator = (_, i) => disabledTimeRangeValidator.validateHour((i + 1) % 24);
      } else if (mode === _constants.MODE.MINUTES) {
        validator = v => disabledTimeRangeValidator.validateMinute(time.hour, parseInt(v, 10));
      }
    }

    return o.map((value, i) => ({
      value,
      enabled: validator(value, i)
    }));
  }, [mode, disabledTimeRangeValidator, meridiem, time.hour]);
  const selected = (0, _utils.getNormalizedTimeValue)(mode, time).toString();

  function disableBodyScroll() {
    document.documentElement.style.paddingRight = scrollbarWidth + 'px';
    document.documentElement.classList.add('react-timekeeper-noscroll');
  }

  function enableBodyScroll() {
    document.documentElement.style.paddingRight = '0';
    document.documentElement.classList.remove('react-timekeeper-noscroll');
  }

  const elsewhereClick = (0, _react.useCallback)(e => {
    if (!container.current || !e.target) {
      return;
    }

    if (!container.current.contains(e.target)) {
      close();
    }
  }, [close]);
  (0, _react.useEffect)(() => {
    // measure scroll bar width for first time
    if (scrollbarWidth == null) {
      scrollbarWidth = (0, _dom.getScrollBarWidth)();
    } // initial scroll in list


    if (selectedOption.current && container.current) {
      container.current.scrollTop = selectedOption.current.offsetTop;
    } // listener to close if click outside dropdown


    document.addEventListener('click', elsewhereClick, false);
    return () => {
      document.removeEventListener('click', elsewhereClick, false);
      enableBodyScroll();
    };
  }, [elsewhereClick]); // select a value

  function select(val, enabled) {
    if (!enabled) return;
    let parsed = parseInt(val, 10);

    if (mode === _constants.MODE.HOURS_12 && parsed === 12) {
      parsed = 0;
    }

    updateTimeValue(parsed, {
      type: 'dropdown'
    });
    close();
  }

  return (0, _jsxRuntime.jsx)("div", {
    css: styles.wrapper(hour24Mode, mode),
    ref: container,
    onMouseEnter: disableBodyScroll,
    onMouseLeave: enableBodyScroll,
    className: "react-timekeeper__time-dropdown",
    "data-testid": "time-dropdown",
    children: (0, _jsxRuntime.jsx)("ul", {
      css: styles.options,
      className: "react-timekeeper__dropdown-numbers",
      children: options.map(_ref2 => {
        let {
          value,
          enabled
        } = _ref2;
        const isSelected = selected === value;
        return (0, _jsxRuntime.jsx)("li", {
          ref: el => isSelected ? selectedOption.current = el : '',
          className: "react-timekeeper__dropdown-number ".concat(isSelected ? 'react-timekeeper__dropdown-number--active' : ''),
          css: styles.option({
            active: isSelected,
            enabled
          }),
          onClick: () => select(value, enabled),
          "data-testid": "time-dropdown_number",
          children: value
        }, value);
      })
    })
  });
}