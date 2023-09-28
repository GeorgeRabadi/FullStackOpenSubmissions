import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {

    event !== undefined ? setValue(event.target.value) : setValue('')
  }

  return {
    type,
    value,
    onChange,
  }
}
