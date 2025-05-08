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
<p>API Requests (Fetch Functions)</p>

Fetch (endpoint)

```javascript
const get(endpoiny) = () => {
  

  return (
   
  );
};

export default (nombreDeFuncion);

```
<h2>Funciones Implementadas</h2>

<ol>
  <li>
    <strong>getAlbumWithTracks(access_token, albumId)</strong><br>
    Obtiene la información de un álbum y sus canciones.<br>
    <ul>
      <li><strong>Parámetros:</strong>
        <ul>
          <li>access_token (string): Token de autenticación de Spotify.</li>
          <li>albumId (string): ID del álbum.</li>
        </ul>
      </li>
      <li><strong>Retorna:</strong> Un objeto con la información del álbum (album) y un array de pistas (tracks).</li>
      <li><strong>Endpoints usados:</strong>
        <ul>
          <li>GET /v1/albums/{id}</li>
          <li>GET /v1/albums/{id}/tracks</li>
        </ul>
      </li>
    </ul>




  
  ```
        export const getAlbumWithTracks = async (access_token, albumId) => {
    if (!access_token || !albumId) {
      throw new Error("Missing access_token or albumId");
    }
  
    try {
      // Obtener el álbum completo, incluye información del álbum
      const albumRes = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
  
      if (!albumRes.ok) {
        throw new Error("Album not found");
      }
  
      const album = await albumRes.json();
  
      // Obtener las canciones del álbum
      const tracksRes = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
  
      if (!tracksRes.ok) {
        const errorData = await tracksRes.json();
        throw new Error("Tracks not found");
      }
  
      const tracksData = await tracksRes.json();
  
      return { album, tracks: tracksData.items };
    } catch (error) {
      console.error("[getAlbumWithTracks] Error general:", error);
      throw error;
    }
    } export default getAlbumWithTracks
 ```
</li>
 <li>
    <strong>fetchSpotifyData(genre, type, access_token)</strong><br>
    Búsqueda filtrada por género y tipo.<br>
    <ul>
      <li><strong>Parámetros:</strong>
        <ul>
          <li>genre (string): Género musical o palabra clave.</li>
          <li>type (string): Tipo de búsqueda (track, artist, playlist).</li>
          <li>access_token (string): Token de autenticación.</li>
        </ul>
      </li>
      <li> <strong>Retorna:</strong> Un array de resultados filtrados por tipo.</li>
      <li><strong>Endpoints usados:</strong>
        <ul>
          <li>GET /v1/search?q={query}&type={type}</li>
        </ul>
      </li>
    </ul>
  
     ```
    const fetchSpotifyData = async (genre, type, access_token) => {
    const baseURL = "https://api.spotify.com/v1/search";
    let query =
    type === "playlist"
      ? genre // para playlist no se usa el filtro genre:
      : `genre:${genre}`; // para tracks y artists sí
      try {
    if (!access_token) {
      throw new Error("Missing access_token or idArtist");
      }
    const res = await fetch(
      `${baseURL}?q=${encodeURIComponent(query)}&type=${type}&limit=15`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = await res.json();
    const items = data[type + "s"]?.items || [];
    const filteredItems = items.filter((item) => item !== null);
    return filteredItems;
    } catch (error) {
    console.error(`Error fetching ${type}s:`, error);
    }
    };
    export default fetchSpotifyData;
     ```
 </li>
  <li>
    <strong>getAlbumById(access_token, id)</strong><br>
    Obtiene los detalles de un álbum a partir de su ID.<br>
    <ul>
      <li><strong>Parámetros:</strong>
        <ul>
          <li>access_token (string)</li>
          <li>id (string): ID del álbum.</li>
        </ul>
      </li>
     <li> <strong>Retorna: </strong> Información del álbum.</li>
      <li><strong>Endpoints usados:</strong>
        <ul>
          <li>GET /v1/albums/{id}</li>
        </ul>
      </li>
    </ul>
  
```
const getAlbumById = async (access_token, id) => {
    if (!access_token || !id) throw new Error('Missing access_token or id');


    try {
        const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Obtener detalles del error
            console.error("Error response from Spotify API:", errorData);
            throw new Error(`Error fetching album data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching album:", error.message);
        throw error;
    }};

