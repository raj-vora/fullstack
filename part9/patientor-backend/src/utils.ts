/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from "./types";

const isString = (text: any): text is string => typeof text === 'string' || text instanceof String;

const parseName = (name: any): string => {
    if(!name || !isString(name)) throw new Error('Incorrect or missing name: ' + name);
    return name;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: any): string => {
    if(!date || !isString(date) || !isDate(date)) throw new Error('Incorrect or missing date: ' + date);
    return date;
};

const parseSsn = (ssn: any): string => {
    if(!ssn || !isString(ssn)) throw new Error('Incorrect or missing ssn: ' + ssn);
    return ssn;
};

const isGender = (gender: any): gender is Gender => Object.values(Gender).includes(gender);

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)) throw new Error('Incorrect or missing gender: ' + gender);
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if(!occupation || !isString(occupation)) throw new Error('Incorrect or missing occupation: ' + occupation);
    return occupation;
};

const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
    };
};

export default toNewPatient;