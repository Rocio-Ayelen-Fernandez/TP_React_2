import React, { useState, useEffect } from "react";
import Section from "../../components/Section/Section";
import CardGenre from "../../components/CardGenre/CardGenre";
import CardType from "../../components/CardType/CardType";
import { genres } from "../../assets/fakeData/genres";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Button from "../../components/Button/Button";
import { ArrowLeft } from "lucide-react";
import useCachedFetch from "../../services/useCachedFetch";
import fetchSpotifyData from "../../services/fetchSpotifyData.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { fetchData, isLoading } = useCachedFetch();

  const [access_token, setAccessToken] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    artists: [],
    playlists: [],
  });

  const isTokenValid = () => {
    const token = localStorage.getItem("access_token");
    const expiration = localStorage.getItem("token_expiration");

    if (!token || !expiration) return false;

    const expirationTime = parseInt(expiration, 10);
    if (isNaN(expirationTime) || Date.now() > expirationTime) return false;

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

  const handleGenreClick = async (genreId) => {
    setSelectedGenre(genreId);

    try {
      // Fetch tracks
      const fetchedTracks = await fetchData("track", genreId, () =>
        fetchSpotifyData(genreId, "track", access_token)
      );
      console.log("Fetched tracks:", fetchedTracks);
      setTracks(fetchedTracks);

      // Fetch artists
      const fetchedArtists = await fetchData("artist", genreId, () =>
        fetchSpotifyData(genreId, "artist", access_token)
      );
      console.log("Fetched artists:", fetchedArtists);
      setArtists(fetchedArtists);

      // Fetch playlists
      const fetchedPlaylists = await fetchData("playlist", genreId, () =>
        fetchSpotifyData(genreId, "playlist", access_token)
      );
      console.log("Fetched playlists:", fetchedPlaylists);
      setPlaylists(fetchedPlaylists);
    } catch (error) {
      console.error("Error fetching data for genre:", genreId, error);
    }
  };

  const handleBackGenre = () => {
    setSelectedGenre(null);
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setSearchTerm(query);
      setIsSearchActive(true);

      // Fetch search results
      const fetchedSearchResults = await fetchData("search", query, () =>
        fetchSpotifyData(query, "track,artist,playlist", access_token)
      );

      console.log("Fetched search results:", fetchedSearchResults);

      setSearchResults({
        tracks: fetchedSearchResults.tracks || [],
        artists: fetchedSearchResults.artists || [],
        playlists: fetchedSearchResults.playlists || [],
      });
    } catch (error) {
      console.error("Error during search:", error);
    }
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
    <div className="text-white">
      <Header variant="home" onSearch={handleSearch} />

      <div className="px-4 py-2 min-h-screen">
        {isLoading ? (
          <p className="justify-center text-center pt-4 text-4xl">{t("Cargando...")}</p>
        ) : isSearchActive ? (
          <>
            {searchResults.tracks.length > 0 && (
              <Section
                title={`Canciones encontradas para "${searchTerm}"`}
                items={searchResults.tracks.map((track) =>
                  mapSpotifyItemToCardProps(track, "track")
                )}
                CardComponent={CardType}
              />
            )}
            {searchResults.artists.length > 0 && (
              <Section
                title={`Artistas encontrados para "${searchTerm}"`}
                items={searchResults.artists.map((artist) =>
                  mapSpotifyItemToCardProps(artist, "artist")
                )}
                CardComponent={CardType}
              />
            )}
            {searchResults.playlists.length > 0 && (
              <Section
                title={`Playlists encontradas para "${searchTerm}"`}
                items={searchResults.playlists.map((playlist) =>
                  mapSpotifyItemToCardProps(playlist, "playlist")
                )}
                CardComponent={CardType}
              />
            )}
          </>
        ) : selectedGenre ? (
          <>
            <Button onClick={handleBackGenre}>
              <ArrowLeft size={32} className="text-white" />
            </Button>
            <Section
              title={t("Songs")}
              items={tracks.map((item) => mapSpotifyItemToCardProps(item, "track"))}
              CardComponent={CardType}
            />
            <Section
              title={t("Artists")}
              items={artists.map((item) => mapSpotifyItemToCardProps(item, "artist"))}
              CardComponent={CardType}
            />
            <Section
              title={t("Playlists")}
              items={playlists.map((item) => mapSpotifyItemToCardProps(item, "playlist"))}
              CardComponent={CardType}
            />
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

      <Footer />
    </div>
  );
};

export default Home;