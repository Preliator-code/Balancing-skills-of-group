let tabCriteres;
let comptEntree = 0;
let inputLittleTabMulti;
let comptLittleTabMulti;
let littleTabMulti = 0

// SI JE COCHE LA CHECKBOX, JE VERIFIE LE NOMBRE DE CRITERES ET J'AGIS EN FONCTION
function prepareTabMulti(){
	document.getElementById("fieldset_weight").style.display = 'block'
	// JE DOIS PLACER UNE CONDITION, SINON colName SE FAIT ENLEVER LE PREMIER ELEMENT A CHAQUE MODIFICATION DU PREMIER input (CAR LA FONCTION EST RELANCEE SYSTEMATIQUEMENT)
	if(colName.length > colNameLength){
		colName.shift()
	}
	littleTabMulti = (colName.length) < 3 ? 1 : 0
	littleTabMulti === 1 ? makeLittleTabMulti() : makeTabMulti()
}

function makeLittleTabMulti(){
	let ligne = ""
	for (var i = 0; i < colName.length; i++) {
		ligne +=	`<div class="containerMatriceLittleTabMulti">
						<label>${colName[i]}</label>
						<input id="input${i}" type="number" class="weightLittleTabMulti" oninput="getValueLittleTabMulti()" min="1" value="1">
					</div>`
	}
	containerMatrice.innerHTML = ligne
}

function getValueLittleTabMulti(){
	tabMean = []
	comptLittleTabMulti = 0
	inputLittleTabMulti = document.querySelectorAll(".weightLittleTabMulti")
	inputLittleTabMulti.forEach(entree =>{
		comptLittleTabMulti += parseInt(entree.value)
	})
	inputLittleTabMulti.forEach(entree =>{
		toutRemplis = 1
		tabMean.push(entree.value / comptLittleTabMulti)
	})
	getScoreForEachPerson()
	// ICI, JE N'AI PAS BESOIN DE PASSER PAR continueWithoutWeight() SI JE N'ENTRE PAS DE POIDS, CAR J'AI UNE VALEUR PAR DEFAUT A 1 SUR MES INPUT ET (entree.value / comptLittleTabMulti) ME RETOURNE BIEN UN tabMean à 2x0.5
}

