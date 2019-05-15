/* 

  Author: Furkan Demir
  Github: https://github.com/frndmr/flex-logger
  Npm: https://www.npmjs.com/package/flex-logger

*/

import * as mysql from 'mysql2';
import * as mongoose from 'mongoose';


enum LogLevel {
  FATAL = 0,
  ERROR = 10,
  WARN = 20,
  INFO = 30,
  DEBUG = 40 
}

interface IOptions {
  connectionString: string,
  collectionName: string,
}

interface IConnectionObject {
  uid: String,
  password: String,
  host: String,
  db: String,
  uri: String
}

class FlexLogger {

  databaseManagmentSystems: Array<String> = ["mysql", "mongodb"];
  
  isConnected: Boolean = false;

  db: any;

  constructor(Options: IOptions) {

    let connectionStringParsed: any = Options.connectionString.match(/(?<key>[^=;,]+)=(?<val>[^;,]+(,\d+)?)/g);
    let databaseManagmentSystem: string = Options.connectionString.split(":")[0];

    if(this.databaseManagmentSystems.includes(databaseManagmentSystem)) {
      if(typeof connectionStringParsed === "object") {
        let connectionObject: any = {};
        // get as a key: value
        connectionStringParsed.map((el: any) => {
          var args: any = el.split('=');
          connectionObject[args[0]] = args[1];
        })
        if(connectionObject != null) {
          try {
            this.connect(connectionObject, databaseManagmentSystem);
          } catch(err) {
            throw new TypeError(`Connection could not be established.`);
          }
        } else {
          throw new TypeError(`Connection string could not parsed.`);
        }
      } else {
        throw new TypeError(`Invalid connection string.`);
      }
    } else {
      throw new TypeError(`Invalid database type`);
    }
  }
  
  private connect(connectionObject: IConnectionObject, databaseManagmentSystem: String) {
    switch (databaseManagmentSystem) {
      case "mysql":
        this.db = mysql.createConnection({
          host: connectionObject.host,
          user: connectionObject.uid,
          database: connectionObject.db
        }, (err: any, con: any) => {
          if(err) { 
            throw new Error(err);
          } else {
            this.isConnected = true;
            this.db = con;
          }
        });
      break;
      case "mongodb":
        mongoose.connect(connectionObject.uri, {useFindAndModify: false,useNewUrlParser: true,useCreateIndex: true})
        .then((mongoDBCon: object) => {
          this.db = mongoDBCon;
        })
        .catch((err: any) => {
          throw new Error(err)
        })
      break;
    }
  }

  private log(level: LogLevel) {
    
  }

  public fatal() {

  }

  public error() {

  }
  
  public warn() {

  }

  public info() {

  }

  public debug() {

  }
}

export default FlexLogger;