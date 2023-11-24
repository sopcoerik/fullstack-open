import { useState, useEffect } from "react"
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if(name.length) {
      axios
        .get(`${baseUrl}/${name}`)
        .then(res => setCountry(res))
        .catch(error => setCountry(error.message))
    }
  }, [name])

  return country
}