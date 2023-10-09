import patients from '../../data/patients'

import { NonSensetivePatient, newPatient, Patient} from '../types'

import { v1 as uuid } from 'uuid'
const id = uuid()

const getPatients = () : NonSensetivePatient[] => {
  return patients.map( ({name, gender, occupation}) =>
  ({
    name,
    gender,
    occupation
  }));
}


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
    addPatient
}