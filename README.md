# Flex Logger
This package saves the logs inside the database. It is so simple and very easy to use. It's supports MongoDB and Mysql. You dont need a create a table. If there is no table , it is gonna create automatically.
## Install

```
$ npm install flex-logger
```

## Documentation

### Quick Start

```js
const FlexLogger = require('flex-logger')
```
Firstly you must create instance from flex logger class. Flex logger constructor can take arguments.

**Example MongoDB Instance**
```js
const logger = new FlexLogger('mongodb', 'mongodb+srv://username:password@host/dbname', 'collectionName')
```

**Example Mysql Instance**
```js
const logger = new FlexLogger('mysql', 'host=localhost;user=root;password=;dbname=test;', 'tableName')
```

There is five log level has automatically created. Each level has own unique number. 

Now logging time

**Example Log**

```
  FATAL: 0
  ERROR: 10
  WARN: 20
  INFO: 30
  DEBUG: 40
```

```js
logger.fatal('fatal error')
logger.error('something is wrong')
logger.warn('it is gonna explode')
logger.info('i am super')
logger.debug('debug')

```

For more example please look at the examples folder. And, just let me know when you find a bug.

## Contributors
- Furkan Demir <frndemir@gmail.com>

## Lisence & Copyright

@ Furkan Demir

Lisenced under the [MIT Lisence](LISENCE)
