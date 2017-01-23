var counties = [
	"alamance",
	"mecklenburg"
];

var fs = require("fs");
var csv = require('csv-array');
const toCSV = require('array-to-csv');

csv.parseCSV(__dirname + "/original/"+counties[0]+".csv", function(data){fixTable(data, 0, true);}, false);

var expected = [];
var actual = [];

var fixTable = function(data, q, original){
	if (original){
		processOriginal(data, q);
	} else {
		processOut(data, q);
	}
	
};

var processOriginal = function(data, q){
	var row = 0;	
	expected[q] = 1;	//header row
	
	//read past first 'code'
	while (!data[row++][0].includes("code")){}

	
	var skip = false;
	while (data[row] !== undefined) {
		
		if (data[row][0].includes("Detailed")){
			skip = true;
			if (data[row][5] !== "") expected[q]++;
		} else if (data[row][0].includes("code")){
			skip = false;
		} else if (!skip){
			expected[q]++;
		}
		
		row++;
	}
	
	csv.parseCSV(__dirname + "/out/"+counties[q]+".csv", function(data){fixTable(data, q, false);}, false);			
};

var processOut = function(data, q){
	actual[q] = data.length;
	
	if (q+1<counties.length){
		csv.parseCSV(__dirname + "/original/"+counties[q+1]+".csv", function(data){fixTable(data, q+1, true);}, false);		
	} else {
		writeResults();
	}		
};

var writeResults = function(){
	var stream = fs.createWriteStream(__dirname + "/results.txt");
	stream.once('open', function(fd) {
		stream.write("County: expected - actual\r\n");
		for (var q in counties){
			stream.write(counties[q] + ": " + expected[q] + " - " + actual[q] + "\r\n");
			if (expected[q] !== actual[q]){
				console.log("MISMATCH: "+counties[q]+", "+((actual[q]-expected[q])+"")+" lines");
			}
		}
	  stream.end();
	});

};