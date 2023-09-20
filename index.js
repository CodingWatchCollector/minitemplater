const fs = require("fs");
const file = process.argv[2];
const text = fs.readFileSync(file).toString();

const render = (text, data) => {
  const stateMachine = {
    "{": {
      isTemplate: true,
      "}": {
        isTemplate: false,
      },
    },
  };

  let result = "";
  let innerTag = "";
  [...text].reduce((state, char) => {
    const subState = state[char];
    if (subState) {
      if (subState.isTemplate === false) {
        result += data[innerTag];
        innerTag = "";
      }
      return subState;
    }

    if (state.isTemplate) {
      innerTag += char;
      return state;
    }

    result += char;
    return stateMachine;
  }, stateMachine);

  return result;
};

const data = {
  name: "John",
};

const output = render(text, data);
console.log("Output is : ");
console.log(output);
fs.writeFileSync("output.txt", output);
