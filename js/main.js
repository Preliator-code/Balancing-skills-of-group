let typeEntree;
let containerLoad = document.querySelectorAll(".containerLoad")
let containerMatrice = document.getElementById("containerMatrice")


function choixCsv(button) {
	typeEntree = button.value
}

function entreNbrPers(number){
	nombrePersonnes = number.value;
	nombrePersonnes > 0 ? makeCombinations() : hideElement()
}

function buttonEnvoyer(){
	if (nombrePersonnes > 0 && document.getElementById("checkBox").checked) {
		toutRemplis === 0 ? prepareTabMulti() : scenarioDeux()
	}
	if (nombrePersonnes > 0 && (!(document.getElementById("checkBox").checked))) {
		toutRemplis = 0
		continueWithoutWeight()
		removeContainerWeight()
	}
}

function scenarioDeux(){
	(comptEntree === ((colName.length * colName.length - colName.length) / 2)) ? allInputFill() : someInputNotFill()
}