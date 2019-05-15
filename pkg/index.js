"use strict";
/*

  Author: Furkan Demir
  Github: https://github.com/frndmr/flex-logger
  Npm: https://www.npmjs.com/package/flex-logger

*/
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql2");
var mongoose = require("mongoose");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["FATAL"] = 0] = "FATAL";
    LogLevel[LogLevel["ERROR"] = 10] = "ERROR";
    LogLevel[LogLevel["WARN"] = 20] = "WARN";
    LogLevel[LogLevel["INFO"] = 30] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 40] = "DEBUG";
})(LogLevel || (LogLevel = {}));
var FlexLogger = /** @class */ (function () {
    function FlexLogger(Options) {
        this.databaseManagmentSystems = ["mysql", "mongodb"];
        this.isConnected = false;
        var connectionStringParsed = Options.connectionString.match(/(?<key>[^=;,]+)=(?<val>[^;,]+(,\d+)?)/g);
        var databaseManagmentSystem = Options.connectionString.split(":")[0];
        if (this.databaseManagmentSystems.includes(databaseManagmentSystem)) {
            if (typeof connectionStringParsed === "object") {
                var connectionObject_1 = {};
                // get as a key: value
                connectionStringParsed.map(function (el) {
                    var args = el.split('=');
                    connectionObject_1[args[0]] = args[1];
                });
                if (connectionObject_1 != null) {
                    try {
                        this.connect(connectionObject_1, databaseManagmentSystem);
                    }
                    catch (err) {
                        throw new TypeError("Connection could not be established.");
                    }
                }
                else {
                    throw new TypeError("Connection string could not parsed.");
                }
            }
            else {
                throw new TypeError("Invalid connection string.");
            }
        }
        else {
            throw new TypeError("Invalid database type");
        }
    }
    FlexLogger.prototype.connect = function (connectionObject, databaseManagmentSystem) {
        var _this = this;
        switch (databaseManagmentSystem) {
            case "mysql":
                this.db = mysql.createConnection({
                    host: connectionObject.host,
                    user: connectionObject.uid,
                    database: connectionObject.db
                }, function (err, con) {
                    if (err) {
                        throw new Error(err);
                    }
                    else {
                        _this.isConnected = true;
                        _this.db = con;
                    }
                });
                break;
            case "mongodb":
                mongoose.connect(connectionObject.uri, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true })
                    .then(function (mongoDBCon) {
                    _this.db = mongoDBCon;
                })
                    .catch(function (err) {
                    throw new Error(err);
                });
                break;
        }
    };
    FlexLogger.prototype.log = function (level) {
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
