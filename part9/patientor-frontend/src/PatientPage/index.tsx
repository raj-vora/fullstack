import React from "react";
import axios from "axios";
import { Icon, SemanticCOLORS, Button } from "semantic-ui-react";

import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, singlePatient } from "../state";
import { useParams } from "react-router-dom";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
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
            return null;
    }
};

const PatientPage: React.FC = () => {
    const boxStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 10
    };
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

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

    const submit = async (values: EntryFormValues) => {
        try{
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patient.id}/entries`, 
                values
            );
            dispatch(singlePatient(updatedPatient));
            closeModal();
        } catch (error) {
            console.error(error.response.data);
            setError(error.response.data.error);
        }
    };
    
    return(
        <div>
            <Button onClick={() => openModal()}>Add Entry</Button>
            <h1>{patient.name} <Icon className={gender} /> </h1> 
            <p>ssn: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h2>Entries</h2>
            {patient.entries.map(entry => 
                <div key={entry.id} style={boxStyle}>
                    <h4>{entry.date}</h4>
                    {entry.description}<br />
                    <EntryDetails entry={entry} />
                    <ul>
                        {entry.diagnosisCodes?.map(code =>
                            <li key={code}>{code} {diagnoses.find(d => d.code===code)?.name}</li>
                        )}
                    </ul>
                </div>
            )}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submit}
                error={error}
                onClose={closeModal}
            />
        </div>
    );
};

export default PatientPage;