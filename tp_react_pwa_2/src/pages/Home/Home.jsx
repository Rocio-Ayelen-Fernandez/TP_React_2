import React, {useState, useEffect} from "react";
import styles from "./Home.module.css";
import Authorization from "../../components/Authorization/Authorization";
import AddToFavorite from "../../components/AddToFavorite/AddToFavorite";
import Player from "../../components/Player/Player";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";
import ListFavorite from "../../components/ListFavorite/ListFavorite";

import Card from "../../components/Card/Card"
import Section from "../../components/Section/Section";
import CardGenre from "../../components/CardGenre/CardGenre";
import CardType from "../../components/CardType/CardType";
import { genres } from "../../assets/fakeData/genres";
import { fakeArtists } from "../../assets/fakeData/fakeArtists";
import { fakePlaylists } from "../../assets/fakeData/fakePlaylists";
import { fakeTracks } from "../../assets/fakeData/fakeTracks";
import { ROUTES } from "../../const/routes.js";


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

  // GET PLAYLIST by CATEGORY
  //     var myHeaders = new Headers();
  // myHeaders.append("Authorization", "");

  // var requestOptions = {
  //    method: 'GET',
  //    headers: myHeaders,
  //    redirect: 'follow'
  // };

  // fetch("https://api.spotify.com/v1/browse/categories//playlists", requestOptions)
  //    .then(response => response.text())
  //    .then(result => console.log(result))
  //    .catch(error => console.log('error', error));

  // GET CATEGORIES

  //https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(genre)}&type=artist&limit=10
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", "");

  // var requestOptions = {
  //    method: 'GET',
  //    headers: myHeaders,
  //    redirect: 'follow'
  // };

  // fetch("https://api.spotify.com/v1/browse/categories", requestOptions)
  //    .then(response => response.text())
  //    .then(result => console.log(result))
  //    .catch(error => console.log('error', error));

  const [genre, setGenre] = useState("");
  const [artistas, setArtistas] = useState([]);
  const [error, setError] = useState(null);

  //https://api.spotify.com/v1/browse/categories/{category_id}/playlists
  // https://api.spotify.com/v1/browse/categories//playlists?country=AR&limit=20&offset

  /*const fetchArtist = async (genre) => {
        let token = localStorage.getItem("access_token");

        try{
            
            const response = await (`https://api.spotify.com/v1/browse/categories/${(genre)}/playlist?country=AR&limit=20&offset`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                 }
            })
            if (!response.ok) {
                throw new Error('Error buscando artistas');
              }   
              const data = await response.json();
              setArtistas(data.artists.items); // Guardamos la lista de artistas
              setError(null); // Limpiamos errores anteriores
            } catch (err) {
              console.error(err);
              setError('No se pudieron traer artistas.');
              setArtistas([]); // Limpiamos la lista
            }
            
        }


    useEffect(() => {
        fetchArtist("0JQ5DAqbMKFEC4WFtoNRpw")

    }, [])*/

  //{encodeURIComponent(genre)}&type=artist&limit=10`

 /* const objectsGenre = {
    genre : "latina" id: "0JQ5DAqbMKFxXaXKP7zcDp",
    genre : "pop"id: "0JQ5DAqbMKFEC4WFtoNRpw",
    genre: "rock" id: "0JQ5DAqbMKFDXXwE9BDJAr",
    genre : "indie" id: "0JQ5DAqbMKFCWjUTdzaG0e",
    genre : "dance/electronica" id: "0JQ5DAqbMKFHOzuVTgTizF",
    genre : "R&B" id: "0JQ5DAqbMKFEZPnFQSFB1T",
    genre : "K-pop" id: "0JQ5DAqbMKFGvOw3O4nLAf",
  }*/
 /*
    const getGenres = async () => {
  if (!token) {
    console.error("Access token is missing.");
    return [];
  }

  const url = `https://api.spotify.com/v1/browse/categories?limit=10`; // Trae 10 géneros

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching categories");
    }

    const data = await response.json();
    const categories = data.categories.items;

    // Armar el objeto como querés:
    const genresObject = categories.map(category => ({
      genre: category.name,
      id: category.id
    }));

    console.log("Genres:", genresObject);
    return genresObject;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

  
  
  
  
  
  */
 

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

  // Usarlo:
  // o 'hip-hop', 'classical', etc.






  
  const [selectedGenre, setSelectedGenre] = useState();

  const [tracks, setTracks] = useState([]);

  const [artists, setArtists] = useState([]);

  const [playlists, setPlaylists] = useState([]);

  useEffect(()=>{
    if (!selectedGenre) return;

    /*los fetch
    fetchSpotifyData (selectedGenre, "tracks", setTracks)
    fetchSpotifyData (selectedGenre, "artist", setArtists)
    fetchSpotifyData (selectedGenre, "playlist", setPlaylists)
    */
    setTimeout(() => {
      setTracks(fakeTracks[selectedGenre] || []);
    setArtists(fakeArtists[selectedGenre] || []);
    setPlaylists(fakePlaylists[selectedGenre] || []);
    }, 1000); // 
  }, [selectedGenre])

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleBackGenre = () => {
    setSelectedGenre(null);
  };
  return (
    <div>
      <h1>Home</h1>
      {/* <Mensaje/> */}
      <div className="">
        <div className="Auth border-1">
          <Authorization clientId={clientId} redirectUri={redirectUri} />
          {code && (
            <p style={{wordBreak: "break-word"}}>Authorization code: {code}</p>
          )}
          {access_token && (
            <p style={{wordBreak: "break-word"}}>Access token: {access_token}</p>
          )}
         
          {/* <button onClick={fetchUserProfile}>Fetch User Profile</button> */}
        </div>
        <div>
          <Genres/>
        </div>

        <div className="profile">
          <button onClick={fetchUserProfile}>Perfil</button>
        </div>



        
          
            
      </div>
  
          <button onClick={fetchUserProfile}>Perfil</button>
        
  
      <div >
        {selectedGenre ? 
             (
              <>
              
              <button onClick={handleBackGenre} className="absoulte">🠔</button>
                <Section title={`Canciones de ${selectedGenre}`} items={tracks} CardComponent={CardType} />
                <Section title={`Artistas de ${selectedGenre}`} items={artists} CardComponent={CardType} />
                <Section title={`Playlists de ${selectedGenre}`} items={playlists} CardComponent={CardType} />
              </>
             )
        
        : <Section 
        title="Géneros"
        items={genres}
        CardComponent={(props) => <CardGenre {...props} onClick={handleGenreClick} />}
      />
      
      }
      </div>
      </div>
  );
};
export default Home;
