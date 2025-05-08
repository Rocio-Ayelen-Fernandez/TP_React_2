const fetchSpotifyData = async (genre, type, access_token) => {

  const baseURL = "https://api.spotify.com/v1/search";

  let query =
    type === "playlist"
      ? genre // para playlist no se usa el filtro genre:
      : `genre:${genre}`; // para tracks y artists sí

  try {
    if (!access_token) {
      throw new Error("Missing access_token or idArtist");
  }
    const res = await fetch(
      `${baseURL}?q=${encodeURIComponent(query)}&type=${type}&limit=15`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = await res.json();
    const items = data[type + "s"]?.items || [];
    const filteredItems = items.filter((item) => item !== null);
    return filteredItems;
  } catch (error) {
    console.error(`Error fetching ${type}s:`, error);
  }
};
export default fetchSpotifyData;
