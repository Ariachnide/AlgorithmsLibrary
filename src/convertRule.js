const TermType = Object.freeze({
    TEXT: "text",
    NUMBER: "number",
    DATE: "date"
});

const ElementType = Object.freeze({
    BLOCK: "block",
    CRITERIA: "criteria"
});

const DisplayType = Object.freeze({
    SENTENCE: "sentence",
    TREE: "tree"
});

/*
// (Age < 10 ET Sexe = F) OU (Age > 50 ET Date de venue = 8/1/2020)

OU
  ET
    Age < 10
    Sexe = F
  ET
    Age > 50
    Date de venue = 8/1/2020
*/
const rule1 = {
    type: "block",
    blockOperator: "OU",
    content: [
        {
            type: "block",
            blockOperator: "ET",
            content: [
                {
                    type: "criteria",
                    term: "Âge",
                    operator: "<",
                    value: "10"
                },
                {
                    type: "criteria",
                    term: "Sexe",
                    operator: "=",
                    value: "F"
                }
            ]
        },
        {
            type: "block",
            blockOperator: "ET",
            content: [
                {
                    type: "criteria",
                    term: "Âge",
                    operator: ">",
                    value: "50"
                },
                {
                    type: "criteria",
                    term: "Date de venue",
                    operator: "=",
                    value: "8/1/2020"
                }
            ]
        }
    ]
};

/*
// (Age < 10 ET Sexe = F) OU (Age > 50 OU (Date de venue >= 1/1/2020 ET Date de venue <= 31/12/2022))

OU
  ET
    Age < 10
    Sexe = F
  OU
    Age > 50
    ET
      Date de venue >= 1/1/2020
      Date de venue <= 31/12/2022
*/
const rule2 = {
    type: "block",
    blockOperator: "OU",
    content: [
        {
            type: "block",
            blockOperator: "ET",
            content: [
                {
                    type: "criteria",
                    term: "Âge",
                    operator: "<",
                    value: "10"
                },
                {
                    type: "criteria",
                    term: "Sexe",
                    operator: "=",
                    value: "F"
                }
            ]
        },
        {
            type: "block",
            blockOperator: "OU",
            content: [
                {
                    type: "criteria",
                    term: "Âge",
                    operator: ">",
                    value: "50"
                },
                {
                    type: "block",
                    blockOperator: "ET",
                    content: [
                        {
                            type: "criteria",
                            term: "Date de venue",
                            operator: ">=",
                            value: "1/1/2020"
                        },
                        {
                            type: "criteria",
                            term: "Date de venue",
                            operator: "<=",
                            value: "31/12/2022"
                        }
                    ]
                }
            ]
        }
    ]
};

const rule3 = {
    type: "criteria",
    term: "Âge",
    operator: "<",
    value: "10"
};

const rule4 = {
    type: "block",
    blockOperator: "ET",
    content: [
        {
            type: "criteria",
            term: "Date de venue",
            operator: ">=",
            value: "1/1/2020"
        },
        {
            type: "criteria",
            term: "Date de venue",
            operator: "<=",
            value: "31/12/2022"
        }
    ]
};

const rule5 = {
    type: "block",
    blockOperator: "OU",
    content: [
        {
            type: "criteria",
            term: "Âge",
            operator: "<",
            value: "10"
        },
        {
            type: "block",
            blockOperator: "ET",
            content: [
                {
                    type: "criteria",
                    term: "Date de venue",
                    operator: ">=",
                    value: "1/1/2020"
                },
                {
                    type: "criteria",
                    term: "Date de venue",
                    operator: "<=",
                    value: "31/12/2022"
                }
            ]
        }
    ]
};

function displaySentence(data, displayType) {
    if (typeof data.type === "undefined") return "";

    let result = "";

    let level = 0;
    let pointer = data;
    const tempArrayList = [];
  
    while(level > -1) {
        if (pointer.type === ElementType.BLOCK) {
            
            if (displayType === DisplayType.TREE) {
                for (let i = 0; i < level * 2; i++) {
                    result += " ";
                }
                result += pointer.blockOperator;
                result += "\n";
            } else if (displayType === DisplayType.SENTENCE && level !== 0) {
                result += "(";
            }
            level++;
      
            tempArrayList.push({
                type: "tempArray",
                content: pointer.content,
                blockOperator: pointer.blockOperator,
                index: -1
            });
            
            pointer = tempArrayList[tempArrayList.length - 1];
      
        } else if (pointer.type === ElementType.CRITERIA) {
            if (displayType === DisplayType.TREE) {
                for (let i = 0; i < level * 2; i++) {
                    result += " ";
                }
            }
      
            result += `${pointer.term} ${pointer.operator} ${pointer.value}`;
            if (displayType === DisplayType.TREE) {
                result += "\n";
            }

            if (tempArrayList.length > 0) {
                pointer = tempArrayList[tempArrayList.length - 1];
            } else {
                level--;
            }
      
        } else if (pointer.type === "tempArray") {
            pointer.index++;
      
            if (pointer.content.length > pointer.index) {
                if (displayType === DisplayType.SENTENCE && pointer.index > 0) {
                    result += " " + pointer.blockOperator + " ";
                }
                pointer = pointer.content[pointer.index];
            } else {
                tempArrayList.pop();
                if (tempArrayList.length > 0) {
                    pointer = tempArrayList[tempArrayList.length - 1];
                    if (displayType === DisplayType.SENTENCE) {
                        result += ")";
                    }
                    level--;
                } else {
                    level = -1;
                }
            }
        }
    }

    return result;
}

const r1t = displaySentence(rule1, DisplayType.TREE);
console.log(r1t);
const r1s = displaySentence(rule1, DisplayType.SENTENCE);
console.log(r1s);
console.log("========================");

const r2t = displaySentence(rule2, DisplayType.TREE);
console.log(r2t);
const r2s = displaySentence(rule2, DisplayType.SENTENCE);
console.log(r2s);
console.log("========================");

const r3t = displaySentence(rule3, DisplayType.TREE);
console.log(r3t);
const r3s = displaySentence(rule3, DisplayType.SENTENCE);
console.log(r3s);
console.log("========================");

const r4t = displaySentence(rule4, DisplayType.TREE);
console.log(r4t);
const r4s = displaySentence(rule4, DisplayType.SENTENCE);
console.log(r4s);
console.log("========================");

const r5t = displaySentence(rule5, DisplayType.TREE);
console.log(r5t);
const r5s = displaySentence(rule5, DisplayType.SENTENCE);
console.log(r5s);
console.log("========================");
