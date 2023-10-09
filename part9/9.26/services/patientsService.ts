import patients from '../../data/patients';

import { NonSensitivePatient, newPatient, Patient, Entry, newEntry} from '../types';

import { v1 as uuid } from 'uuid';
const id = uuid();

interface addedEntry {
  entry: newEntry,
  patientId: string

}


const getPatients = () : NonSensitivePatient[] => {
  return patients.map( ({name, gender, occupation, id, dateOfBirth, entries}) =>
  ({
    name,
    gender,
    occupation,
    id,
    dateOfBirth,
    entries
  }));
};

const getPatientsById = (id: string) : NonSensitivePatient => {

  const foundPatient = patients.find(patient => patient.id === id);

  if(typeof foundPatient !== 'undefined')
  {
    
    const returnedPatient: NonSensitivePatient = {
      name: foundPatient.name,
      gender: foundPatient.gender,
      occupation: foundPatient.occupation,
      id: foundPatient.id,
      dateOfBirth: foundPatient.dateOfBirth,
      entries: foundPatient.entries
    };
  
    return returnedPatient;
  }

  throw new ReferenceError('User not found!');
 
  
};


const addEntry = ( entry: addedEntry ): Entry => {


  const newEntry = {  
    id: id,
    ...entry.entry
  };

  patients.find(patient => patient.id === entry.patientId)?.entries.push(newEntry);
  return newEntry;


};




const addPatient = ( entry: newPatient ): Patient => {
  const newPatient = {  
    id: id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};


export default {
    getPatients,
    addPatient,
    getPatientsById,
    addEntry
};