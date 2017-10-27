function changeTabSize(tabSize){
	var tas = document.getElementsByTagName('textarea')
	for (let i = tas.length - 1; i >= 0; i--) {
		let ta = tas[i]
		ta.style.tabSize = tabSize
	}
}