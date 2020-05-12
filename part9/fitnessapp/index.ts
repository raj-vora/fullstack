import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator'

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
    const { height, weight } = request.query;
    if(isNaN(Number(height)) || isNaN(Number(weight))){
        response.status(400).json({error:"Malformatted parameters"})
    }
    const bmi = calculateBmi(Number(height), Number(weight))
    response.json({ weight, height, bmi })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});