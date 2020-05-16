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
    const [singlepatient, setSinglePatient] = React.useState<Patient>();

    React.useEffect(() => {
        const getPatient= async() => {
            const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            setSinglePatient(patientFromApi);
            dispatch(singlePatient(patientFromApi));
        };
        if(!(patient?.id === id)){
            getPatient();
        } else {
            setSinglePatient(patient);
        }
    },[dispatch, patient, id]);

    if(!singlepatient){
        return null;
    }
    
    return(
        <div>
            <h1>{singlepatient.name} <Icon className={singlepatient.gender} /> </h1> 
            <p>ssn: {singlepatient.ssn}</p>
            <p>Occupation: {singlepatient.occupation}</p>
        </div>
    );
};

export default PatientPage;