import React, { useEffect, useState } from 'react'

const CreatePlaylist = () => {

    const [tracks, setTracks] = useState({}) 
    const [playlist, setPlaylist] = useState({})
    const [access_token, setAccessToken] = useState(null)
    const [userId, setUserId] = useState(null)
    // const id = ["5mmUm6nU4vVfOZ8YCobXzy", "2plbrEY59IikOBgBGLjaoe", "1p7m9H4H8s0Y7SgRm7j3ED", "61qPUnazSdkvua4wgA4L8C"]


    //Obtener token y verificar lista de tracks
    useEffect (() => {
        setAccessToken(localStorage.getItem('access_token'))
        const storedTracks = localStorage.getItem('favorites')
        if (storedTracks) {
            setTracks(JSON.parse(storedTracks))
        } else {
            setTracks({})
        }

    }, [])

    //Obtener la informacion del usuario una vez que se tenga el token
    useEffect(() => {
        if (access_token && !userId) {
            fetchUserProfile();
        }
    }, [access_token]);

    useEffect(() => {
        if (!localStorage.getItem("spotify_playlist")) {
            localStorage.setItem("spotify_playlist", JSON.stringify([]));
        }
    
        if (playlist && Object.keys(playlist).length > 0) {
            localStorage.setItem("spotify_playlist", JSON.stringify(playlist));
        }
    }, [playlist]);

    // const getTrack = async (id) => {
    //     if (!access_token) throw new Error("Access token is missing.");
    
    //     try {
    //       const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    //         headers: {
    //           Authorization: `Bearer ${access_token}`,
    //         },
    //       });
    
    //       if (!response.ok) throw new Error("Error fetching track data");
    
    //       const data = await response.json();
    //       setTrack(data);
    //       console.log("Track data:", data);
    //     } catch (error) {
    //       console.error("Error fetching track:", error.message);
    //     }
    //   };

      const handleAddToPlaylist = async () => {

        if (!access_token) throw new Error("Access token is missing.");

        const playlist = JSON.parse(localStorage.getItem("spotify_playlist"));
    
        try {
          const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            //   uris: [`spotify:track:${id}`],
                uris: tracks.track.map((trackId)=>
                    `spotify:track:${trackId}`
                ), 

            }),
          });
    
          if (!response.ok) throw new Error("Error adding track to playlist");
    
          const data = await response.json();
          console.log("Track added to playlist:", data);
        } catch (error) {
          console.error("Error adding track to playlist:", error.message);
        }
        
      }

     const fetchUserProfile = async () => {
        
        if (!access_token) {
          throw new Error("Access token is missing.");
        }

        try {
          const response = await fetch(`https://api.spotify.com/v1/me`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          })
    
          if (!response.ok) throw new Error("Error fetching user data");
          
          const data = await response.json();
          setUserId(data.id);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };


    const handleCreatePlaylist = async () => {

        if(!access_token){
            throw new Error("No access token provided")
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{

                method: 'POST',
                headers:{
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: "Mi Playlist",
                    description: "Esta es mi playlist",
                    public: false,
                })

            })
            if (!response.ok) throw new Error("Error creating playlist");
            const data = await response.json()
            setPlaylist(data)
            console.log("Playlist created:", data)


        }catch(error){
            console.error("Error creating playlist:", error)
        }

    }



    return (

        <div className="">

            <button onClick={handleCreatePlaylist}>CrearPlaylist</button>
            <button onClick={handleAddToPlaylist}>Agregar a Playlist</button>

        </div>


    )


}

export default CreatePlaylist