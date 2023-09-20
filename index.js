const fs = require("fs");
const file = process.argv[2];
const text = fs.readFileSync(file).toString();

let start = false;
let end = false;
let innerTag = "";

function render(text, data) {
	let output = "";
	for (let i = 0, len = text.length; i < len; i++) {
		const char = text[i];
		if (char === '{') {
			start = true;
		}
		if (char === '}') {
			end = true;
		}
		if (start === true) {
			innerTag += char;
		}
		if (!start && !end) {
			output += char;
		}
		if (start && end) {
			start = false;
			end = false;
			let value = data[innerTag];
			output += value;
			innerTag = "";
		}
	}

	return output;
}

const data = {
	name: "John",
}

const output = render(text, data);
console.log('Output is : ');
console.log(output);
fs.writeFileSync("output.txt", output);
