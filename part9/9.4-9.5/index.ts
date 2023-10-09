import express from 'express';
const app = express();
const bmi = require('./bmiCalculator')

interface Result {
    height: number
    weight: number
    bmi: string
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/BMI', (req, res) => {


    const height: number = Number(req.query.height)
    const weight: number = Number(req.query.weight)

    console.log(weight)

    if(isNaN(height)|| isNaN(weight))
        res.send("Missing Height or Weight")
    else{

        const response: Result = {
            height,
            weight,
            bmi: bmi.calculateBmi(height, weight)
        }

        res.send(response)
    }
        

  });

  
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});