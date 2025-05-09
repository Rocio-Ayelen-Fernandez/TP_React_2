// src/services/followArtistService.js

export const checkIfFollowingArtist = async (id, token) => {
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    return data[0];
  } catch (err) {
    console.error("Error al comprobar seguimiento:", err);
    return false;
  }
};

export const toggleFollowArtist = async (artistId, token, isFollowing) => {
  const method = isFollowing ? "DELETE" : "PUT";
  const res = await fetch(
    `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`,
    {
      method,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.status === 204;
};
