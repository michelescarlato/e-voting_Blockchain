const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const urlMongo = 'mongodb://localhost:27017/bigchain'

var express = require('express');
var app = express();
var str = "";
console.log("Server running")

var queryMongo = function(querySortByCount, callback) {
	MongoClient.connect(urlMongo, querySortByCount, function(err, db) {
    if (err) throw err;
	  console.log("Connected successfully to server")


		executeAggregateQuery(querySortByCount, db, function(err, data) {
			callback(err, data);
				db.close();
		});
	})
}

var executeAggregateQuery = function(querySortByCount, db, callback) {
		const client = db.db();
		const collection = client.collection('assets');
				collection.aggregate([querySortByCount]).toArray(function(err, docs) {
        callback(err, docs);
    });
};

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//routes
app.get('/', function(req, res, next) {
    console.log("Someone connected.")

		var querySortByCount = req.query.querySortByCount;
		console.log(req.query.querySortByCount);
		console.log(querySortByCount);

		switch(querySortByCount){
			case 'queryVote':
				querySortByCount = {$sortByCount:"$data.Vote"};
				break;
			//to be completed with District vote percentage
			}
		console.log(JSON.stringify(querySortByCount));
		queryMongo(querySortByCount, function(err, data) {
        if(err)
            res.status(500).json({error: err});
        else
						res.json(data);
    })
})

var server = app.listen(3000, function() {});
