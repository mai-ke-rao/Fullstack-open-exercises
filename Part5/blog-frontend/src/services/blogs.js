import axios from 'axios'
const baseUrl = '/api/blogs'
let Token = null
const setToken = newToken => {
  Token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNew = async (entry) => {
  const config = {
    headers: { Authorization: Token }
  }

  console.log(config);
  const response = await axios.post(baseUrl, entry, config)
  return response.data
}

const putLike = async (entry) => {
  const config = {
    headers: { Authorization: Token }
  }
  const response = await axios.put(`${baseUrl}/${entry.id}`, entry, config)
  return response.data
}

const kick = async(entry) =>{
  const config = {
    headers: { Authorization: Token }
  }
 const response = await axios.delete(`${baseUrl}/${entry.id}`, config)
return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, addNew, putLike, kick }