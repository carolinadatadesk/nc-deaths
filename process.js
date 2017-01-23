counties = [
"alamance",
"alexander",
"alleghany",
"anson",
"ashe",
"avery",
"beaufort",
"bertie",
"bladen",
"brunswick",
"buncombe",
"burke",
"cabarrus",
"caldwell",
"camden",
"carteret",
"caswell",
"catawba",
"chatham",
"cherokee",
"chowan",
"clay",
"cleveland",
"columbus",
// "craven",
"cumberland",
"currituck",
"dare",
"davidson",
"davie",
"duplin",
"durham",
"edgecombe",
"forsyth",
"franklin",
"gaston",
"gates",
"graham",
"granville",
"greene",
"guilford",
"halifax",
"harnett",
"haywood",
"henderson",
"hertford",
"hoke",
"hyde",
"iredell",
"jackson",
"johnston",
"jones",
"lee",
"lenoir",
"lincoln",
"macon",
"madison",
"martin",
"mcdowell",
"mecklenburg",
"mitchell",
"montgomery",
"moore",
"nash",
"newhanover",
"northampton",
"onslow",
"orange",
"pamlico",
"pasquotank",
"pender",
"perquimans",
"person",
"pitt",
"polk",
"randolph",
"richmond",
"robeson",
"rockingham",
"rowan",
"rutherford",
"sampson",
"scotland",
"stanly",
"stokes",
"surry",
"swain",
"transylvania",
"tyrrell",
"union",
"vance",
"wake",
"warren",
"washington",
"watauga",
"wayne",
"wilkes",
"wilson",
"yadkin",
"yancey"];


var fs = require("fs");
var csv = require('csv-array');
const toCSV = require('array-to-csv');

csv.parseCSV(__dirname + "/original/"+counties[0]+".csv", function(data){fixTable(data, 0);}, false);

var fixTable = function(data, q){

	//remove table of contents and header
	var row = 0;
	while (!data[row][0].includes("code")){
		data.splice(row, 1);
	}

	//rename headers
	data[0] = ["code", "cause_of_death", "race_and_sex", "total", "1_day", "1_week", "28_days", "1_year", "1to4", "5to9", "10to14", "15to19", "20to24","25to34","35to44","45to54","55to64","65to74","75to84","85andup"];

	//remove headers between tables
	row = 1;
	while (data[row] !== undefined) {
		if (data[row][0].includes("Detailed")){

			//delete row or just the cell
			if (data[row][3] !== ""){
				data[row][0] = "";
				row++;
			} else {
				data.splice(row,1);
			}

			//remove rest of rows
			while (!data[row][0].includes("code")){
				data.splice(row, 1);
			}
			data.splice(row, 1);
		} else {
			row++;
		}
	}

	row = 1;
	while (data[row] !== undefined) {

		if (data[row].length<4) data.splice(row,1);

		//for each column
		var column = 4;
		while (data[row][column] !== undefined){

			//checks for blank cells
			if (data[row][column]===""){
				data[row].splice(column, 1);	//remove this cell from this row
				column--;	//shift back the column index
			}

			//check for combined columns
			else if (data[row][column].includes(" ")){
				var cells = data[row][column].split(" ");
				data[row][column] = cells[0];

				var i=1;
				while (cells[i] !== undefined){
					data[row].splice(column+i, 0, cells[i]);
					i++;
				}
			}
			//continue to check next cell in column
			column++;
		}

		//if this is the row with the label
		if ( data[row][3].includes("TOTAL") && data[row+1] !== undefined && !data[row+1][3].includes("TOTAL")){
			if (data[row+1][1] !== ""){
				data[row][1]+=data[row+1][1];
			}
			if (data[row+1][0] !== ""){
				data[row][0]+=data[row+1][0];
			}
		}

		row++;
	}



	row = 1;
	var labels;
	while (data[row] !== undefined) {
		data[row].splice(2,1);		//delete third cell from each row
		if (data[row][2].includes("TOTAL")){
			if (data[row][1] === ""){
				var split = data[row][0].indexOf(" ");
				labels = [data[row][0].substring(0,split), data[row][0].substring(split+1)];
			} else {
				labels = [data[row][0],data[row][1]];
			}
		}

		data[row][0] = labels[0];
		data[row][1] = labels[1];
		row++;
	}

	fs.writeFile(__dirname + '/out/'+counties[q]+".csv", toCSV(data), function(err) {});

	if (q+1<counties.length)
	csv.parseCSV(__dirname + "/original/"+counties[q+1]+".csv", function(data){fixTable(data, q+1);}, false);
};