export default getAlbumById;
```
 </li>
  <li>
    <strong>getArtistById(access_token, id)</strong><br>
    Obtiene los detalles de un artista por su ID.<br>
    <ul>
      <li><strong>Parámetros:</strong>
        <ul>
          <li>access_token (string)</li>
          <li>id (string): ID del artista.</li>
        </ul>
      </li>
     <li><strong>Retorna: </strong>Información del artista.</li>
      <li><strong>Endpoint usado:</strong>
        <ul>
          <li>GET /v1/artists/{id}</li>
        </ul>
      </li>
    </ul>
    
    ```
    const getArtistById = async (access_token, id) => {
    if (!access_token || !id) throw new Error('Missing access_token or id');
    try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Obtener detalles del error
            console.error("Error response from Spotify API:", errorData);
            throw new Error(`Error fetching artist data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching artist:", error.message);
        throw error;
    }};
    export default getArtistById;
``
  <li>
    <strong>getPlaylistById(access_token, id)</strong><br>
    Obtiene los detalles de una playlist por su ID.<br>
    <ul>
      <li><strong>Parámetros:</strong>
        <ul>
          <li>access_token (string): Token de acceso.</li>
          <li>id (string): ID de la playlist.</li>
        </ul>
      </li>
     <li><strong>Retorna:</strong> Listado de playlists del usuario.</li>
      <li><strong>Endpoint usado:</strong>
        <ul>
          <li>GET /v1/users/{user_id}/playlists</li>
        </ul>
      </li>
    </ul>
  
   ```
const getPlaylistById = async (access_token, id) => {
    if (!access_token || !id) throw new Error('Missing access_token or id');


    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response from Spotify API:", errorData);
            throw new Error(`Error fetching playlist data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching playlist:", error.message);
        throw error;
    }};
    export default getPlaylistById;
   ```
  </li> 
   
 <li>
    <strong>getUserPlaylist(token, id)</strong><br>
    Obtiene las playlists de un usuario.<br>
    <ul>
      <li><strong>Parámetros:</strong>
        <ul>
          <li>access_token (string)</li>
          <li>id (string): ID del usuario.</li>
        </ul>
      </li>
     <li><strong>Retorna: </strong>Array de playlists del usuario.</li>
      <li><strong>Endpoint usado:</strong>
        <ul>
          <li>GET /v1/users/{user_id}/playlists</li>
        </ul>
      </li>
    </ul>
  
   ``` 
    const getUserPlaylist = async (token, id) => {

    try{

        const response = await fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Obtener detalles del error
            console.error("Error response from Spotify API:", errorData);
            throw new Error(`Error fetching playlist data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    }catch(error){
        console.error("Error fetching user playlists:", error.message);
        throw error;
    } }
    export default getUserPlaylist;

   ```
  </li>

 <li>
    <strong>getTopTracksByArtist(access_token, idArtist)</strong><br>
    Obtiene las canciones más populares de un artista.<br>
    <ul>
      <li><strong>Parámetros:</strong>
        <ul>
          <li>access_token (string)</li>
          <li>idArtist (string): ID del artista.</li>
        </ul>
      </li>
    <li><strong>Retorna:</strong> Array de canciones populares.</li>
      <li><strong>Endpoint usado:</strong>
        <ul>
          <li>GET /v1/artists/{id}/top-tracks?market=US</li>
        </ul>
      </li>
    </ul>
   
   ```
const getTopTracksByArtist = async (access_token, idArtist) => {
    try {
        if (!access_token || !idArtist) {
            throw new Error("Missing access_token or idArtist");
        }

        const response = await fetch(`https://api.spotify.com/v1/artists/${idArtist}/top-tracks?market=US`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching top tracks:", errorData);
            throw new Error(`Error fetching top tracks: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.tracks;
    } catch (error) {
        console.error("Error fetching top tracks:", error.message);
        throw error;
    }};export default getTopTracksByArtist;

 ```
  </li>
   
 <li>
    <strong>getTrackById(access_token, id)</strong><br>
      Obtiene los detalles de una canción por su ID.<br>
    <ul>
      <li><strong>Parámetros:</strong>
        <ul>
          <li>access_token (string)</li>
          <li>id (string): ID de la canción.</li>
        </ul>
      </li>
     <li><strong>Retorna:</strong> Información de la pista.</li>
      <li><strong>Endpoint usado:</strong>
        <ul>
          <li>GET /v1/tracks/{id}</li>
        </ul>
      </li>
    </ul>

   
   ```
const getTrackById = async (access_token, id) => {
    if (!access_token || !id) throw new Error('Missing access_token or id');


    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Obtener detalles del error
            console.error("Error response from Spotify API:", errorData);
            throw new Error(`Error fetching track data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching track:", error.message);
        throw error;
    }};export default getTrackById;
   ```
  </li>
  


 <li>
    <strong>getUserProfile(token)</strong><br>
    Obtiene el perfil del usuario autenticado.<br>
    <ul>
      <li><strong>Parámetros:</strong>
        <ul>
          <li>token (string): Token de acceso del usuario.</li>
        </ul>
      </li>
     <li><strong>Retorna: </strong> Información del perfil del usuario.</li>
      <li><strong>Endpoint usado:</strong>
        <ul>
          <li>GET /v1/me</li>
        </ul>
      </li>
    </ul>
  
   ```
const getUserProfile = async (token) => {
    if (!token) {
      throw new Error("Access token is missing.")
    
    }

    let data;

    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(
          "Failed to fetch user profile:",
          response.status,
          response.statusText
        )
        
      }
      data = await response.json()
    } catch (error) {
      throw new Error("Error fetching user profile:", error)
    }
    
    return data;
    }export default getUserProfile;
  ```
  </li>


 <li>
    <strong>search(token, q, type)</strong><br>
    Realiza una búsqueda general en Spotify.<br>
    <ul>
      <li><strong>Parámetros:</strong>
        <ul>
          <li>token (string)</li>
          <li>q (string): Consulta de búsqueda. </li>
          <li>type (string): Tipo (track, artist, album, etc). </li>
        </ul>
      </li>
     <li><strong>Retorna:</strong> Resultados de la búsqueda.</li>
      <li><strong>Endpoint usado:</strong>
        <ul>
          <li>GET /v1/search?q={query}&type={type}</li>
        </ul>
      </li>
    </ul>



   ```
const search = async (token, q, type) => {
    if(!q) throw new Error('Missing search query');

    try {
        const encodedQuery = encodeURIComponent(q); 

        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=${type}&limit=20`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Obtener detalles del error
            console.error("Error response from Spotify API:", errorData);
            throw new Error(`Error fetching track data: ${response.status} ${response.statusText}`)
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error searching track:", error.message);
        throw error
    }
    }export default search
  ```


  </li>
</ol>
  
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
