# Étape 1 : Construire l'image de développement
FROM node:14-alpine as development

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances du projet
RUN npm ci

# Copier les fichiers de l'application dans le conteneur
COPY . .

# Construire l'application React en mode développement
RUN npm run build

# Étape 2 : Construire l'image de production
FROM nginx:1.21-alpine as production

# Copier les fichiers construits de l'étape précédente dans le conteneur NGINX
COPY --from=development /app/build /usr/share/nginx/html

# Copier le fichier de configuration NGINX personnalisé
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour les requêtes HTTP
EXPOSE 80

# Démarrer NGINX lors du lancement du conteneur
CMD ["nginx", "-g", "daemon off;"]