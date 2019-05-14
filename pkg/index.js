"use strict";
/*

  Author: Furkan Demir
  Github: https://github.com/frndmr/flex-logger
  Npm: https://www.npmjs.com/package/flex-logger

*/
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["FATAL"] = 0] = "FATAL";
    LogLevel[LogLevel["ERROR"] = 10] = "ERROR";
    LogLevel[LogLevel["WARN"] = 20] = "WARN";
    LogLevel[LogLevel["INFO"] = 30] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 40] = "DEBUG";
})(LogLevel || (LogLevel = {}));
var FlexLogger = /** @class */ (function () {
    function FlexLogger(opt) {
        this.isConnected = false;
    }
    FlexLogger.prototype.connect = function () {
    };
    FlexLogger.prototype.log = function (string) {
    };
    FlexLogger.prototype.fatal = function () {
    };
    FlexLogger.prototype.error = function () {
    };
    FlexLogger.prototype.warn = function () {
    };
    FlexLogger.prototype.info = function () {
    };
    FlexLogger.prototype.debug = function () {
    };
    return FlexLogger;
}());
exports.default = FlexLogger;
