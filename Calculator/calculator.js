// Implement "calculator" in javascript. Do not use the javascript "eval" function.
// Input: A mathematical expression using "+", "-", "*", "/", "sin", "cos" and brackets.
// Output: The result of the expression.
// Example input:
// "5 * (3+4)"
// "3.14 * sin(2.78+4*5)"

function calculate(input) {
    input = input.replace(/\s/g, '');
    let args = [];
    let num = [];
    for (let i = 0; i < input.length; i++) {
        let curr = input[i];
        if (['+', '-', '*', '/', '(', ')'].includes(curr)) {
            pushCharsToNumArray();
            args.push(curr);
        } else if (curr === 's' || curr == 'c') {
            let func = [input[i], input[++i], input[++i]]
            pushCharsToNumArray();
            args.push(func.join(''));
        } else {
            num.push(curr);
        }
    }

    pushCharsToNumArray();

    let indexOfFirstClosingParenthesis = args.indexOf(')');
    while (indexOfFirstClosingParenthesis > -1) {
        let argsToFirstClosingParenhesis = [];
        for (i = 0; i < indexOfFirstClosingParenthesis; i++) {
            argsToFirstClosingParenhesis[i] = args[i];
        }
        let indexOfOpeningParenthesis = argsToFirstClosingParenhesis.lastIndexOf('(');
        let deleteCount = indexOfFirstClosingParenthesis + 1 - indexOfOpeningParenthesis;
        let expression = argsToFirstClosingParenhesis.slice(indexOfOpeningParenthesis + 1, argsToFirstClosingParenhesis.length);
        let prefixOperator = argsToFirstClosingParenhesis.slice(indexOfOpeningParenthesis - 1, indexOfOpeningParenthesis)[0];
        let res = '';
        if (prefixOperator === 'sin') {
            indexOfOpeningParenthesis -= 1;
            deleteCount += 1
            res = Math.sin(calculateExpression(expression));
        } else if (prefixOperator === 'cos') {
            indexOfOpeningParenthesis -= 1;
            deleteCount += 1
            res = Math.cos(calculateExpression(expression));
        } else {
            res = calculateExpression(expression);
        }
        args.splice(indexOfOpeningParenthesis, deleteCount);
        args.splice(indexOfOpeningParenthesis, 0, res.toString());
        indexOfFirstClosingParenthesis = args.indexOf(')');
    }

    return calculateExpression(args);

    function pushCharsToNumArray() {
        if (num.length > 0) {
            args.push(num.join(''));
            num = [];
        }
    }
}

function calculateExpression(args) {
    if (args.length === 0) return;
    if (args.length === 1) return args[0];

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '*') {
            let product = parseFloat(args[i - 1]) * parseFloat(args[i + 1]);
            args.splice(i - 1, 3, product.toString());
            calculateExpression(args);
        } else if (args[i] === '/') {
            let division = parseFloat(args[i - 1]) / parseFloat(args[i + 1]);
            args.splice(i - 1, 3, division.toString());
            calculateExpression(args)
        } else {
            continue;
        }
    }

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '+') {
            let sum = parseFloat(args[i - 1]) + parseFloat(args[i + 1]);
            args.splice(i - 1, 3, sum.toString());
            calculateExpression(args);
        } else if (args[i] === '-') {
            let subtraction = parseFloat(args[i - 1]) - parseFloat(args[i + 1]);
            args.splice(i - 1, 3, subtraction.toString());
            calculateExpression(args);
        } else {
            continue;
        }
    }
    return args[0];
}

Tests:
console.log(calculate("(31)") == parseFloat(31));              //31
console.log(calculate("sin(30)") == parseFloat(-0.9880316240928618));           //-0.9880316240928618
console.log(calculate("(cos(30))") == parseFloat(0.15425144988758405));         //0.15425144988758405
console.log(calculate("(((31 + 25)))") == parseFloat(56));         //56
console.log(calculate("31 - 25") == parseFloat(6));           //6  
console.log(calculate("31 *10") == parseFloat("310"));            //310 
console.log(calculate("600 / 20") == parseFloat(30) );          //30  
console.log(calculate("5 * (3+4)") == parseFloat(35));         //35 
console.log(calculate("(3 * (15 - 1) + 4)") == parseFloat(46)); //46
console.log(calculate("(3 * (5 - 1) / (1+1) + 4)") == parseFloat(10));  //10 
console.log(calculate("((3) * ((6-1) - 1) / (1+1) - 4)") == parseFloat(2)); //2 
console.log(calculate("cos(sin(30))") == parseFloat(0.5503344099628432)); //0.5503344099628432  
console.log(calculate("cos(((3) * ((6-1) - 1) / (1+1) - 4))") == parseFloat(-0.4161468365471424)); //-0.4161468365471424 
console.log(calculate("cos(30)*sin(30)") == parseFloat(-0.15240531055110834)); //-0.15240531055110834  
console.log(calculate("1+sin(2+3)") == parseFloat(0.041075725336861546)) //0.041075725336861546


