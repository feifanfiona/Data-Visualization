
d3.csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv",readcsv)

function readcsv(error, rawdata){

	var dates = rawdata[0]['date'];

	var rawdataByState = d3.nest().key(function(d){
		return d['state']; }).entries(rawdata);


function unique(array) {   return array.filter(function(a){     return !this[a] ? this[a] = true : false;   }, {}); }

	rawdata.map(function(d){states.push(d['state'])});
	states = unique(states).sort();

	var groupedData = [];

	for (var i = 0; i < states.length; i++)
	{
		var previous = 0;
		var state = rawdataByState[i]['key'];
		var dataByDate = rawdataByState[i]['values'];

		var dataByMonth = d3.nest()
		.key(function(d){return d['date'].split('-').slice(0,2).join('-');})
		.sortKeys(d3.ascending)
		.rollup(function(leaves){
			return{
				cases: d3.sum(leaves, function(d){
					var tempCases = previous;
					previous = d['cases'];
					return d['cases'] - tempCases;
			})
			};
		})
		.entries(dataByDate);

		dataByMonth.map(function(rowdata){
			var data = {'state': state, 'month': rowdata['key'],
						 'cases': rowdata['value']['cases']};
			groupedData.push(data);
		});


	}

	var data_total = [];


	console.log(groupedData);

	function monthDatabyState(state){
		total_month_state = [];
		for (const row of groupedData) {
			if (row['state'] == state) {
				total_month_state.push(row);
			}
		}
		return total_month_state;
	}

drawTable(groupedData);

	draw_barChart(monthDatabyState("Washington"))
	draw_pieChart(monthDatabyState("Washington"))












}