"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useClockEvents;

var _react = require("react");

var _constants = require("../helpers/constants");

var _dom = require("../helpers/dom");

var _math = require("../helpers/math");

const {
  atan2
} = Math;

/*
	solely responsible for transforming click events into
	angles (which are later converted into time depending
	on current mode and other restrictions)
*/
function useClockEvents(clock, handleChange) {
  const wrapper = (0, _react.useRef)(null);
  const calcOffsetCache = (0, _react.useRef)(null);
  const dragCount = (0, _react.useRef)(0);
  const cleanupRef = (0, _react.useRef)(() => {}); // avoid recomputing all the event listeners, prolly unnecessary...

  const handleChangeRef = (0, _react.useRef)(handleChange);
  (0, _react.useEffect)(() => {
    handleChangeRef.current = handleChange;
  }, [handleChange]);
  const calculatePoint = (0, _react.useCallback)((offsetX, offsetY, canAutoChangeMode) => {
    // if user just clicks/taps a number (drag count < 2), then just assume it's a rough tap
    // and force a rounded/coarse number (ie: 1, 2, 3, 4 is tapped, assume 0 or 5)
    const wasTapped = dragCount.current < 2;
    const x = offsetX - _constants.CLOCK_RADIUS;
    const y = -offsetY + _constants.CLOCK_RADIUS;
    const a = atan2(y, x);
    let d = 90 - (0, _math.deg)(a);

    if (d < 0) {
      d = 360 + d;
    } // ensure touch doesn't bleed outside of clock radius


    if (!(0, _math.isWithinRadius)(x, y, _constants.CLOCK_RADIUS) && wasTapped) {
      return false;
    }

    const isInnerClick = (0, _math.isWithinRadius)(x, y, _constants.INNER_NUMBER_RADIUS); // update time on main

    handleChangeRef.current(d, {
      canAutoChangeMode,
      wasTapped,
      isInnerClick
    });
  }, []); // handle mouse + touch changes

  const handleMouseUp = (0, _react.useCallback)(e => {
    if (!clock.current) {
      return;
    }

    clock.current.style.cursor = '';
    const {
      offsetX,
      offsetY
    } = calcOffsetCache.current(e.clientX, e.clientY);
    calculatePoint(offsetX, offsetY, true);
  }, [calculatePoint, clock]);
  const handleTouchEnd = (0, _react.useCallback)(e => {
    const touch = e.targetTouches[0] || e.changedTouches[0];

    if (touch && calcOffsetCache.current) {
      const {
        offsetX,
        offsetY
      } = calcOffsetCache.current(touch.clientX, touch.clientY);
      calculatePoint(offsetX, offsetY, true);
    }
  }, [calculatePoint]);
  const handleMouseDrag = (0, _react.useCallback)(e => {
    if (calcOffsetCache.current) {
      const {
        offsetX,
        offsetY
      } = calcOffsetCache.current(e.clientX, e.clientY);
      calculatePoint(offsetX, offsetY, false);
    }

    dragCount.current++;

    if (dragCount.current === 1 && clock.current) {
      clock.current.style.cursor = '-webkit-grabbing';
      clock.current.style.cursor = 'grabbing';
    }

    e.preventDefault();
    return false;
  }, [calculatePoint, clock]);
  const handleTouchDrag = (0, _react.useCallback)(e => {
    if (calcOffsetCache.current) {
      const touch = e.targetTouches[0];
      const {
        offsetX,
        offsetY
      } = calcOffsetCache.current(touch.clientX, touch.clientY);
      calculatePoint(offsetX, offsetY, false);
    }

    dragCount.current++;
    e.preventDefault();
    return false;
  }, [calculatePoint]); // stop mouse + touch events

  const handleStopDrag = (0, _react.useCallback)(e => {
    cleanupRef.current();

    if (e == null || clock.current == null) {
      return;
    }

    if (isMouseEventEnd(e)) {
      handleMouseUp(e);
    } else if (isTouchEventEnd(e)) {
      handleTouchEnd(e);
    }

    function isMouseEventEnd(e) {
      return e.type === 'mouseup';
    }

    function isTouchEventEnd(e) {
      return e.type === 'touchcancel' || e.type === 'touchend';
    }
  }, [handleMouseUp, handleTouchEnd, clock]); // mouse events

  const handleMouseDown = (0, _react.useCallback)(e => {
    dragCount.current = 0; // terminate if click is outside of clock radius, ie:
    // if clicking meridiem button which overlaps with clock

    if (clock.current) {
      calcOffsetCache.current = (0, _dom.calcOffset)(clock.current);
      const {
        offsetX,
        offsetY
      } = calcOffsetCache.current(e.clientX, e.clientY);
      const x = offsetX - _constants.CLOCK_RADIUS;
      const y = offsetY - _constants.CLOCK_RADIUS;
      if (!(0, _math.isWithinRadius)(x, y, _constants.CLOCK_RADIUS)) return;
    } // add listeners


    document.addEventListener('mousemove', handleMouseDrag, false);
    document.addEventListener('mouseup', handleStopDrag, false);
    wrapper.current && wrapper.current.addEventListener('mouseleave', handleStopDrag, false); // @ts-ignore

    handleMouseDrag(e);
  }, [clock, handleMouseDrag, handleStopDrag]); // touch events

  const handleTouchStart = (0, _react.useCallback)(e => {
    e.preventDefault();
    dragCount.current = 0; // add listeners

    document.addEventListener('touchmove', handleTouchDrag, false);
    document.addEventListener('touchend', handleStopDrag, false);
    document.addEventListener('touchcancel', handleStopDrag, false);

    if (clock.current) {
      calcOffsetCache.current = (0, _dom.calcOffset)(clock.current);
    }
  }, [clock, handleStopDrag, handleTouchDrag]); // attach touchstart event manually to the clock to make it cancelable.

  (0, _react.useEffect)(() => {
    const currentTarget = clock.current;
    const type = 'touchstart';

    if (currentTarget) {
      currentTarget.addEventListener(type, handleTouchStart, false);
    }

    return () => {
      if (currentTarget) {
        currentTarget.removeEventListener(type, handleTouchStart, false);
      }
    };
  }, [clock, handleTouchStart]);
  /*
  	deals with circular dependencies of callback functions; add listener function
  	depends on remove listener function and vice versa
  	on remove listener function which depends on the add listener cb
  */

  (0, _react.useEffect)(() => {
    cleanupRef.current = () => {
      document.removeEventListener('mousemove', handleMouseDrag, false);
      document.removeEventListener('mouseup', handleStopDrag, false);
      wrapper.current && wrapper.current.removeEventListener('mouseleave', handleStopDrag, false);
      document.removeEventListener('touchmove', handleTouchDrag, false);
      document.removeEventListener('touchend', handleStopDrag, false);
      document.removeEventListener('touchcancel', handleStopDrag, false);
    };
  }, [handleMouseDrag, handleStopDrag, handleTouchDrag]); // clean up

  (0, _react.useEffect)(() => {
    return cleanupRef.current;
  }, []);
  return {
    bind: {
      onMouseDown: handleMouseDown,
      ref: wrapper
    }
  };
}