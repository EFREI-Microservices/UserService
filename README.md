# UserService

Documentation du UserService

## Prérequis
- Node >20.13
- Docker 27 ou plus

## Installation

1. Clone le repository
```bash
git clone https://github.com/EFREI-Microservices/UserService.git
```

2. Pull une database MongoDB
```bash
docker pull mongodb/mongodb-community-server:latest
```

3. Run la database MongoDB
```bash
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```
4. Installer les dépendences
```bash
npm install
```

5. Lancer le serveur
```bash
npm run start
```

## Endpoints

L'API est accessible à l'adresse `http://localhost:8009/`

Liste des endpoints :

#### [POST] `/api/auth/register`
Créer un nouvel utilisateur
```json
{
    "username": string,
    "password": string
}
```

#### [POST] `/api/auth/login`
Se connecter  
Request body
```json
{
    "username": string,
    "password": string
}
```
Retourne un token JWT et les informations de l'utilisateur
```json
{
    "id": string,
    "username": string,
    "role": string ("Admin"|"User"),
    "token": string
}
```

#### [GET] `/api/user/{id}`
Afficher les informations d'un utilisateur.  
Uniquement si ce sont les informations de l'utilisateur connecté, ou si l'utilisateur est admin.
```json
{
    "id": string,
    "username": string,
    "role": string ("Admin"|"User")
}
```

#### [PATCH] `/api/user/{id}`
Modifie les informations de l'utilisateur.  
Uniquement si ce sont les informations de l'utilisateur connecté, ou si l'utilisateur est admin.
```json
{
    "username": string,
    "role": string ("Admin"|"User")
}
```

#### [DELETE] `/api/user/{id}`
Modifie les informations de l'utilisateur.  
Uniquement si l'utilisateur est admin.
