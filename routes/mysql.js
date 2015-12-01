var ejs= require('ejs');
var mysql = require('mysql');

function getConnection(){
	var connection = mysql.createConnection({
	    host     : '128.136.179.28',
	    user     : 'ankit',
	    password : 'ankit',
	    database : 'mtaas',
	    port	: 3306
	});
	return connection;
}


function fetchData(callback,sqlQuery){

	
	console.log("\nSQL Query::"+sqlQuery);

	
	var connection=getConnection();

	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

exports.fetchData=fetchData;