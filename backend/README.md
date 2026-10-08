# 🏠 Chatop Backend API

Ce projet est le backend de l'application Chatop, développé avec **NestJS** et **TypeScript**. Il fournit une API REST sécurisée pour gérer les utilisateurs, les locations immobilières et les messages, en s'appuyant sur une base de données **MySQL** via l'ORM **Prisma**.

## 🛠️ Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :
- **Node.js** (version 18 ou supérieure recommandée)
- **npm** (inclus avec Node.js)
- Un serveur **MySQL** actif en local (port 3306 par défaut)

## ⚙️ Installation et Configuration

### 1. Cloner le projet et installer les dépendances
Ouvrez votre terminal à la racine du dossier `backend` et lancez :
```bash
npm install
```

### 2. Configuration de la base de données
Le projet utilise un fichier `.env` pour gérer les variables d'environnement (identifiants de la base de données, secret JWT, etc.).

1. Créez un fichier `.env` à la racine du dossier `backend` (au même niveau que le `package.json`).
2. Copiez et adaptez le contenu suivant avec vos propres identifiants MySQL :

```env
# Configuration MySQL
DB_USER="root"
DB_PASSWORD="votre_mot_de_passe_mysql"
DB_NAME="chatop_db"

# URL de connexion Prisma (format : mysql://USER:PASSWORD@HOST:PORT/DB_NAME)
DATABASE_URL="mysql://root:votre_mot_de_passe_mysql@localhost:3306/chatop_db"

# Secret pour la signature des tokens JWT (à garder confidentiel)
JWT_SECRET="un_secret_tres_long_et_complexe_pour_la_securite_123456"

# Port d'écoute du serveur NestJS
PORT=3001
```

3. Générez le client Prisma pour que TypeScript puisse interagir avec votre base de données :
```bash
npx prisma generate
```
*(Note : si la base de données `chatop_db` n'existe pas encore, vous pouvez l'initialiser via MySQL Workbench avec le script `schema.sql` fourni dans les ressources du projet.)*

## 🚀 Lancement du projet

Une fois la configuration terminée, vous pouvez démarrer le serveur en mode développement (avec le hot-reload activé) :

```bash
npm run start:dev
```

Le serveur sera accessible à l'adresse indiquée dans votre terminal, par défaut : **`http://localhost:3001`**.

## 📖 Documentation de l'API (Swagger)

L'API est entièrement documentée via **Swagger (OpenAPI)**. Une interface interactive est disponible pour visualiser les routes, les modèles de données et tester les endpoints directement depuis votre navigateur.

👉 **Accéder à la documentation Swagger :** [http://localhost:3001/api](http://localhost:3001/api)

### 🔒 Tester les routes protégées sur Swagger
La plupart des routes nécessitent un token JWT. Pour les tester :
1. Utilisez la route `POST /api/auth/login` (ou `/register`) dans Swagger pour obtenir un token.
2. Cliquez sur le bouton **Authorize** (le cadenas 🔒) en haut à droite de l'interface Swagger.
3. Collez votre token (sans le mot "Bearer ") et validez.
4. Vous pouvez désormais exécuter les requêtes protégées (comme `GET /api/rentals`).

## 📂 Architecture du projet

Le projet suit une architecture modulaire :
- **`src/auth/`** : gestion de l'authentification (Login, Register, JWT, Passport).
- **`src/rentals/`** : gestion des locations (CRUD complet).
- **`src/users/`** : gestion des utilisateurs.
- **`src/messages/`** : gestion des messages entre utilisateurs.
- **`src/prisma/`** : service global de connexion à la base de données.

## 🧪 Commandes utiles

| Commande | Description |
| :--- | :--- |
| `npm run start` | Démarre le serveur en mode production |
| `npm run start:dev` | Démarre le serveur en mode développement (watch mode) |
| `npm run build` | Compile le projet TypeScript en JavaScript |
| `npx prisma studio` | Ouvre l'interface visuelle de Prisma pour gérer les données (port 5555) |
