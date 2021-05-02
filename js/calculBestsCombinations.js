let jsonAleat = []
let a_remplir = [];
let jsonCompoFinale = []
let groupFinal = []
let compteur = 0

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
	console.log(jsonCombination);
	
	// while (a_remplir.length < dataTab.length) {
	// 	trieAleatoireJson()
	// 	a_remplir = []
	// 	jsonCompoFinale = []
	// 	groupFinal = []

	// 	jsonCombination.forEach(jsonElement =>{
	// 		if (! jsonElement.contenant.some(i => a_remplir.includes(i))) {
	// 			jsonCompoFinale.push({
	// 				numeroCompo: jsonElement.numero,
	// 				compositionPersonnes: jsonElement.contenant,
	// 				scoreEquipe: jsonElement.scoreCombinaison.toFixed(2)
	// 			})
	// 			jsonElement.contenant.forEach(personnes =>{
	// 				a_remplir.push(personnes)
	// 			})
	// 		}
	// 	})
	// 	console.log(jsonCompoFinale);
	// 	compteur += 1
	// 	console.log(compteur);
	// 	console.log(a_remplir);
	// }
	// console.log("TERMINE");
	
}