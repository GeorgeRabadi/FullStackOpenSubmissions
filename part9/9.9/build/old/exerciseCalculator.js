"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExercises = void 0;
const calculateExercises = (hours) => {
    const length = hours.length;
    const periodLength = length - 3;
    let trainingDays = 0;
    let sum = 0;
    let success = false;
    let rating = 1;
    let ratingDescription = "Not even close!";
    const target = parseInt(hours[length - 1]);
    for (let i = 2; i < length - 1; i++) {
        if (isNaN(Number(hours[i]))) {
            throw new Error('Provided values were not all numbers!');
        }
        console.log(hours[i]);
        if (Number(hours[i]) != 0)
            trainingDays++;
        sum += Number(hours[i]);
    }
    const average = sum / periodLength;
    if (average > target) {
        rating = 3;
        success = true;
        ratingDescription = "Excellent!";
    }
    else if (average > target / 2) {
        rating = 2;
        success = false;
        ratingDescription = "Could have done better.";
    }
    const result = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
    return result;
};
exports.calculateExercises = calculateExercises;
try {
    console.log((0, exports.calculateExercises)(process.argv));
}
catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
