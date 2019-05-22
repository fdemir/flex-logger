const mysql = require('mysql2')

class MysqlLog {

  constructor(connectionObject, collectionName) {
    this.connectionObject = connectionObject;
    this.collectionName = collectionName;
    this.save = this.save;
  }

  connect() {
    var self = this;
    return new Promise((resolve, reject) => {
      let con = self.connectionObject;
      let connection =  mysql.createConnection({
        host: con.host,
        user: con.uid,
        database: con.db,
        password: con.password
      })
      connection.connect((err) => {
        if(err == null) {
          self.con = connection;
          self.isConnect = true;
          self.init().then(() => {
            resolve(self);
          }).catch((err) => {
            reject(err)
          })
        } else {
          self.isConnect = false;
          reject(err)
        }
      });
    })
  }

  init() {
    var self = this;
    return new Promise((resolve, reject) => {
      self.con.query(`SHOW TABLES LIKE '${self.collectionName}'`, (err, result) => {
        if(result.length === 1) {
          resolve(true)
        } else {
          self.con.query('CREATE TABLE '+ self.collectionName +' ( `id` INT(11) NOT NULL AUTO_INCREMENT , `level` INT(2) NOT NULL , `text` TEXT NOT NULL , `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;', (err, result) => {
            reject("Database could not create. Error:" + err);
          })
        }
      })
    })
  }

  save(text, level) {
    this.con.query(`INSERT INTO logs SET level = ${level}, text = '${text}'`, (err, result) => {
      
    })
  }

}

module.exports = MysqlLog;
