let tabCriteres;
let containerWeight = document.getElementById("containerWeight")

// function makeTabWeight(){
// 	let addInput = "";
// 	colName.shift()
// 	tabCriteres = colName
// 	console.log(tabCriteres);
// 	for (var i = 0; i < tabCriteres.length; i++) {
// 		addInput += `	<div>
// 							<label for="poids_${i}">${tabCriteres[i]}</label>
// 							<input type="number" id="poids_${i}" value="1">
// 						</div>`
// 	}

// 	containerWeight.innerHTML = addInput
// }

function makeTabWeight(){
	let addInput = "";
	colName.shift()
	tabCriteres = colName
	console.log(tabCriteres);
	for (var i = 0; i < tabCriteres.length; i++) {
		addInput += `	<div>
							<label for="poids_${i}">${tabCriteres[i]}</label>
							<input type="number" id="poids_${i}" value="1">
						</div>`
	}

	containerWeight.innerHTML = addInput
}