import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/persons'
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  const update = (ide, newObject) =>{
    const request = axios.put(`${baseUrl}/${ide}`, newObject)
    return request.then(response => response.data)
  }
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  const get =ids => {

    const request = axios.get(`${baseUrl}/${ids}`)
    return request.then(response=> response.data)

  }
  const remove = ids => {

    const request = axios.delete(`${baseUrl}/${ids}`)
    return request.then(response=> response.data)

  }
  const info = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  export default{ getAll, create, remove, get, info, update}