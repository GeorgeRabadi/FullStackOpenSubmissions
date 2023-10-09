import { OccupationalHealthcareEntry,  Diagnosis} from "../../types";
import { Typography } from '@mui/material';

interface Props {
    entry: OccupationalHealthcareEntry;
    diagnoses:  Diagnosis[];

}

const HealthOccupationEntries = ({entry, diagnoses}: Props) =>
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
                {entry.employerName}<br />
                {typeof entry.sickLeave !== 'undefined' ? entry.sickLeave.startDate : ''}<br /> 
                {typeof entry.sickLeave !== 'undefined' ? entry.sickLeave.endDate : ''}<br /> 
            </Typography>
            <br />
        </>
        
    
    );
};

export default HealthOccupationEntries;