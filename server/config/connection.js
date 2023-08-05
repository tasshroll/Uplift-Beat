const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Jolly-Journal', {
    // // The following option enables the use of the new MongoDB connection string parser
// introduced in the MongoDB Node.js driver version 3.1.0 and later.
// It ensures compatibility with newer MongoDB versions and best practices for
// connection string handling.
// The following option enables the use of the new unified topology engine in the MongoDB
// Node.js driver (version 3.1.0 and later).
// It provides improved server discovery, monitoring, and better resilience
// in handling server changes and failover scenarios.
    useNewUrlParser: true, useUnifiedTopology: true
})

module.exports = mongoose.connection;
