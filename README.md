# Pour démarrer

Par défaut, le backend est situé à l'adresse `'http://localhost:3000'`. 

Pour modifier cette dernière, il faut aller dans le fichier ```src/api.js```


Dans ce fichier, on initialise la connexion avec axios au backend de l'application.

```js
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    },
});
```
### Installation du projet

```sh
bun install
```

### Démarrer le serveur 

```sh
bun dev
```

### Fichiers

Localement, j'ai organisé les fichiers du projet comme ci-dessous. 
Je ne sais pas si c'est important, mais je préfère quand même le préciser.

```text
projet 
    |
    |-- backend // le code de la semaine 2
    |
    |-- frontend // le code de la semaine 3
```
