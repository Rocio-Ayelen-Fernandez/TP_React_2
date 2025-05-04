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
import { useNavigate } from "react-router-dom";



const Home = () => {
  


  // const [code, setCode] = useState(
  //   localStorage.getItem("authorization_code") || ""
  // );

  // const [user, setUser] = useState(null);
  
  const navigate = useNavigate();
  const [access_token, setAccessToken] = useState("")
  const isTokenValid = () => {
    const token = localStorage.getItem("access_token");
    const expiration = localStorage.getItem("token_expiration");
 
    if (!token || !expiration) {
      return false;
    }
  
    const expirationTime = parseInt(expiration, 10);
  
    const readableExpirationTime = new Date(expirationTime).toLocaleString();
  console.warn("Expiration time (readable):", readableExpirationTime);

  
    if (isNaN(expirationTime)) {
   
      return false;
    }
  
    if (Date.now() > expirationTime) {
      return false;
    }
    return true;
  };
  
  useEffect(() => {
    const valid = isTokenValid();
    if (valid) {
      setAccessToken(localStorage.getItem("access_token"));
    } else {
      navigate("/Login");
    }
  }, [navigate]);




  // const fetchUserProfile = async () => {
  //   let token = localStorage.getItem("access_token");
  //   if (!token) {
  //     console.error("Access token is missing.");
  //     return;
  //   }

  //   const url = "https://api.spotify.com/v1/me";

  //   try {
  //     const response = await fetch(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       console.error(
  //         "Failed to fetch user profile:",
  //         response.status,
  //         response.statusText
  //       );
  //       return;
  //     }

  //     const data = await response.json();
  //     console.log("User Profile:", data);
  //   } catch (error) {
  //     console.error("Error fetching user profile:", error);
  //   }
  // };

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
                items={searchResults.tracks
                  .filter((track) => track && track.id) // Filtrar elementos nulos o sin id
                  .map((track) => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists?.map((artist) => artist.name).join(", "),
                    image: track.album?.images?.[0]?.url || "", // Usa la primera imagen del álbum
                    type: "track", // Agregar el tipo
                  }))}
                CardComponent={CardType}
              />
            )}

            {searchResults.artists.length > 0 && (
              <Section
                title={`Artistas encontrados para "${searchTerm}"`}
                items={searchResults.artists
                  .filter((artist) => artist && artist.id) // Filtrar elementos nulos o sin id
                  .map((artist) => ({
                    id: artist.id,
                    name: artist.name,
                    artist: null, // No aplica para artistas
                    image: artist.images?.[0]?.url || "", // Usa la primera imagen del artista
                    type: "artist", // Agregar el tipo
                  }))}
                CardComponent={CardType}
              />
            )}

            {searchResults.playlists.length > 0 && (
              <Section
                title={`Playlists encontradas para "${searchTerm}"`}
                items={searchResults.playlists
                  .filter((playlist) => playlist && playlist.id) // Filtrar elementos nulos o sin id
                  .map((playlist) => ({
                    id: playlist.id,
                    name: playlist.name,
                    artist: playlist.owner?.display_name || "Desconocido", // Usa el nombre del propietario
                    image: playlist.images?.[0]?.url || "", // Usa la primera imagen de la playlist
                    type: "playlist", // Agregar el tipo
                  }))}
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
