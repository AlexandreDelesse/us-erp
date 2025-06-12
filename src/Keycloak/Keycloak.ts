// src/keycloak.ts
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.KEYClOAK_HOST || "https://auth.ade-dev.fr/", // ou juste '/realms' si Keycloak 18+
  realm: import.meta.env.KEYCLOAK_REALM || "ustest",
  clientId: import.meta.env.KEYCLOAK_CLIENT_ID || "us-erp",
});

export default keycloak;
