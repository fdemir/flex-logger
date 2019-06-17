/** 
 * Firstly we should use require the flex logger
 */
const FlexLogger = require('flex-logger');

/** 
 * then we create instance from flex-logger
 */

const logger = new FlexLogger('mongodb', 'mongodb+srv://username:password@host/dbname', 'collectionName');

/** 
 * and finally we export the instance for use other files. 
 */

module.exports = logger;