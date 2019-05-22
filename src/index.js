
const Level = {
  FATAL: 0,
  ERROR: 10,
  WARN: 20,
  INFO: 30,
  DEBUG: 40 
}

const MysqlLog = require('./MysqlLog')


class FlexLogger {

  constructor(connectionString, collectionName) {
    this.connectionObject = this.parseConnectionString(connectionString)
    this.collectionName = collectionName
  }

  init() {
    return new Promise((resolve, reject) => {
      var self = this;
      switch(this.databaseManagmentSystem) {
        case 'mysql':
          const mysqlLog = new MysqlLog(this.connectionObject, this.collectionName)
          mysqlLog.connect().then(() => {
            resolve(true)
            self.database = mysqlLog;
          }).catch((err) => {
            reject(err)
          })
        break;
      }
    })
  }


  parseConnectionString(connectionString) {
    let databaseManagmentSystem = connectionString.split(":")[0];
    connectionString = connectionString.split(':')[1]; 
    let connectionStringParsed = connectionString.match(/(?<key>[^=;,]+)=(?<val>[^;,]+(,\d+)?)/g);
    if(databaseManagmentSystem === 'mysql' || databaseManagmentSystem === 'mongodb') {
      this.databaseManagmentSystem = databaseManagmentSystem;
      if(typeof connectionStringParsed === "object") {
        let connectionObject = {};
        // get as a key: value
        connectionStringParsed.map((el) => {
          var args = el.split('=');
          connectionObject[args[0]] = args[1];
        })
        return connectionObject;
      }
    }
  }

  log(msg, level) {
    this.database.save('Deneme logggggggg', Level.FATAL)
  }
  
}

module.exports = FlexLogger;