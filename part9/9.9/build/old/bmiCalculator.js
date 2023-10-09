"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBmi = void 0;
const parseArguments = (args) => {
    if (args.length < 4)
        throw new Error('Not enough arguments');
    if (args.length > 4)
        throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            weight: Number(args[2]),
            height: Number(args[3])
        };
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};
const calculateBmi = (weight, height) => {
    const bmi = 10000 * weight / (height * height);
    if (bmi > 25)
        return "Overweight";
    else if (18.5 < bmi && bmi < 25)
        return "Normal (Healthy Weight)";
    else
        return "Underweight";
};
exports.calculateBmi = calculateBmi;
try {
    const { weight, height } = parseArguments(process.argv);
    console.log((0, exports.calculateBmi)(weight, height));
}
catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
