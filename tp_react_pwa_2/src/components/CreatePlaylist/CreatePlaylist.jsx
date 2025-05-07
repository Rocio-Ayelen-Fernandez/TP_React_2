import React, { useEffect, useState } from "react";
import getPlaylistFromSpotify from "../../services/getPlaylistFromSpotify.js";
import { useTranslation } from "react-i18next";
import UserPlaylist from "../UserPlaylist/UserPlaylist";
import Button from "../Button/Button.jsx";

const CreatePlaylist = ({ token, id }) => {
  const { t } = useTranslation();
  const [tracks, setTracks] = useState({});
  const [playlist, setPlaylist] = useState({});
  const [playlistData, setPlaylistData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [showPlaylist, setShowPlaylist] = useState(false);

  //Obtener token y verificar lista de tracks
  useEffect(() => {
    const storedTracks = localStorage.getItem("favorite");
    if (storedTracks) {
      const parsedTracks = JSON.parse(storedTracks);
      setTracks(parsedTracks);
    } else {
      setTracks({});
    }
  }, []);

  //Obtener la informacion del usuarion
  useEffect(() => {
    if (token) {
      fetchPlaylists();
    }
  }, [token, id]);

  //Obtiene nuestra playlist
  useEffect(() => {
    if (Array.isArray(playlistData) && playlistData.length >= 0) {
      const appPlaylist = playlistData.filter(
        (playlist) => playlist.description === id
      );

      if (appPlaylist.length !== 0) {
        setPlaylist(appPlaylist[0]);
      }
    }
  }, [playlistData]);

  const fetchPlaylists = async () => {
    try {
      const data = await getPlaylistFromSpotify(token, id);

      setPlaylistData(data.items || []);
    } catch (error) {
      console.error("Error fetching playlist data:", error.message);
    }
  };

  const handleAddToPlaylist = async (playlistId, tracks) => {
    if (!token) throw new Error("Access token is missing.");

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: Array.isArray(tracks.track)
              ? tracks.track.map((track) => `spotify:track:${track.id}`)
              : [],
          }),
        }
      );

      if (!response.ok) throw new Error("Error adding track to playlist");

      const data = await response.json();
    } catch (error) {
      console.error("Error adding track to playlist:", error.message);
      throw error;
    }
  };

  const handleCreatePlaylist = async () => {
    if (!token) {
      throw new Error("No access token provided");
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${id}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Mi Playlist",
            description: id,
            public: false,
          }),
        }
      );

      if (!response.ok) throw new Error("Error creating playlist");

      const data = await response.json();
      setPlaylist(data);

      return data;
    } catch (error) {
      console.error("Error creating playlist:", error.message);
      throw error;
    }
  };

  const handleAddToSpotify = async () => {
    if (isProcessing) return; 
    setIsProcessing(true);

    const storedTracks = localStorage.getItem("favorite");
    const parsedTracks = storedTracks ? JSON.parse(storedTracks) : {};

    if (!Array.isArray(parsedTracks.track) || parsedTracks.track.length === 0) {
      console.error(
        "No hay canciones en favoritos para agregar a la playlist."
      );
      setIsProcessing(false);
      return;
    }

    setTracks(parsedTracks);

    let currentPlaylist = playlist;

    if (!currentPlaylist || !currentPlaylist.id) {
      setShowMessage(t("creating_playlist"));
      currentPlaylist = await handleCreatePlaylist();
    } else {
      setShowMessage(t("updating_playlist"));
    }

    if (!currentPlaylist || !currentPlaylist.id) {
      console.error("No se pudo crear la playlist.");
      setIsProcessing(false);
      return;
    }

    await handleAddToPlaylist(currentPlaylist.id, parsedTracks);

    setShowMessage(t("successfully_added_tracks"));
    setTimeout(() => setShowMessage(false), 3000);
    setShowPlaylist(false);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <button
        onClick={handleAddToSpotify}
        disabled={
          isProcessing ||
          !Array.isArray(tracks.track) ||
          tracks.track.length === 0
        }
        className={`cursor-pointer px-6 py-2 sm:rounded-full md:rounded-4xl rounded-2xl font-medium shadow-lg transition-transform duration-300 transform hover:scale-101 focus:outline-none text-sm sm:text-base text-white ${
          isProcessing ||
          !Array.isArray(tracks.track) ||
          tracks.track.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-violet-600 hover:from-purple-400 hover:to-violet-500 "
        }`}
      >
        {isProcessing ? "Procesando..." : "Agregar a Spotify"}
      </button>

      {showMessage && (
        <div className="mt-2 text-white text-sm sm:text-base">
          {showMessage}
        </div>
      )}

      <div className="">
        <Button
          className="cursor-pointer px-6 py-2 sm:rounded-full md:rounded-4xl rounded-2xl font-medium shadow-lg transition-transform duration-300 transform hover:scale-101 focus:outline-none text-sm sm:text-base text-white bg-gradient-to-r from-green-500 to-violet-600 hover:from-purple-400 hover:to-violet-500"
          onClick={() => setShowPlaylist(!showPlaylist)}
          children={showPlaylist ? t("hide_playlist") : t("show_playlist")}
        />
      </div>
      <div className="flex justify-center">
        {showPlaylist && playlist && playlist.id ? (
          <div className="w-80 max-w-xs overflow-hidden pr-5">
            <div className="w-full mx-auto overflow-y-auto max-h-[25vh]">
              <UserPlaylist playlistId={playlist.id} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CreatePlaylist;
