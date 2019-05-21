const mysql = require('mysql2')

class MysqlLog {

  constructor(connectionObject, collection) {
    this.connect(connectionObject).then((connection) => {
      this.connection = connection;
    }).catch((err) => {
      reject(err)
    })
  }

   connect(connectionObject) {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection({
        host: connectionObject.host,
        user: connectionObject.uid,
        database: connectionObject.db,
        password: connectionObject.password
      })
      connection.connect((err) => {
        if(err == null) {
          resolve(connection)
        } else {
          reject(err)
        }
      });
    })
  }

  save() {

  }

}

module.exports = MysqlLog;
