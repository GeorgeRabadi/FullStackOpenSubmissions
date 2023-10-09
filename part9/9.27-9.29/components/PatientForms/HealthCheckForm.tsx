import {useState} from 'react';
import {Diagnosis, newEntry, ValidationError} from '../../types';
import { addEntry } from '../../services/patients';
import axios from "axios";


const HospitalForm = ({id}: {id: string}) =>
{
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [code, setCode] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
    const [healthCheck, setHealthCheck] = useState<number>(0);


    const addCode = () =>
    {
        setDiagnosisCodes(diagnosisCodes.concat(code));
        setCode('');
    };

    const addNewEntry = (event: React.SyntheticEvent) =>
    {
        event.preventDefault();

        const object: newEntry = 
        {
            description,
            date,
            specialist,
            diagnosisCodes,
            type: "HealthCheck",
            healthCheckRating: healthCheck

        };


        console.log(id);
        addEntry({object, id})
        .then(_response => alert("Entry Added!"))
        .catch((error) =>
        {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
            alert(error.message);
            } else {
            console.error(error);
            }
        });
    };

    return(
        <form onSubmit={addNewEntry}> 
            description: <input value={description} type = "text"
            onChange={(event) => setDescription(event.target.value)} /> <br />
            date: <input value={date} type = "date"
            onChange={(event) => setDate(event.target.value)} /> <br />
            specialist: <input value={specialist} type = "text"
            onChange={(event) => setSpecialist(event.target.value)} /> <br />
            diagnosis codes: <input value={code} type = "text"
            onChange={(event) => setCode(event.target.value)} /> 
            <button onClick={addCode} type="button">Add Code</button>
            <br />
            <div> Healthcheck
                <div>0 <input type="radio" name="healthCheck" onChange={() => setHealthCheck(0)} /></div>
                <div>1 <input type="radio" name="healthCheck" onChange={() =>  setHealthCheck(1)} /></div>
                <div>2 <input type="radio" name="healthCheck" onChange={() =>  setHealthCheck(2)} /></div>
                <div>3 <input type="radio" name="healthCheck" onChange={() =>  setHealthCheck(3)} /></div>
            </div>
            <button type="submit">Add Entry</button>
        </form>
    );

};

export default HospitalForm;