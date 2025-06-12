import axios from "axios";

const BASE_URL = "https://intranet.urgencesante.fr:8090/api";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
});

export default client;
