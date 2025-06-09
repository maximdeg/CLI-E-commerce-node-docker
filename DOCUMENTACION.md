# Documentación del Proyecto: Tienda Online CLI

## 1. Fundamentación de las Tecnologías Elegidas

### Node.js
- Elegí Node.js para la aplicación principal porque:
  - Permite crear aplicaciones CLI interactivas de manera sencilla
  - Tiene un excelente ecosistema de paquetes (npm)
  - Es ideal para aplicaciones I/O intensivas
  - Es ampliamente utilizado en el mercado laboral

### Python/Flask
- Elegí Python con Flask para el servicio de datos porque:
  - Es simple y rápido para crear APIs REST
  - Tiene excelente soporte para JSON
  - Es fácil de mantener y escalar
  - Es una combinación muy demandada en el mercado

### Docker
- Docker fue elegido porque:
  - Permite aislar los servicios
  - Facilita el despliegue
  - Garantiza consistencia entre entornos
  - Es una herramienta esencial en el desarrollo moderno

## 2. Inputs y Outputs Esperados

### Servicio de Datos (Flask)

#### Input 1: GET /api/products
```bash
curl http://localhost:5000/api/products
```
**Output esperado:**
```json
[
  {
    "id": 1,
    "name": "Gaming Laptop Pro",
    "brand": "TechMaster",
    "price": 1299.99,
    "specs": {
      "processor": "Intel i7-12700H",
      "ram": "16GB DDR4",
      "storage": "512GB SSD",
      "gpu": "NVIDIA RTX 3060"
    }
  },
  // ... más productos
]
```

### Aplicación CLI (Node.js)

#### Input 1: Selección de Producto
```
Enter a number between 1 and 7 to view a product: 1
```
**Output esperado:**
```
Product Details:
----------------
Name: Gaming Laptop Pro
Brand: TechMaster
Price: $1299.99
Specifications:
  Processor: Intel i7-12700H
  RAM: 16GB DDR4
  Storage: 512GB SSD
  GPU: NVIDIA RTX 3060
----------------
```

#### Input 2: Decisión de Compra
```
Do you want to purchase this product? (Y/N): Y
```
**Output esperado:**
```
Added Gaming Laptop Pro to your cart.
```

## 3. Modificaciones Posibles

### Modificar Productos
1. Editar el archivo `data/products.json`:
   - Agregar nuevos productos
   - Modificar precios
   - Cambiar especificaciones

### Modificar Comportamiento de la API
1. Editar `data/server.py`:
   - Agregar nuevos endpoints
   - Modificar la lógica de respuesta
   - Cambiar el formato de los datos

### Modificar la Aplicación CLI
1. Editar `src/index.js`:
   - Cambiar el formato de visualización
   - Agregar nuevas funcionalidades
   - Modificar la lógica de negocio

## 4. Instrucciones Personalizadas en Dockerfile

### Servicio de Datos (data/Dockerfile)
```dockerfile
# Instrucción personalizada: Instalación de dependencias
RUN pip install --no-cache-dir flask flask-cors
```

### Aplicación Principal (Dockerfile)
```dockerfile
# Instrucción personalizada: Configuración del entorno
ENV NODE_ENV=development
ENV FORCE_COLOR=1
```

## 5. Componentes de Persistencia

### Volumes en docker-compose.yml
```yaml
volumes:
  - ./data:/app        # Persistencia de datos
  - .:/app             # Persistencia del código
  - /app/node_modules  # Persistencia de dependencias
```

## 6. Logs y Monitoreo

### Logs del Servicio de Datos
```bash
docker-compose logs data
```
**Output esperado:**
```
* Running on http://0.0.0.0:5000
* Serving Flask app 'server'
```

### Logs de la Aplicación
```bash
docker-compose logs app
```
**Output esperado:**
```
Starting application...
Fetching products from API...
Products received: 7
``` 