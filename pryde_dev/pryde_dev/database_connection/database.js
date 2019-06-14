let mongoose = require('mongoose');
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'fcc-Mail';      // REPLACE WITH YOUR DB NAME
class Database {
  constructor() {
    this._connect()
  }
_connect() {
    // mongoose.connect(`mongodb://${server}/${database}`)
    mongoose.connect('mongodb://pryde:pryde123@ds155916.mlab.com:55916/pryde')
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
module.exports = new Database()