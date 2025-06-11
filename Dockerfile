# Étape 1 : Build de l'application React
FROM node:19.3 AS build

WORKDIR /app

# Argument pour choisir l'environnement (par ex: .env.dev)
ARG ENV_FILE

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Copier le bon fichier d'environnement (ex: .env.dev → .env)
COPY ${ENV_FILE} .env

# Build React avec l'environnement chargé
RUN npm run build

# Étape 2 : Image de production avec Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
