import axios from 'axios'
const baseUrl = '/api/login'

let token

const login = async (user) => {
  const response = await axios.post(baseUrl, user, token)

  return response.data
}

export default { login }