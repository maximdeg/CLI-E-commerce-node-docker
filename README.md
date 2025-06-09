# Tienda Online CLI

Una aplicación de línea de comandos para simular una tienda online, construida con Node.js y Docker.

## Requisitos Previos

- Docker
- Docker Compose
- Git (opcional, para clonar el repositorio)

## Estructura del Proyecto

```
.
├── data/               # Servicio de datos (Python/Flask)
│   ├── Dockerfile
│   ├── server.py
│   └── products.json
├── src/               # Aplicación principal (Node.js)
│   └── index.js
├── Dockerfile         # Para la aplicación principal
├── docker-compose.yml # Configuración de Docker Compose
└── start.sh          # Script de inicio
```

## Cómo Ejecutar la Aplicación

### Método 1: Usando el Script de Inicio (Recomendado)

1. Primero, asegurate de que el script sea ejecutable:
   ```bash
   chmod +x start.sh
   ```

2. Ejecutá el script:
   ```bash
   ./start.sh
   ```

El script se encargará de:
- Iniciar el servicio de datos en segundo plano
- Ejecutar la aplicación en modo interactivo
- Limpiar los contenedores cuando termines

### Método 2: Ejecución Manual

1. Iniciá el servicio de datos:
   ```bash
   docker-compose up -d data
   ```

2. Ejecutá la aplicación en modo interactivo:
   ```bash
   docker-compose run --rm app
   ```

3. Cuando termines, limpiá los contenedores:
   ```bash
   docker-compose down
   ```

## Cómo Usar la Aplicación

Una vez que la aplicación esté corriendo:

1. Verás una lista de productos disponibles
2. Ingresá el número del producto que querés ver (1-7)
3. Se mostrarán los detalles del producto
4. Decidí si querés comprarlo (Y/N)
5. Podés seguir comprando o finalizar (Y/N)
6. Al finalizar, verás el total de tu compra

## Solución de Problemas

### Si la aplicación no responde a los inputs:
- Asegurate de estar usando el modo interactivo (`docker-compose run --rm app`)
- Verificá que el servicio de datos esté corriendo (`docker-compose ps`)

### Si no podés conectarte al servicio de datos:
- Verificá que el servicio esté corriendo: `docker-compose ps`
- Revisá los logs: `docker-compose logs data`

### Para limpiar todo y empezar de nuevo:
```bash
docker-compose down
docker system prune -f
```

## Notas Importantes

- La aplicación usa dos contenedores:
  - `data`: Servicio de datos (Python/Flask) que corre en el puerto 5000
  - `app`: Aplicación principal (Node.js) que se ejecuta en modo interactivo

- Los datos de los productos se almacenan en `data/products.json`

- Para modificar la lista de productos, editá el archivo `data/products.json`

## Comandos Útiles

- Ver logs del servicio de datos:
  ```bash
  docker-compose logs data
  ```

- Ver logs de la aplicación:
  ```bash
  docker-compose logs app
  ```

- Reiniciar el servicio de datos:
  ```bash
  docker-compose restart data
  ```

- Ver el estado de los contenedores:
  ```bash
  docker-compose ps
  ``` 