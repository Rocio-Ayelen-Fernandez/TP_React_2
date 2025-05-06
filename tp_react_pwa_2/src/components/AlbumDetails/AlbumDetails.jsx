import { useEffect, useState } from "react";
import TrackList from "../TrackList/TrackList";

const AlbumDetails = ({ albumId }) => {
  const [album, setAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [access_token, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setAccessToken(token);
  }, []);

  useEffect(() => {
    if (access_token && albumId) {
      const fetchAlbum = async () => {
        const res = await fetch(
          `https://api.spotify.com/v1/albums/${albumId}`,
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
        const data = await res.json();
        setAlbum(data);
        getAlbumTracksByAlbumId(albumId);
      };
      fetchAlbum();
    }
  }, [access_token, albumId]);

  const getAlbumTracksByAlbumId = async (id) => {
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/albums/${id}/tracks`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      const data = await res.json();
      console.log(data.items);
      setAlbumTracks(data.items);
    } catch (err) {
      console.error("Error al obtener las canciones", err);
    }
  };

  return (
    <div className="relative w-full overflow-hidden shadow-xl">
      <div className="absolute inset-0 z-0 mb-10 items-center">
        {album ? (
          <>
            <img
              src={album.images[0]?.url}
              alt={album.name}
              className="w-full h-full object-cover blur-sm scale-105 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-800/40 to-indigo-900/70 mix-blend-multiply" />
          </>
        ) : (
          <div className="w-full h-80 bg-gradient-to-br from-black/70 via-purple-800/40 to-indigo-900/70 flex items-center justify-center">
            <p className="text-white text-lg">Cargando álbum...</p>
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-10 text-white">
        {album && (
          <div className="backdrop-blur-md bg-white/5 px-6 py-6 rounded-xl border border-white/10 shadow-inner w-full flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col items-center md:items-center md:w-1/4 ">
              <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg mb-4">
                <img
                  src={album.images[0]?.url}
                  alt={album.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 text-center md:text-left">
                {album.name}
              </h1>
              <p className="text-white/80 mb-1">
                <span className="font-semibold">Artista:</span>{" "}
                {album.artists.map((a) => a.name).join(", ")}
              </p>
              <p className="text-white/80">
                <span className="font-semibold">Lanzado:</span>{" "}
                {album.release_date}
              </p>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Canciones
              </h2>
              <div className="bg-white/5 rounded-lg p-4 max-h-[500px] overflow-y-auto">
                <TrackList tracks={albumTracks} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumDetails;
