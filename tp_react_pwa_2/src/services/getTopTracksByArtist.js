import Authorization from "../components/Authorization/Authorization"

const getTopTracksByArtist = async (access_token, idArtist) => {
    try {
        if (access_token, idArtist) {
            const response = await fetch(`https://api.spotify.com/v1/artists/${idArtist}/top-tracks`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            if (!response.ok) {
                console.log("No se ha podido obtener los tracks del artista")
            }
            const data = await response.json();
            return data.tracks;
        }

    } catch (error) {
        console.error("Error fetching top tracks:", error.message);
        throw error;
    }
}

export default getTopTracksByArtist
