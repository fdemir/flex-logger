var FlexLogger = require('./pkg')


try {
  var logger = new FlexLogger.default({
    connectionString: 'mysql:host=localhost;db=test;uid=root;password= ;'
  })
} catch(err) {
  console.log(err)
} 