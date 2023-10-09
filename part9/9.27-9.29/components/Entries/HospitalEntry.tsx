import { HospitalEntry,  Diagnosis} from "../../types";
import { Typography } from '@mui/material';

interface Props {
    entry: HospitalEntry;
    diagnoses:  Diagnosis[];

}

const HospitalEntries = ({entry, diagnoses}: Props) =>
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
                {entry.discharge.date}<br />
                {entry.discharge.criteria}<br /> 
            </Typography>
            <br />
        </>
        
    
    );
};

export default HospitalEntries;