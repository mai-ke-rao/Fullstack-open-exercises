import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async credentials => {
  console.log("Inisde login handler");
  const response = await axios.post(baseUrl, credentials)
  
  
  return response.data
}

export default  login 