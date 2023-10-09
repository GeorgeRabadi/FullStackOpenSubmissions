import { Patient,  Diagnosis} from "../../types";
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
    else
    return(

        <> 
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


            {patient.entries.map(entry => <Typography key ={entry.id} variant="subtitle1">
                {entry.date}<br />
                {entry.description} <br /> 
                {typeof entry.diagnosisCodes != 'undefined' ? 
                entry.diagnosisCodes.map(code => <li key = {code}>{code} 
                <br />{diagnoses?.find(diagnoses => diagnoses.code === code)?.name}
                </li>) 
                :''}

                </Typography>)} 
            

                    
        </>
    
    );
};

export default PatientViewPage;