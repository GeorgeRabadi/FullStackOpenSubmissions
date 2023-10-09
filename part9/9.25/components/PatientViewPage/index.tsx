import { Patient,  Diagnosis, Entry} from "../../types";
import HospitalEntries from "../Entries/HospitalEntry";
import OccupationalHealthcareEntry from "../Entries/HealthOccupationEntry";
import HealthCheckEntry from "../Entries/HealthCheckEntry";
import { Typography } from '@mui/material';
import { useParams } from "react-router-dom";

interface Props {
    patients: Patient[];
    diagnoses:  Diagnosis[];

}   


const PatientViewPage = ({patients, diagnoses}: Props) =>
{

    const id: string = useParams().id as string;

    const patient: Patient | undefined = patients.find(patient => id === patient.id);

    

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
            break;
        case "HealthCheck":
            return <HealthCheckEntry entry = {param} diagnoses={diagnoses} />;
            break;
        default:
            return <div>No Entries Found</div>;
            break;
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
            

                    
        </div>
    
    );
};

export default PatientViewPage;