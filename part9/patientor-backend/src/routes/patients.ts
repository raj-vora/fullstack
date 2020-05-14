import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
    response.send(patientService.getPatientsWithoutSsn());
});

router.post('/', (request, response) => {
    const newPatientEntry = toNewPatient(request.body);
    const newPatient = patientService.addPatient(newPatientEntry);
    response.json(newPatient);
});

export default router;