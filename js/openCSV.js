let dataTab = []
let colName = []
let colNameLength;

function doStuff(data) {
	// J'ENLEVE LE PREMIER ELEMENT (LES ENTETES) ET LE DERNIER ELEMENT (ELEMENT VIDE)
	colName = []
    colName = data.shift()
    colNameLength = colName.length - 1
	data.pop()
	dataTab = data
	makeCombinations()
}

function parseData(url, callBack) {
    Papa.parse(url, {
    	// encoding: "ISO-8859-1",
    	encoding: "UTF-8",
        download: true,
        dynamicTyping: true,
        complete: function(results) {
            callBack(results.data);
        }
    });
}

function handleFileSelect(evt) {
	var file = evt.target.files[0];
	parseData(file, doStuff);
}

$(document).ready(function(){
    $("#pathCsv").change(handleFileSelect);
});

parseData("../Ressources/notes.csv", doStuff);