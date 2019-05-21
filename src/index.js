
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
    let connectionObject = this.parseConnectionString(connectionString);
    if(typeof connectionObject === "object") {
      switch(this.databaseManagmentSystem) {
        case 'mysql':
          const mysqlCon = new MysqlLog(connectionObject);
        break;
        case 'mongodb':
          // this.db = .....
        break;
      }
    } else {
      throw new TypeError(`Connection string could not parsed.`);
    }
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
  
}

module.exports = FlexLogger;