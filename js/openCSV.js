let dataTab = []
let colName = []
let colNameLength;
let file;

function doStuff(data) {
	// J'ENLEVE LE PREMIER ELEMENT (LES ENTETES) ET LE DERNIER ELEMENT (ELEMENT VIDE)
	colName = []
    colName = data.shift()
    colNameLength = colName.length - 1
	data.pop()
	dataTab = data
    if (file) {
        document.getElementById("apercuCsv").style.display = 'block';
        document.getElementById("infosSupp").style.display = 'flex';
        preparetab()
        makeCombinations()
    }
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
	file = evt.target.files[0];
	parseData(file, doStuff);
}

$(document).ready(function(){
    $("#pathCsv").change(handleFileSelect);
});

// parseData("../Ressources/notes.csv", doStuff);