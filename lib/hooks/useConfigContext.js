"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigProvider = ConfigProvider;
exports.configContext = void 0;
exports.default = useConfig;

var _react = _interopRequireWildcard(require("react"));

var _jsxRuntime = require("@emotion/react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const configContext = /*#__PURE__*/(0, _react.createContext)({});
exports.configContext = configContext;

function ConfigProvider(_ref) {
  let {
    children,
    coarseMinutes = 5,
    forceCoarseMinutes = false,
    switchToMinuteOnHourSelect = false,
    switchToMinuteOnHourDropdownSelect = false,
    closeOnMinuteSelect = false,
    hour24Mode = false,
    onDoneClick = null,
    doneButton = null
  } = _ref;
  const config = (0, _react.useMemo)(() => {
    if (coarseMinutes < 1) {
      throw new Error('coarseMinutes must be at least 1');
    }

    return {
      coarseMinutes,
      forceCoarseMinutes,
      switchToMinuteOnHourSelect,
      switchToMinuteOnHourDropdownSelect,
      closeOnMinuteSelect,
      hour24Mode,
      onDoneClick,
      doneButton
    };
  }, [coarseMinutes, forceCoarseMinutes, switchToMinuteOnHourSelect, switchToMinuteOnHourDropdownSelect, closeOnMinuteSelect, onDoneClick, hour24Mode, doneButton]);
  return (0, _jsxRuntime.jsx)(configContext.Provider, {
    value: config,
    children: children
  });
}

function useConfig() {
  return (0, _react.useContext)(configContext);
}