import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
    response.send(patientService.getPatientsWithoutSsn());
});

router.get('/:id', (request, response) => {
    const id = request.params.id;
    response.send(patientService.getPatient(id));
});

router.post('/', (request, response) => {
    const newPatientEntry = toNewPatient(request.body);
    const newPatient = patientService.addPatient(newPatientEntry);
    response.json(newPatient);
});

router.post('/:id/entries', (request, response) => {
    const userId = request.params.id;
    const body = request.body;
    const { description, date, specialist, type } = body;
    if( !description || !date || !specialist || !type ) {
        response.status(400).send({"error": "base parameters missing"}).end();
    }
    switch (type) {
        case "Hospital":
            const { discharge } = body;
            if( !discharge ) {
                response.status(400).send({"error": "parameters missing"}).end();
            }
            break;
        case "OccupationalHealthcare":
            const { employerName } = body;
            if( !employerName ) {
                response.status(400).send({"error": "parameters missing"}).end();
            }
            break;
        default:
            break;
    }
    const patient = patientService.updatePatient(userId, request.body);
    response.send(patient);
});

export default router;