
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'pryde';      // REPLACE WITH YOUR DB NAME


// Initialize connection once
module.exports={
    mlab:()=>{ 
             return MongoClient.connect(`mongodb://${server}/${database}`)
            },
    con:()=>{
             return MongoClient.connect('mongodb://pryde:pryde123@ds155916.mlab.com:55916/pryde')
    } ,
    mongoURI: "mongodb://pryde:pryde123@ds155916.mlab.com:55916/pryde"       

    }
