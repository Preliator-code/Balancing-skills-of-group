let a_remplir = [];
let jsonCompoFinale = []
let groupFinal = []
let compteur = 0
let aleatNumber;
let jsonAleat = []
let compoExtraAleat = []
let listDiv

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function trieAleatoireJson(){
	// CREER UN IDENTIFIANT ALEATOIRE
	jsonCombinationRetained.forEach(jsonElement =>{
		jsonElement.idAleat = makeId(3)
	})
	// TRIER LE JSON PAR CETTE NOUVELLE VALEUR
	jsonCombinationRetained.sort(function (a, b) {
	    return a.idAleat.localeCompare(b.idAleat);
	});

	if (dataTab.length % nombrePersonnes !== 0) {
		// CREER UN IDENTIFIANT ALEATOIRE
		jsonCombinationRetainedExtra.forEach(jsonElement =>{
			jsonElement.idAleat = makeId(3)
		})
		// TRIER LE JSON PAR CETTE NOUVELLE VALEUR
		jsonCombinationRetainedExtra.sort(function (a, b) {
		    return a.idAleat.localeCompare(b.idAleat);
		});
	}
}

function bestCombination(){
	console.log(jsonPerson);
	console.log(jsonCombinationRetained);
	if (dataTab.length % nombrePersonnes !== 0) {
		console.log(jsonCombinationRetainedExtra);
	}
	if (dataTab.length % nombrePersonnes === 0) {
		while (a_remplir.length < dataTab.length) {
			trieAleatoireJson()
			a_remplir = []
			jsonCompoFinale = []
			groupFinal = []

			jsonCombination.forEach(jsonElement =>{
				if (! jsonElement.contenant.some(i => a_remplir.includes(i))) {
					jsonCompoFinale.push({
						numeroCompo: jsonElement.numero,
						compositionPersonnes: jsonElement.contenant,
						scoreEquipe: jsonElement.scoreCombinaison.toFixed(2)
					})
					jsonElement.contenant.forEach(personnes =>{
						a_remplir.push(personnes)
					})
				}
			})
		}
	}

	if (dataTab.length % nombrePersonnes !== 0) {
		while (a_remplir.length < dataTab.length) {
			trieAleatoireJson()
			a_remplir = []
			jsonCompoFinale = []
			groupFinal = []
			aleatNumber = getRandomInt(jsonCombinationRetainedExtra.length)

			jsonAleat = jsonCombinationRetainedExtra[aleatNumber]
			jsonAleat.contenant.forEach(entree =>{
				a_remplir.push(entree)
			})

			jsonCompoFinale.push({
						numeroCompo: jsonAleat.numero,
						compositionPersonnes: jsonAleat.contenant,
						scoreEquipe: jsonAleat.scoreCombinaison.toFixed(2)
			})


			jsonCombination.forEach(jsonElement =>{
				if (! jsonElement.contenant.some(i => a_remplir.includes(i))) {
					jsonCompoFinale.push({
						numeroCompo: jsonElement.numero,
						compositionPersonnes: jsonElement.contenant,
						scoreEquipe: jsonElement.scoreCombinaison.toFixed(2)
					})
					jsonElement.contenant.forEach(personnes =>{
						a_remplir.push(personnes)
					})
				}
			})
		}
	}
	compteur += 1
	showOptimisedGroup()
}

function showOptimisedGroup(){
	listDiv = ""
	// JE TRIS LE JSON PAR SCORE DECROISSANT
	jsonCompoFinale.sort(function(a, b){
	    return b.scoreEquipe - a.scoreEquipe;
	});
	for(var i = 0; i < jsonCompoFinale.length; i++){
		listPerson = ""
		jsonCompoFinale[i].compositionPersonnes.forEach(personne =>{
			listPerson += `<p>${personne}</p>`
		})
		listDiv += `<div class='groupsContainer'>
						<p>Groupe ${i + 1}</p>
						<div class='containerPersonnes'>
							${listPerson}
						</div>
						<p class='score'>Score : ${jsonCompoFinale[i].scoreEquipe}</p>
					</div>`			
	}
	console.log(listDiv);
	document.getElementById("showOptimize").innerHTML = listDiv
}