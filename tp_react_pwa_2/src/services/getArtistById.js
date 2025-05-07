const getArtistById = async (access_token, id, retries = 3) => {
    if (!access_token || !id) throw new Error('Missing access_token or id');

    try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (response.status === 429) {
            // Si el servidor devuelve un 429 (Too Many Requests)
            const retryAfter = response.headers.get("Retry-After")
            const waitTime = (retryAfter ? parseInt(retryAfter, 10) : 1) * 1000
            console.warn(`Rate limited. Retrying after ${waitTime}ms...`);

            if (retries <= 0) {
                throw new Error("Rate limit exceeded. No more retries left.");
            }

            // Esperar el tiempo recomendado antes de reintentar
            await new Promise((resolve) => setTimeout(resolve, waitTime));
            
            return getArtistById(access_token, id, retries - 1)
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response from Spotify API:", errorData);
            throw new Error(`Error fetching artist data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching artist:", error.message);
        throw error;
    }
};

export default getArtistById;
