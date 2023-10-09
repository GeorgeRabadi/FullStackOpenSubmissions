import patients from '../../data/patients'

import { NonSensetivePatient } from '../types'

const getPatients = () : NonSensetivePatient[] => {
  return patients.map( ({name, gender, occupation}) =>
  ({
    name,
    gender,
    occupation
  }));
}


export default {
    getPatients
}