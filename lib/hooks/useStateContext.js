"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateProvider = StateProvider;
exports.default = useTimekeeperState;
exports.stateContext = void 0;

var _react = require("react");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _time = require("../helpers/time");

var _useConfigContext = _interopRequireDefault(require("./useConfigContext"));

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _disableTime = _interopRequireDefault(require("../helpers/disable-time"));

var _jsxRuntime = require("@emotion/react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stateContext = /*#__PURE__*/(0, _react.createContext)({});
exports.stateContext = stateContext;

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TIME':
      return { ...state,
        time: action.time,
        meridiem: action.meridiem || state.meridiem
      };

    case 'SET_MODE':
      return { ...state,
        mode: action.mode
      };

    case 'SET_MERIDIEM':
      return { ...state,
        meridiem: action.meridiem
      };
  }

  return state;
}

function StateProvider(_ref) {
  let {
    onChange,
    time: parentTime,
    children,
    disabledTimeRange
  } = _ref;
  const config = (0, _useConfigContext.default)();
  const [state, dispatch] = (0, _react.useReducer)(reducer, null, () => {
    return {
      time: (0, _time.parseTime)(parentTime),
      mode: config.hour24Mode ? _constants.MODE.HOURS_24 : _constants.MODE.HOURS_12,
      // need meridiem for context when 12h mode, so can tell
      // if user is changing hours before or after 12pm
      meridiem: (0, _time.parseMeridiem)(parentTime)
    };
  });
  const {
    mode,
    time,
    meridiem
  } = state;
  const refTime = (0, _react.useRef)(time); // store onChange as ref to memoize update fn

  const onChangeFn = (0, _react.useRef)(onChange);
  const onDoneClickFn = (0, _react.useRef)(config.onDoneClick);
  (0, _react.useEffect)(() => {
    onChangeFn.current = onChange;
  }, [onChange]);
  (0, _react.useEffect)(() => {
    onDoneClickFn.current = config.onDoneClick;
  }, [config.onDoneClick]);
  const disabledTimeRangeValidator = (0, _react.useMemo)(() => {
    const from = disabledTimeRange === null || disabledTimeRange === void 0 ? void 0 : disabledTimeRange.from;
    const to = disabledTimeRange === null || disabledTimeRange === void 0 ? void 0 : disabledTimeRange.to;

    if (!from || !to) {
      return null;
    }

    return new _disableTime.default(from, to);
  }, [disabledTimeRange === null || disabledTimeRange === void 0 ? void 0 : disabledTimeRange.from, disabledTimeRange === null || disabledTimeRange === void 0 ? void 0 : disabledTimeRange.to]); // handle time update if parent changes

  (0, _react.useEffect)(() => {
    if (parentTime == null) {
      return;
    }

    const newTime = (0, _time.parseTime)(parentTime);

    if ((0, _utils.isSameTime)(newTime, refTime.current)) {
      return;
    }

    const action = {
      type: 'SET_TIME',
      time: (0, _time.parseTime)(parentTime)
    };

    if (!config.hour24Mode) {
      action.meridiem = (0, _time.parseMeridiem)(parentTime);
    }

    dispatch(action);
  }, [config.hour24Mode, parentTime]);
  const getComposedTime = (0, _react.useCallback)(() => {
    const time = refTime.current;
    return (0, _time.composeTime)(time.hour, time.minute, disabledTimeRangeValidator);
  }, [disabledTimeRangeValidator]); // debounced onChange function from parent

  const debounceUpdateParent = (0, _react.useMemo)(() => {
    return (0, _lodash.default)(() => {
      typeof onChangeFn.current === 'function' && onChangeFn.current(getComposedTime());
    }, 80);
  }, [getComposedTime]); // update time on component and then on parent

  const updateTime = (0, _react.useCallback)((newTime, meridiem) => {
    // update component global state
    dispatch({
      type: 'SET_TIME',
      time: newTime,
      meridiem
    });
    refTime.current = newTime; // update time on parent

    debounceUpdateParent();
  }, [debounceUpdateParent]); // update 24 hour time on meridiem change

  function updateMeridiem(newMeridiem) {
    if (meridiem === newMeridiem) {
      return;
    }

    const newTime = {
      minute: time.minute,
      hour: 0
    };

    if (newMeridiem === 'am') {
      newTime.hour = time.hour - 12;
    } else if (newMeridiem === 'pm') {
      newTime.hour = time.hour + 12;
    }

    updateTime(newTime, newMeridiem);
  }

  const setMode = (0, _react.useCallback)(mode => {
    let m = mode;

    if ((0, _utils.isHourMode)(mode)) {
      m = config.hour24Mode ? _constants.MODE.HOURS_24 : _constants.MODE.HOURS_12;
    }

    dispatch({
      type: 'SET_MODE',
      mode: m
    });
  }, [config.hour24Mode]); // handle any side effects from changing the time (ie: change mode, trigger done clicks)

  const handleUpdateTimeSideEffects = (0, _react.useCallback)(source => {
    if (source.type === 'clock' && source.canAutoChangeMode) {
      if (config.switchToMinuteOnHourSelect && (0, _utils.isHourMode)(mode)) {
        setMode(_constants.MODE.MINUTES);
      } else if (config.closeOnMinuteSelect && (0, _utils.isMinuteMode)(mode) && onDoneClickFn.current) {
        onDoneClickFn.current(getComposedTime());
      }
    } else if (source.type === 'dropdown') {
      if (config.switchToMinuteOnHourDropdownSelect && (0, _utils.isHourMode)(mode)) {
        setMode(_constants.MODE.MINUTES);
      }
    }
  }, [config.switchToMinuteOnHourSelect, config.closeOnMinuteSelect, config.switchToMinuteOnHourDropdownSelect, getComposedTime, mode, setMode]); // this method is called only due to changes in clock actions

  const updateTimeValue = (0, _react.useCallback)((val, source) => {
    // account if minutes is 60 (eg: 59 rounded to 60)
    val = val % 60; // account for max number being 12 during 12h mode

    if (mode === _constants.MODE.HOURS_12 && meridiem === 'pm') {
      val += 12;
    }

    const unit = (0, _utils.isHourMode)(mode) ? 'hour' : 'minute';
    const time = refTime.current; // perf to avoid unecessary updates when dragging on clock

    if (time[unit] === val && source.type === 'clock' && !source.canAutoChangeMode) {
      return;
    } // if time is blocked off, dont update


    if (disabledTimeRangeValidator) {
      if ((0, _utils.isHourMode)(mode) && !disabledTimeRangeValidator.validateHour(val) || (0, _utils.isMinuteMode)(mode) && !disabledTimeRangeValidator.validateMinute(time.hour, val)) {
        return;
      }
    }

    handleUpdateTimeSideEffects(source); // generate new time and update timekeeper state

    const newTime = { ...time,
      [unit]: val
    };
    updateTime(newTime);
  }, [mode, meridiem, handleUpdateTimeSideEffects, disabledTimeRangeValidator, updateTime]);
  const value = {
    time,
    mode,
    updateTimeValue,
    updateMeridiem,
    setMode,
    getComposedTime,
    disabledTimeRangeValidator,
    meridiem
  };
  return (0, _jsxRuntime.jsx)(stateContext.Provider, {
    value: value,
    children: children
  });
}

function useTimekeeperState() {
  return (0, _react.useContext)(stateContext);
}