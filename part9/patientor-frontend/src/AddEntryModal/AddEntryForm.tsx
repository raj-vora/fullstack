import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, NumberField } from "./FormField";
import { useStateValue } from "../state";
import { Entry } from "../types";

interface Props {
    onSubmit: (values: unknown) => void;
    onCancel: () => void;
    type: Entry['type'];
}

const Hosp = () => (
    <>
        <Field 
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
        />
        <Field 
            label="Discharge Criteria"
            placeholder="Criteria for discharge"
            name="discharge.criteria"
            component={TextField}
        />
    </>
);

const Occu = () => (
    <>  
        <Field 
            label="Employer Name"
            placeholder="Name"
            name="employerName"
            component={TextField}
        />
        <Field 
            label="Sick leave start"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
        />
        <Field 
            label="Sick leave end"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
        />
    </>
);

const HealthCheck = () => (
    <>
        <Field
            label="healthCheckRating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
        />
    </>
);

const setInitialValues = (type: Entry['type']) => {
    switch (type) {
        case "Hospital":
            return{
                type,
                description: "",
                date:"",
                specialist: "",
                diagnosisCodes: [""],
                discharge: {
                    date: "",
                    criteria: ""
                }
            };
        case "OccupationalHealthcare":
            return {
                type,
                description: "",
                date:"",
                specialist: "",
                diagnosisCodes: [""],
                employerName: "",
                sickLeave: {
                    startDate: "",
                    endDate: ""
                }
            };
        case "HealthCheck":
            return {
                type,
                description: "",
                date:"",
                specialist: "",
                diagnosisCodes: [""],
                healthCheckRating: 0
            };
        default:
            return{
                description: "",
                date:"",
                specialist: "",
                diagnosisCodes: [""]
            };
    }
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, type }) => {
    const [{ diagnoses }] = useStateValue();
    return(
        <Formik
            initialValues = {setInitialValues(type)}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: {[field: string]: string} = {};
                if(!values.date) errors.date = requiredError;
                if(!values.description) errors.description = requiredError;
                if(!values.specialist) errors.specialist = requiredError;
                if(!values.type) errors.type = requiredError;

                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        Type
                        <input value={type} disabled />
                        <Field 
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field 
                            label="Description"
                            placeholder="Entry description"
                            name="description"
                            component={TextField}
                        />
                        <Field 
                            label="Specialist"
                            placeholder="Specialist name"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        {
                            type==="Hospital"
                            ? <Hosp />   
                            : null
                        }
                        {
                            type==="OccupationalHealthcare"
                            ? <Occu />
                            : <HealthCheck />
                        }
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                type="submit"
                                floated="right"
                                color="green"
                                disabled={!dirty || !isValid}
                                >
                                Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;