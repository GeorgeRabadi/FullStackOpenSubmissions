import { Patient,  Diagnosis, Entry} from "../../types";
import HospitalEntries from "../Entries/HospitalEntry";
import OccupationalHealthcareEntry from "../Entries/HealthOccupationEntry";
import HealthCheckEntry from "../Entries/HealthCheckEntry";
import { Typography } from '@mui/material';
import { useParams } from "react-router-dom";
import {useState} from 'react';
import HospitalForm from '../PatientForms/HospitalForm';
import HealthOccupationalForm from '../PatientForms/HealthOccupationalForm';
import HealthCheckForm from '../PatientForms/HealthCheckForm';

interface Props {
    patients: Patient[];
    diagnoses:  Diagnosis[];

}   


const PatientViewPage = ({patients, diagnoses}: Props) =>
{

    const id: string = useParams().id as string;

    const patient: Patient | undefined = patients.find(patient => id === patient.id);

    const [form, setForm] = useState('HealthCheck');

    

    if(typeof patient  === 'undefined')
    {
        return(
            
            <Typography  variant="h6">
            <br />
            Patient not found!
            </Typography>
        );
    }

    const renderSwitch = (param: Entry) =>
    {
        switch(param.type)
        {
        case "Hospital":
            return <HospitalEntries entry = {param} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry = {param} diagnoses={diagnoses} />;
        case "HealthCheck":
            return <HealthCheckEntry entry = {param} diagnoses={diagnoses} />;
        }
    };
    
    const renderForm = (form: string) =>
    {
        switch(form)
        {
        case "Hospital":
            return <HospitalForm id={patient.id}/>;
        case "OccupationalHealthcare":
            return <HealthOccupationalForm id={patient.id}/>;
        case "HealthCheck":
            return <HealthCheckForm id={patient.id}/>;
        }

    };
       


    return(

        <div> 

            <Typography  variant="h4">
                <br />
                {patient.name}
            </Typography>
            
            <Typography  variant="h5">
                {patient.gender === 'female' ? "Female": "Male"}
            </Typography>

            <Typography  variant="subtitle1">
                ssh: {patient.ssn}
            </Typography>

            <Typography  variant="subtitle1">
                occupation: {patient.occupation}
            </Typography>

            <Typography  variant="h4">
                entries
            </Typography>

            
            {patient.entries.map( entry => renderSwitch(entry) ) }

            <div> Select Form:
                <div>Health Check <input type="radio" name="health" onChange={() => setForm('HealthCheck')} /></div>
                <div>Occupational Healthcare <input type="radio" name="health" onChange={() =>  setForm('OccupationalHealthcare')} /></div>
                <div>Hospital <input type="radio" name="health" onChange={() =>  setForm('Hospital')} /></div>
            </div>
            
            {renderForm(form)}
                    
        </div>
    
    );
};

export default PatientViewPage;