const fetchSpotifyData = async (genre, type, token) => {
  // console.log("Fetching Spotify data...");
  // console.log("Genre:", genre);
  // console.log("Type:", type);
  const baseURL = "https://api.spotify.com/v1/search";

  let query =
    type === "playlist"
      ? genre // para playlist no se usa el filtro genre:
      : `genre:${genre}`; // para tracks y artists sí

  try {
    const res = await fetch(
      `${baseURL}?q=${encodeURIComponent(query)}&type=${type}&limit=15`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 3000;
      console.warn(`⚠️ Rate limit reached. Retrying after ${waitTime / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));

      if (retryCount < 3) {
        return fetchSpotifyData(genre, type, token, retryCount + 1);
      } else {
        console.error("❌ Max retry attempts reached.");
        return [];
      }
    }

    const data = await res.json();
    // console.log("DATA", data);
    const items = data[type + "s"]?.items || [];
    const filteredItems = items.filter((item) => item !== null);
    // console.log("Filtered items:", filteredItems);
    return filteredItems;
  } catch (error) {
    console.error(`Error fetching ${type}s:`, error);
  }
};
export default fetchSpotifyData;
