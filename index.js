const fs = require("fs");
const file = process.argv[2];
const text = fs.readFileSync(file).toString();

/**
 @param {string} text - text to transform
 @param {Object.<string, any>} data - tag - value pairs
 @param {Object} [options] - additional options
 @param {boolean} [options.useDoubleBrackets] - add double brackets as a tag delimiter. 
*/
const render = (text, data, options = {}) => {
  let stateMachine = {
    "{": {
      isTemplate: true,
      "}": {
        isTemplate: false,
      },
      "{": {
        isTemplate: false,
      },
    },
    "%": {
      isTemplate: true,
      "%": {
        isTemplate: false,
      },
    },
  };

  if (options.useDoubleBrackets) {
    const doubleBrackets = {
      "[": {
        "[": {
          isTemplate: true,
          "]": {
            "]": {
              isTemplate: false,
            },
          },
        },
      },
    };

    stateMachine = { ...stateMachine, ...doubleBrackets };
  }

  let result = "";
  let innerTag = "";
  [...text].reduce((state, char) => {
    const subState = state[char];
    if (subState) {
      if (subState.isTemplate === false) {
        const value = data[innerTag] ?? "";
        result += value;
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

const output = render(text, data, { useDoubleBrackets: true });
console.log("Output is : ");
console.log(output);
fs.writeFileSync("output.txt", output);
