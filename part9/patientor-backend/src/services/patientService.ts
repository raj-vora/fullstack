import patients from '../../data/patients';
import { Patient, PatientWithoutSsn, NewPatient } from '../types';

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const getPatient = (id: string): Patient |undefined => {
    return patients.find(patient => patient.id===id);
}

const addPatient = ( patient: NewPatient ): Patient => {
    const string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let newId = '';
    for(let i=0; i<4; i++){
        const temp = Math.round((Math.random()*100)%62);
        newId = newId+string[temp];
    }
    const NewPatient = {
        id: `d277${newId}-f723-11e9-8f0b-362b9e155667`,
        ...patient
    };
    patients.push(NewPatient);
    return NewPatient;
};

export default {
    addPatient,
    getPatient,
    getPatients,
    getPatientsWithoutSsn
};