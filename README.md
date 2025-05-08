<p align="center">
  <img width="250px" height="auto" src="https://github.com/user-attachments/assets/c5543711-54dc-46ac-b027-b76b3552c4ec" alt="tp_react_logo" >
</p>
<h1 align="center">Sinestesia</h1>
<h4 align="center">Integrantes</h4>
<p align="center">
  <a href="https://github.com/briabril">Celayes Brisa</a> - 
  <a href="https://github.com/Rocio-Ayelen-Fernandez">Fernandez Rocio</a> - 
  <a href="https://github.com/FlorenciaRusso9606">Russo Florencia</a>
</p>


<img align="center" width="auto" height="auto" src="https://github.com/user-attachments/assets/e2ee50dc-f2b5-4723-b763-b4b007393379" alt="Main_page" >


## Descripción del Proyecto

Este proyecto utiliza la API privada de Spotify para permitir a los usuarios explorar contenido y gestionar listas de reproducción. La plataforma obtiene imágenes, información y audio a través del flujo de autorización PKCE, garantizando una experiencia segura. 

Entre sus funcionalidades destacan:
- Búsqueda por tipo (canción, playlist, álbum, artista).
- Visualización detallada de la información de cada búsqueda.
- Seguimiento de artistas basado en la cuenta del usuario.
- Creación y gestión de listas de reproducción en la cuenta registrada.
- Diseño responsive adaptable a dispositivos móviles y de escritorio.

## Componentes Clave

Fetch (endpoint)

```javascript
const get(endpoiny) = () => {
  

  return (
   
  );
};

export default (nombreDeFuncion);

```

  
## Instalacion


Para ejecutar el proyecto, necesitas instalar:

**Node.js**: Descárgalo de [nodejs.org](https://nodejs.org/) y sigue la instalación.
**npm**: Se instala con Node.js. Verifica con:
  ```bash
  node -v
  npm -v
```

En una terminal, clona el repositorio desde GitHub usando el siguiente comando:
```bash
git clone https://github.com/Rocio-Ayelen-Fernandez/Tp-React.git  
```

Navega al directorio principal del proyecto
```bash
cd Tp-React/tp-react-pwa
```

Ejecuta el siguiente comando para instalar las dependencias necesarias
```bash
npm install
```

Para iniciar el servidor de desarrollo usa el siguiente comando
```bash
npm run dev
```

## Observaciones

La aplicacion contiene una clave publica y cuenta para metodos de prueva. 
Se pueden encontrar estos en la pagina de login.jsx 

Si necesita una nueva clave, puede solicitar una con su cuenta de spotify desde el [**Panel de control de desarrolladores de Spotify**](https://developer.spotify.com/dashboard). Desde allí, puedes registrar una aplicación y generar tus credenciales.
![image](https://github.com/user-attachments/assets/474c7476-37bb-4808-8361-24a0babf6f93)
