var FlexLogger = require('./src')

var logger = new FlexLogger('mysql:host=localhost;db=test;uid=root;password=;', 'logs')

logger.init().then(() => {
  logger.log()
}).catch((err) => {
  console.log(err)
})
