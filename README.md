CONTEXTE :

La marque de condiments à base de piment Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes » .
Avant de transformer l’application en boutique en ligne, il souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent. 

OBJECTIF ET COMPÉTENCES ÉVALUÉES :

Le front-end étant fourni, l’objectif est ici de créer le back-end de l’application.

Implémentation d’un modèle logique de données, conformément aux standards RGPD et OWASP.	
Stockage des données de manière sécurisée.
Mise en oeuvre des opération CRUD de manière sécurisée.

SPÉCIFICATIONS : 

Les technologies et outils utilisés : 
  * Express (framework)
  * NodeJS (serveur)
  * MongoDB (base de données)
  * MongoDB Atlas(hébergement des données)
  * Javascript

  * Visual Studio Code(éditeur de code)
  * Git/GitHUB (versionage du projet)
  * Mongoose (plugin de connexion entre MongoDB et le Express : schéma de données)


La sécurité de la base de données MongoDB (à partir d'un service tel que
MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la
machine d'un utilisateur.

Le mots de passe utilisateur stockés dans la base de données doit être crypté.

Toutes les routes sauces requises doivent disposer d’une authentification renforcée.

Les emails utilisateurs stockés dans la base de données sont uniques.

On doit définir deux types de droits administrateurs : l’accès à la modification ou suppression des objets, et l’accès à la modification du contenu de la base de données.

Le statut des likes / dislikes doit être mise à jour au fur et à mesure des modifications apportées.

ÉLÉMENTS FOURNIS :

Les instructions API
Les exigences de sécurité
Les modèles de données pour les sauces et les utilisateurs
Lien vers le repository du front-end :
https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

INSTALLATION :

Front-end :

* Cloner le repository dont le lien est fourni ci-dessus.
* Suivre les instructions du README.

À NOTER :
Le front-end utilise des versions anciennes de NodeJS.

Si des problèmes d'installation sont rencontrés, la version 11.15.0 de NodeJS fonctionne également pour ce projet.

Back-end :

* Cloner ce repository.
* Ouvrir le terminal sur le dossier.
* Installer le package nodemon pour utiliser le serveur : npm Install -g nodemon
* Lancez le serveur : nodemon server  
