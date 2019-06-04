const FlexLogger = require('../')

const logger = new FlexLogger('mysql', 'host=localhost;user=root;password=root;dbname=test;')

logger.on(10, (msg, level) => {
  logger.info('error bir log oldu ben handlerym')
})

logger.error('xd')