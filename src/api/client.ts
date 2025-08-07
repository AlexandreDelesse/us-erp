import axios from "axios";
import keycloak from "../Keycloak/Keycloak";

const BASE_URL = "https://intranet.urgencesante.fr:8090/api";
const REGUL_BASE_URL = "https://intranet.urgencesante.fr:8091";
const NOTIFICATION_BASE_URL = "https://notification-api.delesse.net/api";
const KEYCLOAK_BASE_URL = NOTIFICATION_BASE_URL;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const notificationClient = axios.create({
  baseURL: NOTIFICATION_BASE_URL,
  timeout: 3000,
});

export const keycloakApi = axios.create({
  baseURL: KEYCLOAK_BASE_URL,
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

export const regulApi = axios.create({
  baseURL: REGUL_BASE_URL,
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

keycloakApi.interceptors.request.use(async (config) => {
  if (keycloak.authenticated) {
    await keycloak.updateToken(60); // refresh si bientôt expiré
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }

  return config;
});

export default client;
