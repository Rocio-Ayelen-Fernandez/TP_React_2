const getTopTracksByArtist = async (access_token, idArtist) => {
    try {
        if (!access_token || !idArtist) {
            throw new Error("Missing access_token or idArtist");
        }

        const response = await fetch(`https://api.spotify.com/v1/artists/${idArtist}/top-tracks?market=US`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching top tracks:", errorData);
            throw new Error(`Error fetching top tracks: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.tracks;
    } catch (error) {
        console.error("Error fetching top tracks:", error.message);
        throw error;
    }
};

export default getTopTracksByArtist;
