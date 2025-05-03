import React, { useEffect, useState } from 'react'
import getPlaylistFromSpotify from '../../services/getPlaylistFromSpotify.js'


const CreatePlaylist = ({token, id}) => {

    const [tracks, setTracks] = useState({}) 
    const [playlist, setPlaylist] = useState({})
    const [playlistData, setPlaylistData] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false);


    //Obtener token y verificar lista de tracks
    useEffect(() => {
      const storedTracks = localStorage.getItem('favorite');
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

          const appPlaylist = playlistData.filter(playlist =>
              playlist.description === id
          );

          if (appPlaylist.length !== 0) {
            setPlaylist(appPlaylist[0])
            console.log("Matching playlist:", appPlaylist[0]);
          }

        }
    }, [playlistData]);

    
    const fetchPlaylists = async () => {
      try {
          const data = await getPlaylistFromSpotify(token, id);
          console.log("Playlist data fetched:", data)
          setPlaylistData(data.items || [])
      } catch (error) {
          console.error("Error fetching playlist data:", error.message);
      }
    }


    const handleAddToPlaylist = async (playlistId, tracks) => {
        if (!token) throw new Error("Access token is missing.")
    
        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uris: Array.isArray(tracks.track)
                        ? tracks.track.map((track) => `spotify:track:${track.id}`)
                        : [],
                }),
            });
    
            if (!response.ok) throw new Error("Error adding track to playlist")
    
            const data = await response.json();
            console.log("Track added to playlist:", data)
        } catch (error) {
            console.error("Error adding track to playlist:", error.message)
            throw error;
        }
    }


  const handleCreatePlaylist = async () => {
      if (!token) {
          throw new Error("No access token provided")
      }

      try {
          const response = await fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
              method: 'POST',
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: "Mi Playlist",
                  description: id,
                  public: false,
              }),
          });

          if (!response.ok) throw new Error("Error creating playlist");

          const data = await response.json();
          setPlaylist(data)
          console.log("Playlist created:", data);

          return data
      } catch (error) {
          console.error("Error creating playlist:", error.message);
          throw error;
      }
  };



  const handleAddToSpotify = async () => {
      if (isProcessing) return // Evita múltiples llamadas
      setIsProcessing(true)
  
      const storedTracks = localStorage.getItem('favorite')
      const parsedTracks = storedTracks ? JSON.parse(storedTracks) : {}
  
      if (!Array.isArray(parsedTracks.track) || parsedTracks.track.length === 0) {
          console.error("No hay canciones en favoritos para agregar a la playlist.");
          setIsProcessing(false);
          return;
      }
  
      setTracks(parsedTracks)
  
      let currentPlaylist = playlist
  
      if (!currentPlaylist || !currentPlaylist.id) {
          console.log("No playlist found, creating a new one...");
          currentPlaylist = await handleCreatePlaylist();
      }
  
      if (!currentPlaylist || !currentPlaylist.id) {
          console.error("No se pudo crear la playlist.");
          setIsProcessing(false);
          return;
      }
  
      await handleAddToPlaylist(currentPlaylist.id, parsedTracks)
      setIsProcessing(false)// Marca como completado
  };


    return (

        <div className="">

          <button
              onClick={handleAddToSpotify}
              disabled={isProcessing || !Array.isArray(tracks.track) || tracks.track.length === 0}
              className={`px-4 py-2 rounded ${
                  isProcessing || !Array.isArray(tracks.track) || tracks.track.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-fuchsia-800 hover:bg-fuchsia-950 rounded-lg text-white'
              }`}
          >
              {isProcessing ? "Procesando..." : "Agregar a Spotify"}
          </button> 

        </div>


    )


}

export default CreatePlaylist