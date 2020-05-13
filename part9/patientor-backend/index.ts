import express from 'express';
const app = express();
import cors from 'cors';
app.use(express.json());
app.use(cors());
const PORT=3001;

app.get('/api/ping', (_request, response) => {
    console.log('someone pinged here');
    response.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});