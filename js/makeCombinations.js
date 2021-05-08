let tabName = []
let tabCombinations = []
let tabCombinationsExtra = []
let nombrePersonnes;
let jsonCombination = []
let jsonCombinationExtra = []

function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;
	
	// There is no way to take e.g. sets of 5 elements from
	// a set of 4.
	if (k > set.length || k <= 0) {
		return [];
	}
	
	// K-sized set has only one K-sized subset.
	if (k == set.length) {
		return [set];
	}
	
	// There is N 1-sized subsets in a N-sized set.
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}

	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		// head is a list that includes only our current element.
		head = set.slice(i, i + 1);
		// We take smaller combinations from the subsequent elements
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		// For each (k-1)-combination we join it with the current
		// and store it to the set of k-combinations.
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

function makeCombinations(){
	jsonCombination = []
	jsonCombinationExtra = []
	tabName = []
	dataTab.forEach(entree => {
		tabName.push(entree[0]);
	})

	tabCombinations = k_combinations(tabName, nombrePersonnes);
	for (var i = 0; i < tabCombinations.length; i++) {
	    jsonCombination.push({
	        numero: i,
	        contenant: tabCombinations[i]
	    });
	}

	// SI LE NOMBRE DE PERSONNE PAR GROUPE VOULU EST NON DIVISIBLE PAR LE NOMBRE DE PERSONNE, JE RAJOUTE JUSTE UNE AUTRE TABLE DE COMBINAISON
	if (dataTab.length % nombrePersonnes !== 0) {
		tabCombinationsExtra = k_combinations(tabName, tabName.length - (nombrePersonnes * (Math.floor(tabName.length / nombrePersonnes) - 1)));
		for (var i = 0; i < tabCombinationsExtra.length; i++) {
		    jsonCombinationExtra.push({
		        numero: i,
		        contenant: tabCombinationsExtra[i]
		    });
		}
		document.getElementById("showNumberCombinations").innerHTML = "Nbr de combinaisons généré : " + tabCombinations.length + "+ " + tabCombinationsExtra.length
	}

	if (dataTab.length % nombrePersonnes === 0) {
		document.getElementById("showNumberCombinations").innerHTML = "Nbr de combinaisons généré : " + tabCombinations.length
	}

	nombrePersonnes > 0 ? document.getElementById("showNumberCombinations").style.display = 'block' : document.getElementById("showNumberCombinations").style.display = 'none'
	
	preparetab()
}

function hideElement(){
	document.getElementById("showNumberCombinations").style.display = 'none'
}

function entreNbrPers(number){
	nombrePersonnes = number.value;
	nombrePersonnes > 0 ? makeCombinations() : hideElement()
}

function buttonEnvoyer(){
	if (nombrePersonnes > 0 && document.getElementById("checkBox").checked) {
		document.getElementById("fieldset_show").style.display = "none"
		removeContainerWeight()
		prepareTabMulti()
	}
	if (nombrePersonnes > 0 && (!(document.getElementById("checkBox").checked))) {
		continueWithoutWeight()
		// JE FAIS DISPARAITRE LE BLOC "GROUPE OPTIMISE" A CHAQUE FOIS, CAR LES POIDS CHANGENT
		document.getElementById("fieldset_show").style.display = "none"
		removeContainerWeight()
	}
}

// SI JE DECOCHE LA CHECKBOX, J'EFFACE TOUT
function removeContainerWeight(){
	document.getElementById("fieldset_weight").style.display = 'none'
	containerMatrice.innerHTML = ""
	document.getElementById('containerTabWeight').innerHTML = ""
	comptEntree = 0
	document.getElementById("containerTabWeight").style.display = 'none'
	document.getElementById("conteneurInfos").style.display = 'none'
}