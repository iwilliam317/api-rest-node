const mongoose = require('mongoose');

//database name
mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;