function doStuff(data) {
	// J'ENLEVE LE PREMIER ELEMENT (LES ENTETES) ET LE DERNIER ELEMENT (ELEMENT VIDE)
	data.pop()
	data.shift()
	return data
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

parseData("../Ressources/notes.csv", doStuff);
