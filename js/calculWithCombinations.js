let tabScoreWeighted = []
let tabScorePersonTotal = []
let tabScoreByCombination = []
let compt;
let incrementation;
let quart1;
let quart3;

function getScoreForEachPerson(){
    // RECUPERATION DU SCORE DE CHAQUE MATIERE RELATIF AU POIDS
    for (var i = 0; i < tabScore.length; i++) {
    	tabScoreWeighted[i] = []
    	for (var j = 0; j < tabMean.length; j++) {
    		tabScoreWeighted[i][j] = tabScore[i][j] * tabMean[j]
    	}
    }

    // CALCUL DU NOMBRE DE POINTS TOTAL DE CHAQUE PERSONNE
    for (var i = 0; i < tabScore.length; i++) {
    	tabScorePersonTotal[i] = sumArray(tabScoreWeighted[i])
    }
    getScoreForEachCombination()
}

// CALCUL DU SCORE DE CHAQUE COMBINAISON
function getScoreForEachCombination(){
	tabCombinations.forEach(combinaisonList =>{
		compt = 0
		combinaisonList.forEach(combinaisonElement =>{
			for (var i = 0; i < tabScorePersonTotal.length; i++) {
    			if (combinaisonElement === i) {
    				compt += tabScorePersonTotal[i]
    			}
    		}
		})
		tabScoreByCombination.push(compt)
	})
	getQuantileAndFilter()
}

// OBTENIR LES QUARTILES 1 ET 3, ET FILTRER
function getQuantileAndFilter(){
	quart1 = ss.quantile(tabScoreByCombination, 0.25);
	quart3 = ss.quantile(tabScoreByCombination, 0.75);
	console.log(quart1, quart3);
}