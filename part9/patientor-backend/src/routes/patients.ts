import express, { request, response } from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
    response.send(patientService.getPatientsWithoutSsn());
});

router.get('/:id', (request, response) => {
    const id = request.params.id;
    response.send(patientService.getPatient(id));
})

router.post('/', (request, response) => {
    const newPatientEntry = toNewPatient(request.body);
    const newPatient = patientService.addPatient(newPatientEntry);
    response.json(newPatient);
});

export default router;