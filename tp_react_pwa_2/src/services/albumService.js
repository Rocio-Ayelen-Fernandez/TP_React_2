export const getAlbumWithTracks = async (access_token, albumId) => {
    if (!access_token || !albumId) {
      throw new Error("Missing access_token or albumId");
    }
  
    try {
      // Obtener el álbum completo, incluye información del álbum
      const albumRes = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
  
      if (!albumRes.ok) {
        throw new Error("Album not found");
      }
  
      const album = await albumRes.json();
  
      // Obtener las canciones del álbum
      const tracksRes = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
  
      if (!tracksRes.ok) {
        const errorData = await tracksRes.json();
        throw new Error("Tracks not found");
      }
  
      const tracksData = await tracksRes.json();
  
      return { album, tracks: tracksData.items };
    } catch (error) {
      console.error("[getAlbumWithTracks] Error general:", error);
      throw error;
    }
  };
  export default getAlbumWithTracks

  