import { Patient } from "../../types";
import { Typography } from '@mui/material';
import { useParams } from "react-router-dom";

const PatientViewPage = ({patients}: {patients: Patient[]}) =>
{

    const id: string = useParams().id as string;
    console.log(id);

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
                    
        </>
    
    );
};

export default PatientViewPage;