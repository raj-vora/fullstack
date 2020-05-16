import React from "react";
import axios from "axios";
import { Icon, SemanticCOLORS } from "semantic-ui-react";
import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, singlePatient } from "../state";
import { useParams } from "react-router-dom";

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {

    switch (entry.type) {
        case "Hospital":
            return(
                <>
                    {entry.discharge.criteria}: {entry.discharge.date}
                </>
            );
        case "HealthCheck":
            let rating: SemanticCOLORS = "green";
            switch (entry.healthCheckRating) {
                case 0:
                    rating = "green";
                    break;
                case 1: 
                    rating = "yellow";
                    break;
                case 2:
                    rating = "orange";
                    break;
                case 3:
                    rating ="red";
                    break;
                default:
                    break;
            }
            return (
                <>
                    <Icon color={rating} name="heart" />
                </>
            );
        case "OccupationalHealthcare": 
            return (
                <>
                    {entry.employerName}<br />
                    {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
                </>
            );
        default:
            return (<div>

            </div>);
    }
};

const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{patient, diagnoses}, dispatch] = useStateValue();

    React.useEffect(() => {
        const getPatient= async() => {
            const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch(singlePatient(patientFromApi));
        };
        if(!(patient?.id === id)){
            getPatient();
        }
    },[dispatch, patient, id]);

    if(!patient){
        return null;
    }

    let gender = "";
    switch (patient.gender) {
        case "male":
            gender = "man";
            break;
        case "female":
            gender = "woman";
            break;
        case "other": 
            gender = "transgender";
            break;
        default:
            break;
    }
    const boxStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 10
    };
    
    return(
        <div>
            <h1>{patient.name} <Icon className={gender} /> </h1> 
            <p>ssn: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h2>Entries</h2>
            {patient.entries.map(entry => 
                <div key={entry.id} style={boxStyle}>
                    <h4>{entry.date}</h4>
                    {entry.description}<br />
                    <EntryDetails diagnoses={diagnoses} entry={entry} />
                    <ul>
                        {entry.diagnosisCodes?.map(code =>
                            <li>{code} {diagnoses.find(d => d.code===code)?.name}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PatientPage;