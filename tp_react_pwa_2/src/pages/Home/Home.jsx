import React, { useState, useEffect } from "react";
import Authorization from "../../components/Authorization/Authorization";
import Section from "../../components/Section/Section";
import CardGenre from "../../components/CardGenre/CardGenre";
import CardType from "../../components/CardType/CardType";
import { genres } from "../../assets/fakeData/genres";
//import { fakeArtists } from "../../assets/fakeData/fakeArtists";
//import { fakePlaylists } from "../../assets/fakeData/fakePlaylists";
//import { fakeTracks } from "../../assets/fakeData/fakeTracks";
import SearchInput from "../../components/SearchInput/SearchInput";
import search from "../../services/search.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
import { ArrowLeft } from "lucide-react";
import fetchSpotifyData from "../../services/fetchSpotifyData.js";

const Home = () => {
  // const [code, setCode] = useState(
  //   localStorage.getItem("authorization_code") || ""
  // );

  // const [user, setUser] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [access_token, setAccessToken] = useState("");
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

  // //SEARCH
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    artists: [],
    playlists: [],
  });
  const [isSearchActive, setIsSearchActive] = useState(false);

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

  ///////////////// FLORRRRR /////////////////////

  // const fetchSpotifyData = async (genre, type) => {
  //   const baseURL = "https://api.spotify.com/v1/search";

  //   let query = type === "playlist"
  //     ? genre  // para playlist no se usa el filtro genre:
  //     : `genre:${genre}`; // para tracks y artists sí

  //   try {
  //     const res = await fetch(`${baseURL}?q=${encodeURIComponent(query)}&type=${type}&limit=15`, {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     });

  //   const data = await res.json();
  //     const items = data[type + "s"]?.items || [];
  //     const filteredItems = items.filter(item => item !== null);
  //     return filteredItems;
  //   } catch (error) {
  //     console.error(`Error fetching ${type}s:`, error);
  //       }
  // };
  const [selectedGenre, setSelectedGenre] = useState();

  const [tracks, setTracks] = useState([]);

  const [artists, setArtists] = useState([]);

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!selectedGenre) return;

    if (!access_token) return;

    const fetchData = async () => {
      const fetchArtist = await fetchSpotifyData(
        selectedGenre,
        "artist",
        access_token
      );
      setArtists(fetchArtist);
      const fetchTracks = await fetchSpotifyData(
        selectedGenre,
        "track",
        access_token
      );
      setTracks(fetchTracks);
      const fetchPlaylists = await fetchSpotifyData(
        selectedGenre,
        "playlist",
        access_token
      );
      setPlaylists(fetchPlaylists);
    };

    fetchData();
  }, [selectedGenre, access_token]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleBackGenre = () => {
    setSelectedGenre(null);
  };

  const mapSpotifyItemToCardProps = (item, type) => {
    switch (type) {
      case "track":
        return {
          id: item.id,
          name: item.name,
          artist: item.artists?.[0]?.name,
          image: item.album?.images?.[0]?.url,
          type: "track",
        };
      case "artist":
        return {
          id: item.id,
          name: item.name,
          artist: null,
          image: item.images?.[0]?.url,
          type: "artist",
        };
      case "playlist":
        return {
          id: item.id,
          name: item.name,
          artist: item.owner?.display_name,
          image: item.images?.[0]?.url,
          type: "playlist",
        };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1>Home</h1>

      <SearchInput onSearch={handleSearch} />

      {/* <Mensaje/> */}
      <div className="">
        <div className="Auth border-1"></div>

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
                    artist: track.artists
                      ?.map((artist) => artist.name)
                      .join(", "),
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
            <Button
              onClick={handleBackGenre}
              className="m-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded transition-colors duration-200 hover:from-purple-700 hover:to-purple-900"
            >
              <ArrowLeft size={32} className="text-white" />
            </Button>
            <div className="flex flex-col gap-y-24">
              <Section
                title={t("Songs")}
                items={tracks.map((item) =>
                  mapSpotifyItemToCardProps(item, "track")
                )}
                CardComponent={CardType}
              />
              <Section
                title={t("Artists")}
                items={artists.map((item) =>
                  mapSpotifyItemToCardProps(item, "artist")
                )}
                CardComponent={CardType}
              />
              <Section
                title={t("Playlists")}
                items={playlists.map((item) =>
                  mapSpotifyItemToCardProps(item, "playlist")
                )}
                CardComponent={CardType}
              />
            </div>
          </>
        ) : (
          <Section
            title={t("Genres")}
            items={genres}
            CardComponent={(props) => (
              <CardGenre {...props} onClick={handleGenreClick} />
            )}
          />
        )}
      </div>
    </div>
  );
};
export default Home;
