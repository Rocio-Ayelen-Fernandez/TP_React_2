import { useEffect, useState } from "react";

const AlbumDetails = ({ album }) => {
  const [tracks, setTracks] = useState([]);
  const [access_token, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setAccessToken(token);
  }, []);

  useEffect(() => {
    if (access_token && album.id) {
      getAlbumTracks(album.id);
    }
  }, [access_token, album]);

  const getAlbumTracks = async (id) => {
    try {
      const res = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const data = await res.json();
      setTracks(data.items);
    } catch (err) {
      console.error("Error al obtener las canciones", err);
    }
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{album.name}</h1>
      <img src={album.images[0]?.url} alt={album.name} className="w-48 rounded-xl mb-4" />
      <p className="mb-2">Artista: {album.artists.map((a) => a.name).join(", ")}</p>
      <p className="mb-4">Lanzado: {album.release_date}</p>

      <h2 className="text-xl font-semibold mb-2">Canciones</h2>
      <ul className="list-disc ml-6">
        {tracks.map((track) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumDetails;
