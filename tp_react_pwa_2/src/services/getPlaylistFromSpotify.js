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
    }

//     const response = await fetch(`https://api.spotify.com/v1/users/lxc8p8106hk2jzve68p5izobs/playlists`, {
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   })
//     .then(res => res.json())
//     .then(data => console.log('USER PLAYLISTS:', data));
  
  }
  
  export default getUserPlaylist;