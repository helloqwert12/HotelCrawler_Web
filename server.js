var mysql = require("mysql");
var path = require("path");
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hotel_crawler"
});

	
// on the request to root (localhost:3000/)
app.use(express.static(path.resolve(__dirname, 'client')));
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))

    

});

io.on('connection',function(socket){
	console.log("Client connected");

	socket.on('test', function(data){
		console.log("======================");
		console.log(data);
	});

	socket.on('query_request', function(location){
		//test
		console.log("recived request from client");
		//if (location == "*"){
			

			  var sql = "select * from hotel limit 8"
			  con.query(sql, function (err, result) {
			  		if (err){
			  			console.log("error: " + err);
			  			return;
			  		}

			  		for(var i=0; i<result.length; i++){
 						console.log(result[i].TenKS);
 					}

			    	socket.emit('query_result', result);
			    	
			    });
		
		//}
	});
});


// start the server in the port 3000 !	
http.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});

