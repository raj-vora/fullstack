import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
    response.send(diaryService.getNonSensitiveDiaryEntries());
});

router.get('/:id', (request, response) => {
    const diary = diaryService.findById(Number(request.params.id));
    if(diary) response.send(diary);
    else response.sendStatus(404);
    
});

router.post('/', (request, response) => {
    const newDiaryEntry =  toNewDiaryEntry(request.body);
    const newEntry = diaryService.addEntry(newDiaryEntry);

    response.json(newEntry);
});

export default router;