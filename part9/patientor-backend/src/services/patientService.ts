import patients from '../../data/patients';
import { Patient, PatientWithoutSsn, Entry, NewPatient } from '../types';

const generateId = (): string => {
    const string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let newId = '';
    for(let i=0; i<4; i++){
        const temp = Math.round((Math.random()*100)%62);
        newId = newId+string[temp];
    }
    return newId;
};

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};

const getPatient = (id: Patient['id']): Patient | undefined => {
    return patients.find(patient => patient.id===id);
};

const addPatient = ( patient: NewPatient ): NewPatient => {
    const string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let newId = generateId();
    for(let i=0; i<4; i++){
        const temp = Math.round((Math.random()*100)%60);
        newId = newId+string[temp];
    }
    const newPatient = {
        id: `d277${newId}-f723-11e9-8f0b-362b9e155667`,
        entries: [],
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

const updatePatient = (id: Patient['id'], entry: Entry): Patient | undefined => {
    const patient = patients.find(patient => patient.id===id);
    patient?.entries.push({...entry, id: generateId()});
    return patient;
};

export default {
    addPatient,
    getPatient,
    getPatients,
    getPatientsWithoutSsn,
    updatePatient
};