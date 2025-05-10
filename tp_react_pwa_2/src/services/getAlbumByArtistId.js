const getAlbumsByArtistId = async (token, artistId) => {
    const i  = 0
  let allAlbums = [];
  let url = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single,compilation&limit=50`;

  while (url) {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (!res.ok || !data.items) {
      console.error("Error al obtener álbumes:", data);
      throw new Error("La respuesta de la API no tiene items.");
    }

    allAlbums = [...allAlbums, ...data.items];
    url = data.next;
  }

  return allAlbums;
};
export default getAlbumsByArtistId