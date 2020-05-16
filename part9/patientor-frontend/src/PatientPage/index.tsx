import React from "react";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, singlePatient } from "../state";
import { useParams } from "react-router-dom";

const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{patient}, dispatch] = useStateValue();

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
    
    return(
        <div>
            <h1>{patient.name} <Icon className={patient.gender} /> </h1> 
            <p>ssn: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h2>Entries</h2>
            {patient.entries.map(entry => 
                <div key={entry.id}>
                    {entry.date}<br />
                    {entry.description}
                    <ul>
                        {entry.diagnosisCodes?.map(code =>
                            <li>{code}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PatientPage;