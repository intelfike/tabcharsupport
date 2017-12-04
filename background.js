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

function tabCharSupportAll() {
	executeCode('tabCharSupportAll()')
}
async function updateTabSize(){
	var tabSize = await storageGet('tabSize', 4)
	if(tabSize != undefined){
		await executeCode("changeTabSize(" + tabSize + ')')
	}
}

chrome.runtime.onInstalled.addListener(()=>{
	chrome.contextMenus.create({
		title: 'このページのテキストエリアでtab文字を入力する',
		id: 'tabCharsupport',
		type: "normal",
		contexts: ['editable'],
	 })
});

chrome.contextMenus.onClicked.addListener(async function(itemData) {
	updateTabSize()
	tabCharSupportAll()
})