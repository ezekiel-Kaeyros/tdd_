let fileInput = document.getElementById("file-upload-input");
let fileSelect = document.getElementsByClassName("file-upload-select")[0];

const fileUpload = document.getElementById('file-upload');
const fileName = document.getElementsByClassName('file-name-display');

fileSelect.onclick = function() {
	fileInput.click();
}
fileInput.onchange = function() {
	let filename = fileInput.files[0].name;
	const part1 = filename.slice(0, 3);
	var fileFormat = wv+filename;
	let selectName = document.getElementsByClassName("file-select-name")[0];
	selectName.innerText = filename;
	console.log(filename);
	console.log(part1);
}

socketio.emit('mballus', "hello data")
		

fileInput.addEventListener('change', (event) => {  
	let newFilePath = event.target.value;
	fileName[0].innerHTML = newFilePath;	
  });