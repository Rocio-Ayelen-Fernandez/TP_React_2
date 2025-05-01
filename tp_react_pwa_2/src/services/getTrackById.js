const getTrackById = async (access_token, id) => {
    if (!access_token || !id) throw new Error('Missing access_token or id');


    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Obtener detalles del error
            console.error("Error response from Spotify API:", errorData);
            throw new Error(`Error fetching track data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching track:", error.message);
        throw error;
    }
};

export default getTrackById;