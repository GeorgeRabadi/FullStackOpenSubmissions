"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const bmiCalculator_1 = require("./bmiCalculator");
const exerciseCalculator_1 = require("./exerciseCalculator");
app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parameter = daily_exercises.map(String);
    parameter.push(String(target));
    return res.send((0, exerciseCalculator_1.calculateExercises)(parameter));
});
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});
app.get('/BMI', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight))
        res.send("Missing Height or Weight");
    else {
        const response = {
            height,
            weight,
            bmi: (0, bmiCalculator_1.calculateBmi)(weight, height)
        };
        res.send(response);
    }
});
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
