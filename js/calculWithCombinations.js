let tabScoreWeighted = []
let tabScorePersonTotal = []
let jsonCombinationRetained = []
let compt;
let quart1;
let quart3;
let jsonPerson = []

let scoreCombination = []

function getScoreForEachPerson(){
	jsonPerson = []
    // RECUPERATION DU SCORE DE CHAQUE MATIERE RELATIF AU POIDS
    for (var i = 0; i < tabScore.length; i++) {
    	tabScoreWeighted[i] = []
    	for (var j = 0; j < tabMean.length; j++) {
    		tabScoreWeighted[i][j] = tabScore[i][j] * tabMean[j]
    	}
    }

    // CALCUL DU NOMBRE DE POINTS TOTAL DE CHAQUE PERSONNE
    for (var i = 0; i < tabScore.length; i++) {
    	jsonPerson.push({
	        nom: tabName[i],
	        scoreTotal: sumArray(tabScoreWeighted[i])
	    });
    }
    getScoreForEachCombination()
}

// CALCUL DU SCORE DE CHAQUE COMBINAISON
function getScoreForEachCombination(){
	jsonCombination.forEach(jsonElement =>{
		compt = 0
		jsonElement.contenant.forEach(combinaisonElement =>{
			jsonPerson.forEach(personElement =>{
				if (combinaisonElement === personElement.nom) {
					compt += personElement.scoreTotal
				}
			})
		})
		scoreCombination.push(compt)
		jsonElement.scoreCombinaison = compt
	})
	getQuantileAndFilter()
}

// OBTENIR LES QUARTILES 1 ET 3, ET CREER UN NOUVEL OBJET DE COMBINAISON QUI NE CONTIENT QUE LES CORRESPONDANTS
function getQuantileAndFilter(){
	jsonCombinationRetained = []
	quart1 = ss.quantile(scoreCombination, 0.25);
	quart3 = ss.quantile(scoreCombination, 0.75);
	jsonCombination.forEach(jsonElement =>{
		if (jsonElement.scoreCombinaison > quart1 && jsonElement.scoreCombinaison < quart3) {
			jsonCombinationRetained.push(jsonElement)
		} 
	})
	bestCombination()
}