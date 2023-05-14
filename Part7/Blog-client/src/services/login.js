import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  console.log("this works");
  const response = await axios.post(baseUrl, credentials);
console.log('response od logina',response.data)
  return response.data;
};

export default login;
