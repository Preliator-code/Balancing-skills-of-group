let jsonAleat = []
let a_remplir;
let compoFinale = []
let groupFinal = []

function trieAleatoireJson(){
	// CREER UN IDENTIFIANT ALEATOIRE
	jsonCombination.forEach(jsonElement =>{
		jsonElement.idAleat = makeId(3)
	})
	// TRIER LE JSON PAR CETTE NOUVELLE VALEUR
	jsonCombinationRetained.sort(function (a, b) {
	    return a.idAleat.localeCompare(b.idAleat);
	});
}

function bestCombination(){
	// while (a_remplir.length < dataTab.length) {
	// 	trieAleatoireJson()
	// 	a_remplir = []
	// 	compoFinale = []
	// 	groupFinal = []

		
	// }
	
}