const getPlaylistById = async (access_token, id) => {
    if (!access_token || !id) throw new Error('Missing access_token or id');


    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response from Spotify API:", errorData);
            throw new Error(`Error fetching playlist data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching playlist:", error.message);
        throw error;
    }
};

export default getPlaylistById;