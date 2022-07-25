"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TimeInput", {
  enumerable: true,
  get: function () {
    return _types.TimeInput;
  }
});
Object.defineProperty(exports, "TimeOutput", {
  enumerable: true,
  get: function () {
    return _types.TimeOutput;
  }
});
exports.default = void 0;

var _TimeKeeperContainer = _interopRequireDefault(require("./components/TimeKeeperContainer"));

var _types = require("./helpers/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/// <reference types="@emotion/react/types/css-prop" />
var _default = _TimeKeeperContainer.default;
exports.default = _default;