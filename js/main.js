let typeEntree;
let containerLoad = document.querySelectorAll(".containerLoad")

function choixCsv(button) {
	typeEntree = button.value
	typeEntree === 'load' ? loadCSv() : manualEntry()
}

function loadCSv(){
	containerLoad[0].style.visibility = 'visible'
	containerLoad[1].style.visibility = 'hidden'
}

function manualEntry(){
	containerLoad[0].style.visibility = 'hidden'
	containerLoad[1].style.visibility = 'visible'
}