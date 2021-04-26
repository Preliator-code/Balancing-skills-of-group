let containerApercu;

function preparetab(){
	containerApercu = document.getElementById("containerApercu")
	let comptCell = 0
	let tableString = "<table id='tab'>";
	// ICI, RAJOUTER UN "th" VIDE POUR CREER SIMPLEMENT LES ENTETE VERTICAUX ET HORIZONTAUX
	let tableHead = "<thead><tr>"
	let ligneTableHead = ""
	let ligne = ""
	let inputEnTete = "";
	console.log(colName);

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

	// conteneurEnTete.innerHTML = inputEnTete;
	containerApercu.innerHTML = tableString;

	// inputtab = document.querySelectorAll('#tab td select');
}