const fs = require("fs");
const file = process.argv[2];
const text = fs.readFileSync(file).toString();

function render(text, data) {
  let isTemplate = false;
  let innerTag = "";
  let output = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === "{") {
      isTemplate = true;
      continue;
    }

    if (char === "}") {
      isTemplate = false;
      const value = data[innerTag];
      output += value;
      innerTag = "";
      continue;
    }

    if (isTemplate) {
      innerTag += char;
      continue;
    }

    if (!isTemplate) {
      output += char;
    }
  }

  return output;
}

const data = {
  name: "John",
};

const output = render(text, data);
console.log("Output is : ");
console.log(output);
fs.writeFileSync("output.txt", output);
