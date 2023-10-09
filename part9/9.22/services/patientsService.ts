import patients from '../../data/patients';

import { NonSensitivePatient, newPatient, Patient} from '../types';

import { v1 as uuid } from 'uuid';
const id = uuid();


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
    getPatientsById
};