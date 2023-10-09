import { HealthCheckEntry,  Diagnosis} from "../../types";
import { Typography } from '@mui/material';

interface Props {
    entry: HealthCheckEntry;
    diagnoses:  Diagnosis[];

}

const HealthCheckEntries = ({entry, diagnoses}: Props) =>
{
    console.log(entry);
    return(
        <> 
            <Typography variant="subtitle1">
                {entry.type}<br />
                {entry.date}<br />
                {entry.description} <br /> 
                {typeof entry.diagnosisCodes != 'undefined' ? 
                entry.diagnosisCodes.map(code => <li key = {code}>{code} 
                <br />{diagnoses?.find(diagnoses => diagnoses.code === code)?.name}
                </li>) 
                :''}
                {entry.healthCheckRating}<br />
            </Typography>
            <br />
        </>
        
    
    );
};

export default HealthCheckEntries;