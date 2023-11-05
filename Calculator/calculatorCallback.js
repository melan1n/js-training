// Implement "calculator" in javascript. Do not use the javascript "eval" function.
// Input: A mathematical expression using "+", "-", "*", "/", "sin", "cos" and brackets.
// Output: The result of the expression.
// Example input:
// "5 * (3+4)"
// "3.14 * sin(2.78+4*5)"
// Allow for passing params. 
//Example: console.log(calculate("a+5", { a: 5 })); // 10
//transform calculate() function to be async:
//   - use callback

async function calculate(input, params) {
    try {
        let args = tokenize(input, params);
        let result = await calculateArgs(args, params);      
        return calculateExpression(result)
    } catch (err) {
        return `there was an error + ${err}`
    }
}

async function calculateArgs (args, params) {
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
                if (prefixOperator === undefined) {
                    res = new Promise((resolve, reject) => {
                        resolve(expression)
                    });
                } else {
                    res = new Promise((resolve, reject) => {
                        resolve(calculateExpression(expression, params, prefixOperator))
                    });
                }

            }
            args.splice(indexOfOpeningParenthesis, deleteCount);
            args.splice(indexOfOpeningParenthesis, 0, await res);
            indexOfFirstClosingParenthesis = args.indexOf(')');
        }

        let allPromise = Promise.all(args);
        return await allPromise
}

function calculateExpression(args, params, prefixOperator) {
    if (['+', '-', '*', '/', '(', ')', undefined].includes(prefixOperator)) {
        if (args.length === 0) return;
        if (args.length === 1) {
            if (Array.isArray(args[0])) {
                //return args[0][0];
                return calculateExpression(args[0]);
            } else {
                return args[0];
            }
        }


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

        if (!isNumeric(args[0])) {
            args = args[0].split(',');
            args = args.map(x => params.hasOwnProperty(x) ? x = params[x.toString()] : x = x);
        }
        return func(...args);
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

async function assert(a, b) {
    const aresult = await Promise.resolve(a);
    const bresult = await Promise.resolve(b);

    if (aresult != aresult) {
        throw new Error(`${aresult} === ${bresult}`);
    }
}

//Tests:
// assert(calculateWithCallback("(31)", null, callback), 31).then(() => {
//     console.log('done');
// }).catch(err => {
//     console.log(err);
// });

// assert(calculateWithCallback("sin(30)", null, callback), -0.9880316240928618).then(() => {  //-0.9880316240928618
//     console.log('done');
// }).catch(err => {
//     console.log(err);
// });

// assert(calculateWithCallback("(cos(30))", null, callback), 0.15425144988758405).then(() => { //0.15425144988758405
//     console.log('done');
// }).catch(err => {
//     console.log(err);
// });

// assert(calculateWithCallback("(((31 + 25)))", null, callback), 56).then(() => { //56
//     console.log('done');
// }).catch(err => {
//     console.log(err);
// });

calculateWithCallback("(31)", null, callback); //31
calculateWithCallback("sin(30)", null, callback); //-0.9880316240928618
calculateWithCallback("(cos(30))", null, callback); //0.15425144988758405
calculateWithCallback("(((31 + 25)))", null, callback); //56
calculateWithCallback("(31 - 25)", null, callback); //6 
calculateWithCallback("31 *10", null, callback); //310
calculateWithCallback("600 / 20", null, callback); //30
calculateWithCallback("5 * (3+4)", null, callback); //35
calculateWithCallback("(3 * (15 - 1) + 4)", null, callback); //46
calculateWithCallback("(3 * (5 - 1) / (1+1) + 4)", null, callback); //10
calculateWithCallback("((3) * ((6-1) - 1) / (1+1) - 4)", null, callback); //2
calculateWithCallback("cos(sin(30))", null, callback); //0.5503344099628432
calculateWithCallback("cos(((3) * ((6-1) - 1) / (1+1) - 4))", null, callback); //-0.4161468365471424
calculateWithCallback("cos(30)*sin(30)", null, callback); //-0.15240531055110834
calculateWithCallback("1+sin(2+3)", null, callback); //0.041075725336861546
calculateWithCallback("s + 5", { s: 5 }, callback); //10
calculateWithCallback("5 + a2b", { a2b: 5 }, callback); //10
calculateWithCallback("ab + 5", { ab: 5 }, callback); //10
calculateWithCallback("5 + 2ab", { "2ab": 5 }, callback); //10
calculateWithCallback("s + ab2", { "ab2": 5, s: 5 }, callback); //10
calculateWithCallback("sin(s + ab2)", { "ab2": 5, s: 5 }, callback); //-0.5440211108893698
calculateWithCallback("cos(s*ab2)", { "ab2": 5, s: 2 }, callback); //-0.8390715290764524
calculateWithCallback("a+f(10)+5", { a: 5, f: (x) => x * x }, callback); //5+100+5 = 110
calculateWithCallback("a+func((b+c))+5", { a: 5, func: (x) => x * x, b: 3, c: 7 }, callback); //5+100+5 = 110
calculateWithCallback("a+func(b, c)+5", { a: 5, func: (x, y, cb) => { function cb(x, y) { return x + y; } return cb(x, y); }, b: 3, c: 7 }, callback); //5+10+5 = 20
calculateWithCallback("a+f(10)+5", { a: 5, f: (x, cb) => { function cb(x) { return x * x; } return cb(x); } }, callback); //5+100+5 = 110
calculateWithCallback("a+fdas(10)+5", { a: 5, f: (x, cb) => { function cb(x) { return x * x; } return cb(x); } }, callback); //log error

//CALLBACK START
function calculateWithCallback(input, params, callback) {
    let res = calculate(input, params);
    if (res.err) {
        console.log(res.err)
    }
    callback(null, res)
}

function callback(err, result) {
    if (err) {
        console.log(err.err);
        return;
    }
    (result.then(console.log));
}

// cb: (err, result) => void

// function calculate(input, params, cb) {
//     //...

//     // cb('err') - when there is an error
//     // return;

//     // cb(null, theresult);
// }

// calculate("a+f(10)+5", { a: 5, f: async (x) => x*x }).then(console.log); // 5+100+5 = 110

// calculate("a+f(10)+5", { a: 5, f: (x, cb) => {
//      cb(null, x*x);  
// }}, (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     console.log(data);
// })

// console.log(calculateWithCallback("a+f(10)+5", {
//     a: 5, f: (x, cb) => {
//         function cb(x) {
//             return x * x
//         };
//         return cb(x);
//     }
// }, calculate) == parseFloat(110));

// function callback(input, params) {
//     // if (err) {
//     //     console.log(err);
//     //     return;
//     //    }
//        console.log(calculate(input, params))
// }

