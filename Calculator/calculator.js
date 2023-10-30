// Implement "calculator" in javascript. Do not use the javascript "eval" function.
// Input: A mathematical expression using "+", "-", "*", "/", "sin", "cos" and brackets.
// Allow for passing params. Allow for passing functions
// Output: The result of the expression.
// Example input:
// "5 * (3+4)"
// "3.14 * sin(2.78+4*5)"
// "a+5", { a: 5 } // 10
// "a+f(10)+5", { a: 5, f: (x) => x * x } //110

function calculate(input, params) {
    input = input.replace(/\s/g, '');
    let args = [];
    let num = [];
    let parameter = [];
    for (let i = 0; i < input.length; i++) {
        let curr = input[i];
        if (['+', '-', '*', '/', '(', ')'].includes(curr)) {
            pushNumToArray();
            pushParameterToArray();
            args.push(curr);
        } else if (curr === 's') {
            let currI = i;
            if (input[++currI] === 'i' && input[++currI] === 'n') {
                let func = [input[i], input[++i], input[++i]]
                pushNumToArray();
                pushParameterToArray();
                args.push(func.join(''));
            } else {
                parameter.push(curr);
            }
        } else if (curr == 'c') {
            let currI = i;
            if (input[++currI] === 'o' && input[++currI] === 's') {
                let func = [input[i], input[++i], input[++i]]
                pushNumToArray();
                pushParameterToArray();
                args.push(func.join(''));
            } else {
                parameter.push(curr);
            }
        } else {
            if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(curr)) {
                parameter.push(curr);
                num.push(curr);
            } else {
                parameter.push(curr);
            }
        }
    }

    pushNumToArray();
    pushParameterToArray();

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
        } else { //function to evaluate
            if (!(['+', '-', '*', '/', '(', undefined].includes(prefixOperator))) {
                indexOfOpeningParenthesis --;
                deleteCount ++;
            }
            
            res = calculateExpression(expression, prefixOperator);
        }
        args.splice(indexOfOpeningParenthesis, deleteCount);
        args.splice(indexOfOpeningParenthesis, 0, res.toString());
        indexOfFirstClosingParenthesis = args.indexOf(')');
    }

    return calculateExpression(args);

    function pushNumToArray() {
        if (num.length > 0 && num.length >= parameter.length) {
            args.push(num.join(''));
            num = [];
            parameter = [];
        }
    }

    function pushParameterToArray() {
        if (parameter.length > 0) {
            let p = parameter.join('');
            if (params != undefined &&
                params != null &&
                params.hasOwnProperty(p) &&
                isNumeric(params[p.toString()])) {
                args.push(params[p.toString()].toString());
            } else {
                args.push(p.toString());
            }
            num = [];
            parameter = [];
        }
    }

    function calculateExpression(args, prefixOperator) {
        if (['+', '-', '*', '/', '(', ')', undefined].includes(prefixOperator)) {
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
        } else {
            let func = params[prefixOperator];
            //['b,c']
            if (!isNumeric(args[0])) {
                args = args[0].split(',');
                args = args.map(x => params.hasOwnProperty(x) ? x=params[x.toString()] : x=x);
            }
            return func(...args);       
        }
        
    }
}

function isNumeric(obj) {
    if (typeof obj.toString() != "string") return false // we only process strings!  
    return !isNaN(obj.toString()) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(obj.toString())) // ...and ensure strings of whitespace fail
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
console.log(calculate("s + 5", { s: 5 }) == parseFloat(10)); // 10
console.log(calculate("ab + 5", { ab: 5 }) == parseFloat(10)); // 10
console.log(calculate("5 + a2b", { a2b: 5 }) == parseFloat(10)); // 10
console.log(calculate("5 + 2ab", { "2ab": 5 }) == parseFloat(10)); // 10
console.log(calculate("s + ab2", { "ab2": 5, s: 5 }) == parseFloat(10)); // 10
console.log(calculate("sin(s + ab2)", { "ab2": 5, s: 5 }) == parseFloat(-0.5440211108893698)); // -0.5440211108893698
console.log(calculate("cos(s*ab2)", { "ab2": 5, s: 2 }) == parseFloat(-0.8390715290764524)); // -0.8390715290764524
console.log(calculate("a+f(10)+5", { a: 5, f: (x) => x * x }) == parseFloat(110)); // 5+100+5 = 110
console.log(calculate("a+func((b+c))+5", { a: 5, func: (x) => x * x, b: 3, c: 7 }) == parseFloat(110)); // 5+100+5 = 110
console.log(calculate("a+func(b, c)+5", { a: 5, func: (x, y) => x + y, b: 3, c: 7 }) == parseFloat(20)); // 5+10+5 = 20





