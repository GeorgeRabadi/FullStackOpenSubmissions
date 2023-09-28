import { useState } from 'react'
import axios from 'axios'



export const useResource = (baseUrl) =>
{
    let token = null

    const setToken = newToken => {
    token = `bearer ${newToken}`
    }

    const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
    }

    const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
    }

    const update = async (id, newObject) => {
    const response = await axios.put(`${ baseUrl }/${id}`, newObject)
    return response.data
    }

    return [getAll(), {setToken, create, update}]



}


export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}
  
