let tabScoreWeighted = []
let tabScorePersonTotal = []
let tabScoreByCombination = []

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
	console.log(tabCombinations);
}