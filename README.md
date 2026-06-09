# 🎓 Campus Freelance - Job Board (MVP)

Une plateforme web Full-Stack conçue pour l'Université de Maroua ENSPM. Ce "Job Board" permet aux entreprises et à l'administration locale de publier des petites missions rémunérées (stages, projets de fin d'études, freelance), et aux étudiants d'y postuler facilement.

## 🚀 Fonctionnalités Principales

### 👨‍🎓 Espace Étudiant (Candidat)
- **Explorer :** Parcourir la liste de toutes les offres de missions ouvertes.
- **S'informer :** Consulter les détails, la description et les compétences requises pour une mission.
- **Postuler :** Soumettre sa candidature via un formulaire sécurisé (avec validation stricte de l'email et message de motivation).

### 🏢 Espace Recruteur
- **Publier :** Créer rapidement une nouvelle offre de mission.
- **Gérer :** Tableau de bord pour lister ses offres actives et les marquer comme "Pourvues" une fois terminées.
- **Évaluer :** Consulter la liste des candidats pour chaque mission avec accès direct à leur email et lettre de motivation.

---

## 🛠️ Architecture Technique

Le projet est divisé en deux répertoires distincts pour garantir une bonne modularité :

* **`/Backend`** : API RESTful développée avec **Node.js** et **Express**. Connectée à une base de données **MongoDB Atlas** via **Mongoose**.
* **`/Frontend`** : Interface Utilisateur asynchrone (Single Page Application) développée avec **React.js** (Vite), **React Router**, et un design system sur-mesure en Vanilla CSS ("Dark Mode" natif).

---

## ⚙️ Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé sur votre machine :
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- Un compte [MongoDB Atlas](https://cloud.mongodb.com/) avec un cluster actif.

---

## 💻 Installation et Démarrage

### 1. Configuration de la Base de données (Backend)
1. Naviguez dans le dossier Backend : `cd Backend`
2. Installez les dépendances : `npm install`
3. Ouvrez le fichier `.env` situé dans le dossier `Backend` et configurez votre connexion MongoDB :
   ```env
   PORT=5000
   MONGO_URI="mongodb://<votre_lien_de_connexion_atlas>"
   ```
4. Lancez le serveur de développement : `npm run dev` (Le serveur écoutera sur `http://localhost:5000`).

### 2. Lancement de l'Interface Utilisateur (Frontend)
1. Ouvrez un **nouveau terminal**.
2. Naviguez dans le dossier Frontend : `cd Frontend`
3. Installez les dépendances : `npm install`
4. Lancez l'interface : `npm run dev`
5. Ouvrez votre navigateur sur l'adresse indiquée (généralement `http://localhost:5173`).

---

## 📚 Documentation Supplémentaire
Deux guides détaillés sur le fonctionnement interne du code sont disponibles à la racine du projet :
- `Backend_Explanation.md` : Explication pas-à-pas de l'API et de la base de données.
- `Frontend_Explanation.md` : Explication de la logique React, du routage et de l'interface.

---
*Projet réalisé dans le cadre du cursus Ingénierie Informatique (2025-2026).*
