// 引数の文字列をカーソル位置に挿入
HTMLTextAreaElement.prototype.insertText = function(t){
	var text = this.value
	var cursor = this.selectionEnd
	var scroll = this.scrollTop
	var s = text.substr(0, cursor)
	var e = text.substr(cursor)
	this.value = s + t + e
	this.selectionStart = cursor + t.length
	this.selectionEnd = cursor + t.length
	this.scrollTop = scroll
}
// カーソル位置のインデントを取得
HTMLTextAreaElement.prototype.getCurrentIndent = function(){
	var text = this.value
	var cursor = this.selectionStart
	if(text.length < cursor){
		return -1
	}
	text = text.substr(0, cursor)
	var linenum = (text.match(/\n/g)||[]).length
	var line = text.split('\n')[linenum]
	var indent = line.match(/^\s+/g)
	if(indent == null){
		return ""
	}
	return indent[0]
}
document.body.onload = () => {
	var tas = document.getElementsByTagName('textarea')
	for (let i = tas.length - 1; i >= 0; i--) {
		let ta = tas[i]
		ta.style.fontFamily = 'monospace'
		ta.onkeydown = e => {
			switch(e.code){
			case 'Enter':
				var indent = ta.getCurrentIndent()
				ta.insertText('\n'+indent)
				return false
			case 'Tab':
				if (e.ctrlKey) {
					return true
				}
				ta.insertText('\t')
				return false
			}
		}
	}
}