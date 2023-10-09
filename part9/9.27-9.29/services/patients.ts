import axios from "axios";
import { Patient, PatientFormValues , newEntry, Entry} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

interface addedEntry {
  object: newEntry,
  id: string

}

export const addEntry = async (object: addedEntry) => {
  console.log(object.id);
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${object.id}/entries`,
    object.object
  );

  return data;
};

export default {
  getAll, create
};

