let typeEntree;
let containerLoad = document.querySelectorAll(".containerLoad")

function choixCsv(button) {
	typeEntree = button.value
	typeEntree === 'load' ? loadCSv() : manualEntry()
}