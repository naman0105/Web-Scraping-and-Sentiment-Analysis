const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs')
// const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const url = 'https://www.amazon.in/Vivo-Y81-Black-Storage-Offers/product-reviews/B07JGLQJQ3/ref=dpx_acr_txt?showViewpoints=1'

rp(url)
  .then(function(html){
    //success!
    console.log($('div > div > a', html).length);
    var data = $('span.review-text', html);
    // var data = $('big > a', html);
    console.log(typeof data);
    fs.writeFile("dataMined.json",data , function(err) {
	    if(err) {
	    	console.log("the file not saved")
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	    processData();
	}); 
	// fs.writeFileSync("dataMined.json", data);
  })
  .catch(function(err){
    //handle error
 });


 function processData(){
 	fs. readFile("dataMined.json", 'utf8', function(err, contents) {
		var dataRead = contents;
		var spanbrElement = "</span><br>"
		dataRead.replace(/%span%/gi, "spanbrElement")
		console.log(dataRead)
	});
 }
