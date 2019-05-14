/* 

  Author: Furkan Demir
  Github: https://github.com/frndmr/flex-logger
  Npm: https://www.npmjs.com/package/flex-logger

*/

enum LogLevel {
  FATAL = 0,
  ERROR = 10,
  WARN = 20,
  INFO = 30,
  DEBUG = 40 
}
 
interface Options { 
  // mysql = "mysql:host:db@user:password"
  // mongodb = "mongodb:connecturi"
  connectionString: string,
  collectionName: string
}

class FlexLogger {

  
  isConnected: Boolean = false;

  constructor(opt: Options) {

  }
  
  private connect() {

  }

  private log(string: LogLevel) {

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