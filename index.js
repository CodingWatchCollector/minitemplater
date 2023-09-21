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
  let result = "";
  let innerTag = "";
  let isLoop = false;
  let loopBody = "";

  let stateMachine = {
    "{": {
      isTemplate: true,
      "}": {
        isTemplate: false,
      },
      "{": {
        isTemplate: false,
      },
      "#": {
        isTemplate: true,
        get "}"() {
          isLoop = true;
          return {
            isTemplate: false,
          };
        },
      },
      "/": {
        get "}"() {
          isLoop = false;
          return {
            isTemplate: false,
            isLoopEnd: true,
          };
        },
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

  const addValueFromTag = () => {
    const value = data[innerTag] ?? "";
    result += value;
    innerTag = "";
  };

  [...text].reduce((state, char) => {
    const subState = state[char];
    if (isLoop) {
      loopBody += char;
      return subState && subState.constructor === Object
        ? subState
        : stateMachine;
    }
    if (subState) {
      if (subState.isLoopEnd) {
        const loopData = data[innerTag];
        if (Array.isArray(loopData)) {
          const loopTextTrimmed = loopBody.replace(
            /(^}(?:\n|\r\n))|({\/$)/g,
            ""
          );
          loopData.forEach((item) => {
            result += render(loopTextTrimmed, item);
          });
          innerTag = "";
        }
      }
      if (subState.isTemplate === false) {
        addValueFromTag();
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
  list: [
    {
      name: "Marie",
    },
    {
      name: "Paul",
    },
  ],
};

const output = render(text, data, { useDoubleBrackets: true });
console.log("Output is : ");
console.log(output);
fs.writeFileSync("output.txt", output);