function makeTabMulti(){
	tabCriteres = []
	tabCriteres = colName
	let comptCell = 0
	let tableString = "<table id='tabMulti'>";
	// ICI, RAJOUTER UN "th" VIDE POUR CREER SIMPLEMENT LES ENTETE VERTICAUX ET HORIZONTAUX
	let tableHead = "<thead><tr><th></th>"
	let ligneTableHead = ""
	let ligne = ""

	for (var i = 0; i < colName.length; i++) {
		let comptCol = 1
		ligneTableHead += `<th><div class='enTete'>${tabCriteres[i]}</div></th>`
		ligne += `<tr><th><div class='enTete'>${tabCriteres[i]}</div></th>`
		for (var j = 0; j < colName.length; j++) {
			// ICI, ON AJOUTE DES INFORMATIONS A CHAQUE INPUT SEPARE PAR DES "_" : NUMERO DE LA COLONNE, NUMERO GENERAL DE L'INPUT, S'IL EST MODIFIABLE OU PAS, ET SON NUMERO D'INPUT RELATIF A SA COLONNE
			ligne += 	`<td><select id="col_${comptCol}_idGeneral_${comptCell}" class="inputCell" name="" id="liste">
							<option value="Pas_un_nombre"></option>
							<optgroup label="Normal">
								<option value="1">9</option>
								<option value="2">8</option>
								<option value="3">7</option>
								<option value="4">6</option>
								<option value="5">5</option>
								<option value="6">4</option>
								<option value="7">3</option>
								<option value="8">2</option>
								<option value="9">1</option>
							</optgroup>
							<optgroup label="Inverse">
								<option value="10">1/9</option>
								<option value="11">1/8</option>
								<option value="12">1/7</option>
								<option value="13">1/6</option>
								<option value="14">1/5</option>
								<option value="15">1/4</option>
								<option value="16">1/3</option>
								<option value="17">1/2</option>
							</optgroup>
						</select></td>`
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
	tableString += "<p id='alerteChamps' class='avertissement'>*Veuillez remplir tous les champs pour continuer</p>";

	containerMatrice.innerHTML = tableString;

	inputTabMulti = document.querySelectorAll('#tabMulti td select');

	readOnlyCell(inputTabMulti)
	reordonneArray(inputTabMulti)
	returnInputTabMulti()
	controlMain()
	prepareTabWeight()
}


function prepareTabWeight(tabPoids){
	let tableString = "<table id='tabPoids'>";
	let tableHead = "<thead><tr><th>Nom critère</th><th>Poids</th></thead>"
	let ligne = ""
	let inputEnTete = "";

	let comptCell = 0

	for (var i = 0; i < colName.length; i++) {
		ligne += `<tr><th class='enTete'>${tabCriteres[i]}</th><td class='aRemplir'>-</td></tr>`
	}
	tableString += tableHead
	tableString += ligne
	tableString += "</table>";

	// J'AJOUTE LE TABLEAU AU CONTENU DEJA EXISTANT DE LA DIV containerTabWeight 
	document.getElementById('containerTabWeight').innerHTML = tableString;

	// ET JE L'AFFICHE
	// document.getElementById('containerTabWeight').style.display = 'block';
}


function fillTabWeight(tab){
	let aRemplir = document.querySelectorAll('#tabPoids .aRemplir')
	let compt = 0
	aRemplir.forEach(entree => {
		entree.innerHTML = tab[compt].toFixed(2)
		compt += 1
	})
}


function readOnlyCell(inputTabMulti){
	let compt = 0;
	let emplac = 0;
	inputTabMulti.forEach(entree => {
		emplac +=1
		// CHAQUE FOIS QU'ON REVIENT A LA LIGNE, ON INCREMENTE compt
		if (emplac % colName.length === 0) {
			emplac = 0;
			compt += 1
		}
		// DES CONDITIONS QUI NE PEUVENT ETRE COMPRISES QU'EN AFFICHANT LES VALEURS DE emplac ET compt
		if (emplac > compt || emplac === 0) {
			entree.style.backgroundColor = "lightgrey";
			entree.disabled = true;
		}
		if (emplac === (compt + 1) || compt == colName.length) {
			entree.style.backgroundColor = "grey";
			entree.style.color = "white";
			entree.selectedIndex = 9;
			// SI L'ELEMENT N'A PAS DE CLASSE, JE LUI MET inputCell, SINON 'inputCell someClass'
			entree.className += entree.className ? ' someClass' : 'inputCell';
		} 
	})
}


// OBJECTIF : DONNER AUX INPUT UN IDENTIFIANT QUI PERMETTE DE RECUPERER L'INPUT INVERSE.
function reordonneArray(inputTabMulti){
	let comptReadOnly = 1
	let comptRead = 1
	// TOUT D'ABORD, JE REORDONNE LES INPUT EN MODIFIABLE. LORSQU'ON EST SUR UNE MEME COLONNE, J'INCREMENTE. 
	for (var i = 0; i < colName.length; i++) {
		inputTabMulti.forEach(entree => {
			// SI L'ELEMENT EST MODIFIABLE, NE POSSEDE PAS LA CLASSE someClass (NE FAIT PAS PARTI DES "1"), ET ON EST UNE SUR MEME COLONNE
			if ((parseInt(entree.id.split('_')[1]) === i) && !entree.disabled && !entree.classList.contains('someClass')){
				entree.id += '_read_' + comptRead
				comptRead += 1
			}
		})
	}
	// POUR UNE RAISON MATHEMATIQUE INCOMPREHENSIBLE, JE NE DOIS PAS FAIRE LA MEME CHOSE POUR L'AUTRE MOITIE. CELLE CI DOIT ETRE INCREMENTEE PAR LIGNE. JE SORS DONC DE LA BOUCLE for
	inputTabMulti.forEach(entree => {
		// SI L'ELEMENT EST EN readOnly ET NE POSSEDE PAS LA CLASSE someClass (NE FAIT PAS PARTI DES "1")
		if (entree.disabled && !entree.classList.contains('someClass')) {
			entree.id += '_readOnly_' + comptReadOnly
			// entree.value = comptReadOnly
			comptReadOnly+= 1
		}
	})
}

function returnInputTabMulti(){
	return inputTabMulti
}

