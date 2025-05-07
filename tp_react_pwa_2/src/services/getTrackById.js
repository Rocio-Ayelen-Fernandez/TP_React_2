const getTrackById = async (access_token, id, retries = 3) => {
    if (!access_token || !id) throw new Error("Missing access_token or id");

    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (response.status === 429) {
            const retryAfter = response.headers.get("Retry-After") || 1; // Tiempo en segundos
            if (retries > 0) {
                console.warn(`Rate limit hit. Retrying after ${retryAfter} seconds...`);
                await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
                return getTrackById(access_token, id, retries - 1);
            } else {
                throw new Error("Rate limit exceeded. Please try again later.");
            }
        }

        if (!response.ok) {
            const errorData = await response.json();
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