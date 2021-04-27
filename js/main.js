let typeEntree;
let containerLoad = document.querySelectorAll(".containerLoad")
let containerWeight = document.getElementById("containerWeight")

function choixCsv(button) {
	typeEntree = button.value
}

function manageWeight(button){
	button.checked ? prepareTabMulti() : containerWeight.innerHTML = ""
}