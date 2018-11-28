const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs')
const json2csv = require('json2csv').parse;
// const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

var pageNumber = 1; 
var dataLength = 10;


function storeData(pageNumber){
	console.log("*-----------------------------------------------------------------------*")
	const url = 'https://www.amazon.in/Vivo-Y81-Black-Storage-Offers/product-reviews/B07JGLQJQ3/ref=cm_cr_arp_d_viewopt_srt?showViewpoints=1&pageNumber='+pageNumber+'&sortBy=recent'	
	console.log("now getting reviews from this page  "+url)
	rp(url)
	  .then(function(html){
	    //success!	   
	    var data = $('span.review-text', html);
	    // var data = $('big > a', html);
	    dataLength = data.length 
	    console.log("Number of reviews on this page ::-- "+dataLength);
	    if(dataLength == 0){
	    	console.log("no more reviews are found")
	    	processData();
	    } 
	    else if(pageNumber == 1){
		    fs.writeFile("dataMined.json",data , function(err) {
			    if(err) {
			    	console.log("the file not saved")
			        return console.log(err);
			    }
			    console.log("a new file dataMined.json created for the reviews");
			    pageNumber++;			    
			    storeData(pageNumber)
			}); 
			// fs.writeFileSync("dataMined.json", data);	    	
	    } 
	    else{
		    fs.appendFile("dataMined.json",data , function(err) {
			    if(err) {
			    	console.log("the file not saved")
			        return console.log(err);
			    }
			    console.log("reviews appended to dataMined.json file");
			    pageNumber++;
				storeData(pageNumber)			    
			});	    	
	    }
	  })
	  .catch(function(err){
	    //handle error
	    console.log(err)
	 });	
}



 function processData(){
 	console.log("*-----------------------------------------------------------------------*")
 	console.log("*-----------------------------------------------------------------------*")
 	console.log("starting proceessing the data now")
 	var arr;
 	fs.readFile("dataMined.json", 'utf8', function(err, contents) {
		var dataRead = contents;
		// var spanbrElement = "</span><br>"
		// dataRead.replace(/%span%/gi, "spanbrElement")
		arr = dataRead.split("</span>")
		for(var i=0; i< arr.length-1; i++){
			arr[i] = arr[i].slice(62);
			//console.log(arr[i] + "   ")
		}
		// console.log("length "+ arr.length )
		arr = arr.slice(0, arr.length-1)
		console.log("*-----------------------------------------------------------------------*")
		console.log("Total number of reviews ::-- "+ arr.length )
		//console.log(arr)
		var arr2 = [];
		for(var i=0; i< arr.length; i++){
			arr2.push({"Review":arr[i]})
		}
		const csv = json2csv(arr2);
  		console.log(csv);		
  		fs.writeFile("../minedData/minedData.csv", csv, function(err) {
	    if(err) {
	    	console.log("the file not saved")
	        return console.log(err);
	    }
	    console.log("*-----------------------------------------------------------------------*")
	    console.log("minedData.csv file is created for all the reviews collected");	
		});
	});	
 }


storeData(pageNumber)