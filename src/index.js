const mongoose = require('mongoose')
const mysql = require('mysql2')

const MongoDBLog = require('./MongoDBLog')
const MysqlLog = require('./MysqlLog')

const Levels = {
  FATAL: 0,
  ERROR: 10,
  WARN: 20,
  INFO: 30,
  DEBUG: 40 
}

class FlexLogger {

  constructor(connectionType, connectionString, collectionName) {
    this.connectionType = connectionType;
    this.collectionName = collectionName
    if(typeof connectionString === 'string') {
      switch (this.connectionType) {
        case 'mongodb': 
          mongoose.connect(connectionString, {useNewUrlParser: true})
          this.db = mongoose;
        break;
        case 'mysql':
          var connectionObject = this.parseConnectionString(connectionString)
          const connection = mysql.createConnection({
            host: connectionObject.host,
            user: connectionObject.user,
            password: connectionObject.password,
            database: connectionObject.dbname
          });
          this.db = connection;
        break;
        default: 
          throw new TypeError('Invalid connection type.')
      }
    } else {
      throw new TypeError('Not supported connection string type.')
    }
  }


  parseConnectionString(connectionString) {
    if(this.connectionType === 'mysql') {
      let connectionStringParsed = connectionString.match(/(?<key>[^=;,]+)=(?<val>[^;,]+(,\d+)?)/g);
      if(typeof connectionStringParsed === "object") {
        let connectionObject = {};
        // get as a key: value
        connectionStringParsed.map((el) => {
          var args = el.split('=');
          connectionObject[args[0]] = args[1];
        })
        return connectionObject;
      }
    } else {
      return connectionString;
    } 
  }

  log(msg, level) {
    let log = null;
    switch(this.connectionType) {
      case 'mongodb':
        log = new MongoDBLog(this.db, msg, level, this.collectionName)
      break;
      case 'mysql':
        log = new MysqlLog(this.db, msg, level, this.collectionName)
      break;
    }
    log.save()
  }


  error(msg) {
    this.log(msg, Levels.ERROR)
  }

  warn(msg) {
    this.log(msg, Levels.WARN)
  }

  info(msg) {
    this.log(msg, Levels.INFO)
  }

  debug(msg) {
    this.log(msg, Levels.DEBUG)
  }
  
}

module.exports = FlexLogger;