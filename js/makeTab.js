let containerApercu;
let names;
let tabScore = []

function preparetab(){
	containerApercu = document.getElementById("containerApercu")
	let comptCell = 0
	let tableString = "<table id='tab'>";
	// ICI, RAJOUTER UN "th" VIDE POUR CREER SIMPLEMENT LES ENTETE VERTICAUX ET HORIZONTAUX
	let tableHead = "<thead><tr>"
	let ligneTableHead = ""
	let ligne = ""
	let inputEnTete = "";

	for (var i = 0; i < dataTab[0].length; i++) {
		ligneTableHead += `	<th>
								<div class='enTete'>${colName[i]}</div>
							</th>`
	}

	for (var i = 0; i < dataTab.length; i++) {
		let comptCol = 1
		for (var j = 0; j < dataTab[0].length; j++) {
			ligne += 	`<td id="${i}_${j}">${dataTab[i][j]}`
			comptCol+=1
			comptCell+=1
		}
		ligne += "</tr>"
	}
	ligneTableHead += '</thead>'
	tableHead += ligneTableHead
	tableHead += "</tr>"
	tableString += tableHead
	tableString += ligne
	tableString += "</table>";

	containerApercu.innerHTML = tableString;
	getValueFromData()
}

// RECUPERATION DES NOTES ATTRIBUEES A CHAQUE PERSONNES (SANS LE NOM DE LA PERSONNE)
function getValueFromData(){
    for (var i = 0; i < dataTab.length; i++) {
        tabScore[i] = []
        for (var j = 1; j < dataTab[1].length; j++) {
            tabScore[i][j] = dataTab[i][j]
        }
    }
    // MALHEUREUSEMENT, LA TECHNIQUE DU DESSUS ME CREE DES VALEURS "empty" DANS CHAQUE PREMIERE VALEUR DE CHAQUE TABLEAU. JE DOIS LES ENLEVER.
    tabScore.forEach(entree =>{
        entree.shift()
	})
}