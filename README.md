# Campus Freelance - Job Board

Une plateforme web Full-Stack sécurisée conçue pour l'Université de Maroua ENSPM. Ce "Job Board" permet aux entreprises et à l'administration locale de publier des petites missions rémunérées (stages, projets de fin d'études, freelance), et aux étudiants d'y postuler facilement.

## Fonctionnalités Principales

### Espace Étudiant (Candidat)
- **Inscription & Connexion :** Création de compte étudiant avec accès immédiat.
- **Explorer :** Parcourir la liste de toutes les offres de missions ouvertes.
- **S'informer :** Consulter les détails, la description et les compétences requises pour une mission.
- **Postuler :** Soumettre sa candidature (le nom et l'email sont pré-remplis automatiquement pour les étudiants connectés).

### Espace Recruteur
- **Inscription sécurisée :** Les recruteurs s'inscrivent mais leur compte doit être validé manuellement par l'administration avant de pouvoir publier.
- **Publier :** Créer rapidement une nouvelle offre de mission.
- **Gérer :** Tableau de bord pour lister ses offres actives et les marquer comme "Pourvues" une fois terminées.
- **Évaluer :** Consulter la liste des candidats pour chaque mission.

### Espace Administrateur
- **Validation :** Tableau de bord exclusif permettant d'approuver ou de laisser en attente les comptes recruteurs.

### Historique
- **Recherche par date :** Tous les utilisateurs connectés peuvent filtrer et consulter les missions "Pourvues" (terminées) sur une période donnée (Date de début $\rightarrow$ Date de fin).

---

## Architecture Technique

Le projet est divisé en deux répertoires distincts pour garantir une bonne modularité :

* **`/Backend`** : API RESTful sécurisée par **JWT (JSON Web Tokens)** développée avec **Node.js** et **Express**. Connectée à une base de données **MongoDB Atlas** via **Mongoose**. Mots de passe hachés avec **Bcrypt**.
* **`/Frontend`** : Interface Utilisateur asynchrone (Single Page Application) développée avec **React.js** (Vite), **React Router**, et un design system sur-mesure en Vanilla CSS. Gestion d'état global avec **React Context** pour l'authentification.

---

## Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé sur votre machine :
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- Un compte [MongoDB Atlas](https://cloud.mongodb.com/) avec un cluster actif.

---

## Installation et Démarrage

### 1. Configuration de la Base de données (Backend)
1. Naviguez dans le dossier Backend : `cd Backend`
2. Installez les dépendances : `npm install`
3. Ouvrez le fichier `.env` situé dans le dossier `Backend` et configurez votre connexion MongoDB :
   ```env
   PORT=5000
   MONGO_URI="mongodb://<votre_lien_de_connexion_atlas>"
   JWT_SECRET="votre_cle_secrete_hyper_securisee"
   ```
4. Lancez le serveur de développement : `npm run dev` (Le serveur écoutera sur `http://localhost:5000`).

### 2. Lancement de l'Interface Utilisateur (Frontend)
1. Ouvrez un **nouveau terminal**.
2. Naviguez dans le dossier Frontend : `cd Frontend`
3. Installez les dépendances : `npm install`
4. Lancez l'interface : `npm run dev`
5. Ouvrez votre navigateur sur l'adresse indiquée (généralement `http://localhost:5173`).

---
*Projet réalisé dans le cadre du cursus Ingénierie Informatique (2025-2026).*
