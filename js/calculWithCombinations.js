let tabScoreWeighted = []
let tabScorePersonTotal = []
let tabScoreByCombination = []
let compt;
let incrementation;

function getScoreForEachPerson(){
    // console.log(colName);
    console.log(tabMean);
    // console.log(tabScore);

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

function getScoreForEachCombination(){
	console.log(tabScorePersonTotal);
	console.log(tabCombinations);
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
	console.log(tabScoreByCombination);
}