class MongoDBLog {
  
  constructor(db, log, level, collectionName) {
    this.log = log;
    this.level = level;
    var schema = new db.Schema({
      level: Number,
      log: String,
      date: {
        type: Date,
        default: Date.now
      }
    })
    this.logs = db.model(collectionName, schema)
  }

  save() {
    return new Promise((resolve, reject) => {
      this.logs.create({level: this.level, log: this.log})
      .catch((err) => reject(err))
    })
  }

}

module.exports = MongoDBLog;