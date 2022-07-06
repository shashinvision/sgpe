# backend_laravel

# Proyecto FULL stack Docker, Laravel y Vue

# INSTRUCCIONES

# Para Levantamiento de Docker y Laravel

```
git clone https://github.com/shashinvision/sgpe.git
```

# link vídeo descriptivo en youtube

```
https://youtu.be/e-0x9xHEqvQ
```

```
cd laravel
```

```
cp .env.example .env
```

```
cd ..
```

```
cd laradock
```

```
cp .env.example .env
```

```
docker-compose up -d nginx mysql
```

# Para confirmar los contenedores Docker y los puertos asignados

# en este caso el puerto externo para mysql debe ser 3307 y para localhost de laravel el 8888

```
docker-compose ps
```

# ir al contenedor workspace para la instalación del vendor en el backend, y ejecutar las migraciones y seeders, más el passport token con artisan passport:install

```
docker-compose exec workspace bash
```

```
composer install
composer update
```

```
php artisan migrate
php artisan key:generate
```

```
php artisan db:seed
```

```
php artisan passport:install
```

# para hacer el link simbolico al public del storage con el public de laravel

```
php artisan storage:link
```

# IMPORTANTE!: solo en caso de hacer un migrate fresh se debe hacer un:

```
php artisan passport:install --force
```

# Otro metodo para la integración de la BBDD es usar tu gestor de MYSQL favorito (DBeaver, MysqlWorkBench, etc) luego crear la Base de datos UTF-8 llamada prueba

# luego de crear la BBDD tenemos importar el archivo .SQL en la carpeta docs/SQL.

# Para levantamiento de frontend

# debemos salir de nuestro contenedor docker workspace, luego vamos a la raíz del proyecto

```
exit
```

```
cd ..
```

# comprobamos la ruta con

```
ls
```

```
cd frontend
```

# en este punto debemos tener instalado node y npm en nuestro equipo local, ya que el frontend esta completamente separado del backend y su "dockerización", usaremos nuestro node local y ejecutamos

```
npm install
```

# Esto es para crear la carpeta node_modules

# Para el levantamiento del servicio ejecutar

```
npm run serve
```

### Tambien podemos hacer un compilado build donde todo quedara en la carpeta dist
```
npm run build
```
## Para ejecutarlo debemos tener instalado serve
```
npm install -g serve
```
##  luego en la carpeta frontend ejecutamos
```
serve -s dist
```
## En caso de existir un error 404 por vue router creamos dentro de la carpeta dist:
```
touch dist/serve.json
```
## Pegamos el siguiente contenido y listo, volvemos al comando serve -s dist dentro de frontend
```
{
  "rewrites": [{ "source": "/**", "destination": "/index.html" }]
}

```

# nos indicará la dirección y puerto local y externo para su visualización.

# Ejemplo http://localhost:8080/
