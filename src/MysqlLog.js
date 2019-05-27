class MysqlLog {
  
  constructor(db, log, level, tableName) {
    this.db = db;
    this.log = log;
    this.level = level;
    this.tableName = tableName;
  }

  check() {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT * FROM ${this.tableName}`, (err, results, fields) => {
        if(typeof results === 'undefined') {
          this.db.query('CREATE TABLE '+ this.tableName +' ( `id` INT(11) NOT NULL AUTO_INCREMENT , `message` TEXT NOT NULL , `level` INT(11) NOT NULL , `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`))', (err, results, fields) => {
            if(!err) resolve()
          })
        }
      })
    })
  }

  save() {
    return new Promise((resolve, reject) => {
      this.check().then(() => {
        this.db.query(`INSERT ${this.tableName} SET message='${this.log}', level = ${this.level}`)
      })
    })
  }

}

module.exports = MysqlLog;