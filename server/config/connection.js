const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Jolly-Journal');

module.exports = mongoose.connection;