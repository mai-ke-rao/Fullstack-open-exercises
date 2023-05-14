import axios from "axios";
const baseUrl = "/api/blogs";
const userUrl = '/api/users'
let Token = null;
const setToken = (newToken) => {
  Token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const addComment = async (entry, id) => {
console.log('entri i id',entry, id);
  /*const config = {
    headers: { Authorization: Token },
  };*/
    const response = await axios.post(`${baseUrl}/${id}/comments`, entry);
  return response.data;
  };


const addNew = async (entry) => {
  const config = {
    headers: { Authorization: Token },
  };
  console.log(config);
  const response = await axios.post(baseUrl, entry, config);
  return response.data;
};

const putLike = async (entry) => {
  const config = {
    headers: { Authorization: Token },
  };
  const response = await axios.put(`${baseUrl}/${entry.id}`, entry, config);
  return response.data;
};

const kick = async (entry) => {
  const config = {
    headers: { Authorization: Token },
  };
  const response = await axios.delete(`${baseUrl}/${entry.id}`, config);
  return response.data;
};
const countBlog = async (entry, yorn) => {
  //on iterira problem je sto je request uvek sa starim coutnuom
  var temp = {...entry}
  console.log('temp i yorn',temp, yorn);
  if(yorn){
  temp.blogCount++;
  
  }
  else {temp.blogCount--; }
  const config = {
    headers: { Authorization: Token },
  };
   const response = await axios.put(`${userUrl}/${temp.id}`, temp,config)
   console.log('the problematic reposne', response);
   return response
}

const getUsers = () => {
  const request = axios.get(userUrl);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, addNew, putLike, kick, countBlog, getUsers, addComment};
