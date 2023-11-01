// Implement "calculator" in javascript. Do not use the javascript "eval" function.
// Input: A mathematical expression using "+", "-", "*", "/", "sin", "cos" and brackets.
// Output: The result of the expression.
// Example input:
// "5 * (3+4)"
// "3.14 * sin(2.78+4*5)"
// Allow for passing params. 
//Example: console.log(calculate("a+5", { a: 5 })); // 10

async function calculate(input, params) {
    let args = tokenize(input, params);
    while (args.length > 1) {
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
            if (!(['+', '-', '*', '/', '(', undefined].includes(prefixOperator))) {
                indexOfOpeningParenthesis--;
                deleteCount++;
            }
            let res = '';
            if (prefixOperator === 'sin') {
                res = Math.sin(calculateExpression(expression));
            } else if (prefixOperator === 'cos') {
                res = Math.cos(calculateExpression(expression));
            } else { //function to evaluate
                if(prefixOperator === undefined) {
                    res = new Promise((resolve, reject) => {
                        resolve(expression)
                    });
                } else {
                    res = new Promise((resolve, reject) => {
                        resolve(calculateExpression(expression, prefixOperator))
                    });
                }
                
            }
            args.splice(indexOfOpeningParenthesis, deleteCount);
            args.splice(indexOfOpeningParenthesis, 0, res);
            indexOfFirstClosingParenthesis = args.indexOf(')');
        }

        let allPromise = Promise.all(args);
        return await allPromise.then(values => (calculateExpression(values)));
        args = [2]
        //return calculateExpression(args);
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
                args = args.map(x => params.hasOwnProperty(x) ? x = params[x.toString()] : x = x);
            }
            return func(...args);
        }
    }
}

function tokenize(input, params) {
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

    return args;

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
}

function isNumeric(obj) {
    if (typeof obj.toString() != "string") return false // we only process strings!  
    return !isNaN(obj.toString()) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(obj.toString())) // ...and ensure strings of whitespace fail
}

//Tests:
//calculate("(31)").then(console.log);              //31
calculate("sin(30)").then(console.log);           //-0.9880316240928618
//calculate("(cos(30))").then(console.log);         //0.15425144988758405
//calculate("(((31 + 25)))").then(console.log);         //56
calculate("31 - 25").then(console.log);           //6  
calculate("31 *10").then(console.log);            //310 
calculate("600 / 20").then(console.log);          //30  
calculate("5 * (3+4)").then(console.log);         //35 
//calculate("(3 * (15 - 1) + 4)").then(console.log); //46
//calculate("(3 * (5 - 1) / (1+1) + 4)").then(console.log);  //10 
//calculate("((3) * ((6-1) - 1) / (1+1) - 4)").then(console.log); //2 
calculate("cos(sin(30))").then(console.log); //0.5503344099628432  
//calculate("cos(((3) * ((6-1) - 1) / (1+1) - 4))").then(console.log); //-0.4161468365471424 
calculate("cos(30)*sin(30)").then(console.log); //-0.15240531055110834  
calculate("1+sin(2+3)").then(console.log) //0.041075725336861546
calculate("s + 5", { s: 5 }).then(console.log); // 10
calculate("ab + 5", { ab: 5 }).then(console.log); // 10
calculate("5 + a2b", { a2b: 5 }).then(console.log); // 10
calculate("5 + 2ab", { "2ab": 5 }).then(console.log); // 10
calculate("s + ab2", { "ab2": 5, s: 5 }).then(console.log); // 10
calculate("sin(s + ab2)", { "ab2": 5, s: 5 }).then(console.log); // -0.5440211108893698
calculate("cos(s*ab2)", { "ab2": 5, s: 2 }).then(console.log); // -0.8390715290764524
calculate("a+f(10)+5", { a: 5, f: (x) => x * x }).then(console.log); // 5+100+5 = 110
//calculate("a+func((b+c))+5", { a: 5, func: (x) => x * x, b: 3, c: 7 }).then(console.log); // 5+100+5 = 110
calculate("a+func(b, c)+5", { a: 5, func: (x, y) => x + y, b: 3, c: 7 }).then(console.log); // 5+10+5 = 20
calculate("a+f(10)+5", { a: 5, f: async (x) => x*x }).then(console.log); // 5+100+5 = 110




