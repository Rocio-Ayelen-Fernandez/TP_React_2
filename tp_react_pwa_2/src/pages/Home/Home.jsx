import React, {useState, useEffect} from "react";
import Authorization from "../../components/Authorization/Authorization";


import Section from "../../components/Section/Section";
import CardGenre from "../../components/CardGenre/CardGenre";
import CardType from "../../components/CardType/CardType";
import { genres } from "../../assets/fakeData/genres";
import { fakeArtists } from "../../assets/fakeData/fakeArtists";
import { fakePlaylists } from "../../assets/fakeData/fakePlaylists";
import { fakeTracks } from "../../assets/fakeData/fakeTracks";

import SearchInput from "../../components/SearchInput/SearchInput";
import search from "../../services/search.js";
const Home = () => {



  const clientId = "5c271aa13f7641f8b283fae8ab5c8f70";
  const redirectUri = "http://127.0.0.1:5173/home";
  const [code, setCode] = useState(
    localStorage.getItem("authorization_code") || ""
  );
  const [access_token, setAccessToken] = useState("");

  const [user, setUser] = useState(null);


  const getToken = async (code) => {
    const codeVerifier = localStorage.getItem("code_verifier");
    if (!codeVerifier) {
      console.error("Code verifier is missing from localStorage.");
      return;
    }

    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    try {
      const response = await fetch(url, payload);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching access token:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Access Token Response:", data);

      // Guardar el token de acceso en localStorage
      localStorage.setItem("access_token", data.access_token);

      // Opcional: guardar el refresh token y la expiración
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      if (data.expires_in) {
        const expirationTime = Date.now() + data.expires_in * 1000;
        localStorage.setItem("token_expiration", expirationTime.toString());
      }

      console.log("Access token saved:", data.access_token);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };


  //BOTON AUTORIZAR
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");
  
    if (authorizationCode) {
      console.log("Authorization code:", authorizationCode);
  
      // Actualiza el estado con el código de autorización
      setCode(authorizationCode);
  
      // Guarda el código de autorización en localStorage
      localStorage.setItem("authorization_code", authorizationCode);
  
      // Intercambiar el código por un token de acceso
      getToken(authorizationCode);
  
      // Limpia la URL eliminando los parámetros de búsqueda
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);
  
  useEffect(() => {
    if(localStorage.getItem("access_token")){
      setAccessToken(localStorage.getItem("access_token"));
    }
  },[])

  useEffect(() => {
    // Solo llama a getTracksByGenre si el access_token está disponible
    if (access_token) {
      getTracksByGenre();
    } else {
      console.warn("Access token is not available yet.");
    }
  }, [access_token]); // Dependencia en access_token


  const fetchUserProfile = async () => {
    let token = localStorage.getItem("access_token");
    if (!token) {
      console.error("Access token is missing.");
      return;
    }

    const url = "https://api.spotify.com/v1/me";

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(
          "Failed to fetch user profile:",
          response.status,
          response.statusText
        );
        return;
      }

      const data = await response.json();
      console.log("User Profile:", data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const [genre, setGenre] = useState("");
  const [artistas, setArtistas] = useState([]);
  const [error, setError] = useState(null);


//Mover a Services
  const getTracksByGenre = async (genre = 'pop') => {
  
    if (!access_token) {
      throw new Error("Access token is missing.");
        
    }

    const url = `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(genre)}&type=track&limit=10`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching tracks by genre");
            
        }

        const data = await response.json();
        console.log("Tracks:", data.tracks.items);
        return data.tracks.items; // Devuelve las canciones
    } catch (error) {
        console.error("Error:", error);
        console.error("message:", message);
        return [];
    }
};

const Genres = () => {


    return (
      <div className="w-full border-1">
        <div className=""
        >
          
        </div>
      </div>
    )
}
  const [selectedGenre, setSelectedGenre] = useState();

  const [tracks, setTracks] = useState([]);

  const [artists, setArtists] = useState([]);

  const [playlists, setPlaylists] = useState([]);

  useEffect(()=>{
    if (!selectedGenre) return;
    setTimeout(() => {
      setTracks(fakeTracks[selectedGenre] || []);
    setArtists(fakeArtists[selectedGenre] || []);
    setPlaylists(fakePlaylists[selectedGenre] || []);
    }, 1000); // 
  }, [selectedGenre])

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setIsSearchActive(false); // Desactivar búsqueda al seleccionar un género
  };

  const handleBackGenre = () => {
    setSelectedGenre(null);
  };





// //SEARCH
    const [searchTerm, setSearchTerm] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState({
      tracks: [],
      artists: [],
      playlists: [],
    })
    const [isSearchActive, setIsSearchActive] = useState(false)
  
  
    const handleSearch = async (query) => {
      if (!query.trim()) return;
      if (!access_token) {
        console.error("Access token is missing.");
        return;
      }
  
      try {
        setIsSearching(true);
        const data = await search(access_token, query, "track,artist,playlist");
        setSearchResults({
          tracks: data.tracks?.items || [],
          artists: data.artists?.items || [],
          playlists: data.playlists?.items || [],
        });
        setSearchTerm(query);
        setIsSearchActive(true); // Activa la búsqueda
      } catch (error) {
        console.error("Error during search:", error);
      } finally {
        setIsSearching(false);
      }
    };







  return (
    <div>
      <h1>Home</h1>

      
      <SearchInput onSearch={handleSearch} />


      {/* <Mensaje/> */}
      <div className="">
        <div className="Auth border-1">
          <Authorization clientId={clientId} redirectUri={redirectUri} />
          {/* {code && (
            <p style={{wordBreak: "break-word"}}>Authorization code: {code}</p>
          )}
          {access_token && (
            <p style={{wordBreak: "break-word"}}>Access token: {access_token}</p>
          )} */}
         
          {/* <button onClick={fetchUserProfile}>Fetch User Profile</button> */}



        




        </div>
        {/* <div>
          <Genres/>
        </div> */}

        {/* <div className="profile">
          <button onClick={fetchUserProfile}>Perfil</button>
        </div>



        
          
            
      </div>
  
          <button onClick={fetchUserProfile}>Perfil</button>
        
  
      <div > */}
      {isSearching ? (
        <p>Buscando...</p>
      ) : isSearchActive ? (
        // Mostrar resultados de búsqueda
        <>
          {searchResults.tracks.length > 0 && (
            <Section
              title={`Canciones encontradas para "${searchTerm}"`}
              items={searchResults.tracks}
              CardComponent={CardType}
            />
          )}
          {searchResults.artists.length > 0 && (
            <Section
              title={`Artistas encontrados para "${searchTerm}"`}
              items={searchResults.artists}
              CardComponent={CardType}
            />
          )}
          {searchResults.playlists.length > 0 && (
            <Section
              title={`Playlists encontradas para "${searchTerm}"`}
              items={searchResults.playlists}
              CardComponent={CardType}
            />
          )}
        </>
      ) : selectedGenre ? (
        // Mostrar detalles del género seleccionado
        <>
          <button onClick={handleBackGenre}>Volver</button>
          <Section title={`Canciones de ${selectedGenre}`} items={tracks} CardComponent={CardType} />
          <Section title={`Artistas de ${selectedGenre}`} items={artists} CardComponent={CardType} />
          <Section title={`Playlists de ${selectedGenre}`} items={playlists} CardComponent={CardType} />
        </>
      ) : (
        // Mostrar géneros
        <Section
          title="Géneros"
          items={genres}
          CardComponent={(props) => <CardGenre {...props} onClick={handleGenreClick} />}
        />
      )}
      </div>
      </div>
  );
};
export default Home;
