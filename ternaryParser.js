const res = run(`if (var_1 == 2, 0, if (var_2 == 4, 15, 0))
+ if (var_2 == 3, 5, 0)
- if (var_4 == 2, 0, 5)
+ if (var_3 == 3, 5, 0)`, {
    var_1: 1,
    var_2: 4,
    var_3: 3,
    var_4: 5
})

console.log(res)

function run(expression, data) {

    // Get the arithmetic operators
    let operator = expression.replaceAll(/[^+\-*/]/g, '');
    operator = operator.split('')

    // sanitize expression
    expression = expression.replaceAll(/\r?\n|\r/g, '');
    expression = expression.replaceAll(' ', '');

    // fill variables with data
    for (let key in data) {
        expression = expression.replaceAll(key, data[key])
    }

    // separate operators
    expression = expression.split(/[+-]/);

    let arithmeticExpression = '';

    expression.forEach(exp => {
        arithmeticExpression += `${parseString(exp) || ''} ${operator.length > 0 ? operator.shift() : ''}`
    })

    return eval(arithmeticExpression);
}


function parseString(expression) {

    let regx =  /^if\s*\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)$/; // for parsing ternary if
    let nestedRegex = /if\s*\(.+?(?=(,\s*if\s*\(|\s*\)))/g; // For nested if

    let nestedExpressions = expression.match(nestedRegex);

    if (nestedExpressions.length > 1){
        nestedExpressions.shift(); // remove parent if
        nestedExpressions.forEach( ex => {
            expression = expression.replace(ex  + ')', parseString(ex + ')') );
        })
    }

    let match = expression.match(regx);

    let condition = match[1];
    let truthVal = match[2];
    let falseVal = match[3];

    return eval(condition) ? eval(truthVal) : eval(falseVal)
}

