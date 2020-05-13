import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
    const { height, weight } = request.query;
    if(isNaN(Number(height)) || isNaN(Number(weight))){
        response.status(400).json({error:"Malformatted parameters"});
    }
    const bmi = calculateBmi(Number(height), Number(weight));
    response.json({ weight, height, bmi });
});

app.post('/exercise', (request, response) => {
  const { dailyExercises, target } = request.body;
  if(!dailyExercises || !target){
    response.status(400).json({error:"Parameters missing"}).end();
  }
  if(isNaN(Number(target))){
    response.status(400).json({error:"Malformatted parameters"}).end();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dailyExercises.forEach((element: any) => {
    if(isNaN(Number(element))) {
      response.status(400).json({error:"Malformatted parameters"}).end();
    }
  });

  response.json(calculateExercises(dailyExercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});