'use strict';
const fs = require('fs'); 
const csv = require('csv-parser');
var bayes = require('bayes')

var headers = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*'}


module.exports.hello = (event, context, callback) => {

	// console.log("event",event, event.text)

	var textToClassify;

	if(event.text == undefined){
		textToClassify = event.queryStringParameters.text;
		console.log("this is triggered by api", textToClassify)
	} else{
		textToClassify = event.text;
		console.log("not triggerd by api", textToClassify)
	}

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
	 
	 	var response = {
      		message: classifier.categorize(textToClassify)
    	}

		callback(null, {statusCode: 200 , body: JSON.stringify(response), headers: headers});
	
	});  


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};




