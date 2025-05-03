const search = async (token, q, type) => {
    if(!q) throw new Error('Missing search query');

    try {
        const encodedQuery = encodeURIComponent(q); 

        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=${type}}&limit=20`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Obtener detalles del error
            console.error("Error response from Spotify API:", errorData);
            throw new Error(`Error fetching track data: ${response.status} ${response.statusText}`)
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error searching track:", error.message);
        throw error
    }

}
export default search