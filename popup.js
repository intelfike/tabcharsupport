window.onload = async ()=>{
	tabSize.onchange = async ()=>{
		storageSet('tabSize', tabSize.value)
		await executeCode("changeTabSize(" + tabSize.value + ')')
	}
	var ts = await storageGet('tabSize')
	if(ts != undefined){
		tabSize.value = ts
	}
}
function storageSet(key, value){
	return new Promise(ok => {
		var data = {}
		data[''+key] = value
		chrome.storage.local.set(data, ok)
	})
}
function storageGet(key){
	return new Promise(ok => {
		chrome.storage.local.get(key, function(value){
			ok(value[key])
		})
	})
}
function executeFile(file){
	return new Promise(ok => {
		chrome.tabs.executeScript(null,
			{file:file},
			(result)=>{
				ok(result)
			}
		)
	})
}
function executeCode(code){
	return new Promise(ok => {
		chrome.tabs.executeScript(null,
			{code:code},
			(result)=>{
				ok(result)
			}
		)
	})
}