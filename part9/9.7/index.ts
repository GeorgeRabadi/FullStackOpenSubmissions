import express from 'express';
const app = express();
app.use(express.json());

import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';


interface Result {
    height: number
    weight: number
    bmi: string
}


app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parameter: string[] = daily_exercises.map(String);
  parameter.push(String(target));

  return res.send(calculateExercises(parameter));

});



app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/BMI', (req, res) => {


    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if(isNaN(height)|| isNaN(weight))
        res.send("Missing Height or Weight");
    else{

        const response: Result = {
            height,
            weight,
            bmi: calculateBmi(weight, height)
        };

        res.send(response);
    }
        

  });

  
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});