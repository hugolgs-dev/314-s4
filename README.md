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

