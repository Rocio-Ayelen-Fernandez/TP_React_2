import { useEffect, useState } from "react";
import TrackList from "../TrackList/TrackList";
import useCachedFetch from "../../services/useCachedFetch";
import getAlbumById from "../../services/getAlbumById";

const AlbumDetails = ({ albumId }) => {
  const { fetchData, isLoading, getCachedData } = useCachedFetch();
  const [album, setAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState([]);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const albumData = await fetchData("album", albumId, async () => {
          const album = await getAlbumById(localStorage.getItem("access_token"), albumId);

          const cachedTracks = getCachedData("tracks", albumId);
          const tracks = cachedTracks || (await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }).then((res) => res.json()).then((data) => data.items || []));

          return { ...album, tracks };
        });

        setAlbum(albumData);
        setAlbumTracks(albumData.tracks || []);
      } catch (error) {
        console.error("Error fetching album details:", error.message);
      }
    };

    fetchAlbumDetails();
  }, [albumId, fetchData, getCachedData]);

  if (isLoading) {
    return (
      <div className="w-full h-80 bg-gradient-to-br from-black/70 via-purple-800/40 to-indigo-900/70 flex items-center justify-center">
        <p className="text-white text-lg">Cargando álbum...</p>
      </div>
    );
  }

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