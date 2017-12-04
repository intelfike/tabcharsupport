window.onload = async ()=>{
	tabSize.onchange = async ()=>{
		storageSet('tabSize', tabSize.value)
		await executeCode("changeTabSize(" + tabSize.value + ')')
	}
	var ts = await storageGet('tabSize', 4)
	tabSize.value = ts
}
function storageSet(key, value){
	return new Promise(ok => {
		var data = {}
		data[''+key] = value
		chrome.storage.sync.set(data, ok)
	})
}
function storageGet(key, def){
	return new Promise(ok => {
		chrome.storage.sync.get(key, function(value){
			if(value[key] == undefined){
				value[key] = def
			}
			ok(value[key])
		})
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