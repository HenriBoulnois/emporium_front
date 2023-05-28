# emporium_front

Bienvenue sur la partie front du projet Emporium réalisé par Henri Boulnois et Tristan Six.

Vous pourrez le retrouver directement ici : https://steady-hamster-8a0437.netlify.app/

Ou suivre les étapes suivantes pour l'installer en local, cependant la connexion n'est complétement fonctionnelle que sur la version déployée sur Netlify.

## Setup

Prérequis : 

- Possséder une des dernières versions de Node.js (>= v14)
- Yarn doit être installé

```bash
# installation des dépendances
$ yarn install

# Build le projet et le démarre en local
$ yarn generate
$ yarn start
```
## Documentation

Le site a été réalisé en Nuxt2 avec les frameworks de style Tailwindcss et Vuetify.

L'authentification se fait avec le service Auth0.

## Utilisation

Le site est utilisable sans connexion, vous pouvez naviguer sur les pages listant les oeuvres ainsi que les fiches détaillées et les utilisateurs avec leur profil.
La page "login" accessible par le bouton "Se connecter" du header explique les avantages de se connecter et la façon de procéder.

Après s'être connecté sur Auth0, il vous sera demandé de configurer votre profil sur notre site en renseignant un pseudo et une image de profil.

Une fois cette dernière action de faite, vous pourrez :
- Ajouter et modifier des oeuvres
- Ajouter et modifier des labels
- Gérer votre collection personnelle avec des favoris !
- Ajouter des commentaires
- Personnaliser votre profil

Bonne navigation !
