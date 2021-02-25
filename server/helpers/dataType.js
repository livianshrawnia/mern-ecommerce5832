module.exports.string = (input) => {
    let stringVar = '';
    if(typeof input !== 'string'){
        return stringVar;
    }
    return input;
}

module.exports.integer = (input) => {
    let integerVar = 0;
    if(!Number.isInteger(input)){
        return integerVar;
    }
    return input;
}

module.exports.decimal = (input) => {
    let decimalVar = 0.00;
    if(typeof input !== 'number' || Number.isNaN(input)){
        return decimalVar;
    }
    return Number(input.toFixed(2));
}

module.exports.boolean = (input) => {
    let booleanVar = false;
    if(typeof input !== 'boolean'){
        return booleanVar;
    }
    return input;
}

module.exports.array = (input) => {
    let arrayVar = [];
    if(!Array.isArray(input)){
        return arrayVar;
    }
    return input;
}