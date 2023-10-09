
import {newPatient, Gender, newEntry, HealthCheckRating, Diagnosis} from './types';

interface SickLeave {
  startDate: string,
  endDate: string
}


interface Discharge {
  date: string,
  criteria: string
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};


const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};


const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const isObject = (obj: unknown): obj is object => {
  return typeof obj === 'object' || obj instanceof Object;
};

const isSickLeave = (sickLeave: object): sickLeave is SickLeave => {
  if('startDate' in sickLeave && 'endDate' in sickLeave && 
  isString(sickLeave.startDate) && isString(sickLeave.endDate))
    return true;

  return false;
};

const isDischarge = (discharge: object): discharge is Discharge => {
  if('date' in discharge && 'criteria' in discharge && 
  isString(discharge.date) && isString(discharge.criteria))
    return true;

  return false;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {

  if (!object || !isObject(object) || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(h => Number(h)).includes(param);
};


const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if ( !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect healthCheckRating: ' + healthCheckRating);
  }

  return healthCheckRating;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date: ' + date);
  }
  return date;
};


const parseSickLeave = (sickLeave: object): SickLeave => {
 
  if(!isSickLeave(sickLeave) || !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate))
    throw new Error('Incorrect Sickleave!');

  return sickLeave;

};


const parseDischarge = (discharge: object): Discharge => {
 
  if(!isDischarge(discharge) || !isDate(discharge.date))
    throw new Error('Incorrect Discharge!');

  return discharge;

};


const parseString = (entry: unknown): string => {
  if (!isString(entry)) {
      throw new Error('Incorrect field: ' + entry);
  }
  return entry;
};



const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};


export const toNewPatient = (object: unknown): newPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newEntry: newPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: []
    };
  
    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

export const toNewEntry = (object: unknown): newEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object)  {
    const baseEntry = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      
    };

    let newEntry;

    switch(object.type){

        case "HealthCheck":
          if('healthCheckRating' in object)
          {
            
            newEntry = {...baseEntry,
              type: object.type,
              healthCheckRating: parseHealthCheckRating(object.healthCheckRating)};
            
          }
          else throw new Error('Missing healthCheckRating');
          break;

        case "OccupationalHealthcare":
          if('employerName' in object)
          {
            if('sickLeave' in object && isObject(object.sickLeave))
            {
              newEntry = {...baseEntry,
                type: object.type,
                employerName: parseString(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
              };

            }
            else
            {
              newEntry = {...baseEntry,
                type: object.type,
                employerName: parseString(object.employerName),
              };

            }
            
            
          }
          else throw new Error('Missing employerName');
          break;
          case "Hospital":
          if('discharge' in object && isObject(object.discharge))
          {
            newEntry = {...baseEntry,
              type: object.type,
              discharge: parseDischarge(object.discharge)
            };

          }
          else throw new Error('Missing disCharge');
          break;
          default:
            throw new Error('Incorrect type!');
           

    }

    if('diagnosisCodes' in object)
    {
      console.log(object.diagnosisCodes);
      newEntry = {
        ...newEntry,
        diagnosisCodes: parseDiagnosisCodes(object)

      };
    }
  
    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

