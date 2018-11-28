'use strict';
const fs = require('fs'); 
const csv = require('csv-parser');
var bayes = require('bayes')
const json2csv = require('json2csv').parse;

function classifyText(){

	var classifier = bayes()
	fs.createReadStream('PosBook1.csv')
	.pipe(csv())
	.on('data', function(data){
	    try {
	    	console.log(data.Review, "   ", data.Senti)
	    	if(data.Senti == "negative"){
	    		console.log("negative things")
	    	}
	    	classifier.learn(data.Review, data.Senti)	
	    }
	    catch(err) {
	        //error handler
	        console.log(err)
	    }
	})
	.on('end',function(){
		console.log("should be only once")
	    //some final operation
	    var predictedData = []
		fs.createReadStream('../minedData/minedData.csv')
		.pipe(csv())
		.on('data', function(data){
		    console.log(data.Review)
		    var result = classifier.categorize(data.Review);
		    predictedData.push({"Review": data.Review, "Result": result})		    
		})
		.on('end',function(){
			const csv = json2csv(predictedData);
	  		console.log(csv);		
	  		fs.writeFile("../minedData/minedDataWithResult.csv", csv, function(err) {
		    if(err) {
		    	console.log("the file not saved")
		        return console.log(err);
		    }
		    console.log("The file was saved!");	
			});
		});  	
	});  
};


classifyText();

