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
    const [dischargeDate, setDischargeDate] = useState('');
    const [criteria, setCriteria] = useState('');

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
            type: "Hospital",
            discharge: {
                date: dischargeDate,
                criteria: criteria
            }
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
            discharge: <br />
            date <input value={dischargeDate} type = "date"
            onChange={(event) => setDischargeDate(event.target.value)} />
            criteria <input value={criteria} type = "text"
            onChange={(event) => setCriteria(event.target.value)} /> <br />
            <button type="submit">Add Entry</button>
        </form>
    );

};

export default HospitalForm;