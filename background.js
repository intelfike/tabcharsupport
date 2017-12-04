// chrome.tabs.onActivated.addListener(async function(){
// 	updateTabSize()
// })

// chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab){
// 	if(changeInfo.status != 'complete'){
// 		return
// 	}
// 	await executeFile('inject.js')
// 	updateTabSize()
// })
function tabKeySupportAll() {
	executeCode('tabKeySupportAll()')
}
async function updateTabSize(){
	var tabSize = await storageGet('tabSize')
	if(tabSize != undefined){
		await executeCode("changeTabSize(" + tabSize + ')')
	}
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

chrome.runtime.onInstalled.addListener(()=>{
	chrome.contextMenus.create({
		title: 'このページのtextareaでtabキーを使う',
		id: 'tabkeysupport',
		type: "normal",
		contexts: ['editable'],
	 })
});

chrome.contextMenus.onClicked.addListener(async function(itemData) {
	// await executeFile('inject.js')
	updateTabSize()
	tabKeySupportAll()
})