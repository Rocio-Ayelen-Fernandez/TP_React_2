import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";

const UserPlaylist = ({ playlistId }) => {
    const { t } = useTranslation();
  const [access_token, setAccessToken] = useState("");
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    if (access_token && playlistId) {
      const fetchPlaylist = async () => {
        try {
          const res = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId}`,
            {
              headers: { Authorization: `Bearer ${access_token}` },
            }
          );
          const data = await res.json();
          setPlaylist(data);
        } catch (error) {
          console.error("Error fetching playlist:", error);
        }
      };
      fetchPlaylist();
    }
  }, [access_token, playlistId]);

  const handleRemoveTrack = async (trackUri) => {
    try {
      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tracks: [{ uri: trackUri }],
        }),
      });

      const updatedTracks = [...playlist.tracks.items];
      const trackIndex = updatedTracks.findIndex(
        (item) => item.track.uri === trackUri
      );
      if (trackIndex !== -1) {
        updatedTracks.splice(trackIndex, 1);
      }

      setPlaylist({
        ...playlist,
        tracks: {
          ...playlist.tracks,
          items: updatedTracks,
        },
      });
    } catch (error) {
      console.error("Error removing track:", error);
    }
  };

  if (!playlist) {
    return (
      <div className="text-white text-center mt-10">{t("loading")}</div>
    );
  }

  return (
    <div className="text-white p-6">
      {playlist ? (
        <div className="">
          <div className="flex flex-row items-center justify-center gap-8  ">
            {playlist.images && playlist.images.length > 0 ? (
              <img
                src={playlist.images[0].url}
                alt="Playlist Cover"
                className="w-auto lg:h-20 md:h-18 h-22 rounded shadow-lg"
              />
            ) : (
              <div className="w-auto h-22 bg-gray-700 rounded shadow-lg flex items-center justify-center text-gray-400">
                Sin imagen
              </div>
            )}
            <div>
              <h1 className="font-bold">{playlist.name}</h1>
              <p className="mt-1 text-gray-400 text-sm">
                {playlist.tracks.total} canciones
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-12 gap-6 px-4 py-2 border-b text-sm text-gray-300 uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Título</div>
              <div className="col-span-3">Artista</div>
            </div>

            {playlist.tracks.items.map((item, index) => (
              <div
                key={`${item.track.uri}-${index}`}
                className="grid grid-cols-12 gap-6 px-1 py-2 hover:bg-white/10 transition-colors"
              >
                <div className="col-span-1 text-gray-400">{index + 1}</div>
                <div className="col-span-5 font-medium whitespace-nowrap cursor-pointer">
                  {item.track.name}
                </div>
                <div className="col-span-3 text-gray-300">
                  {item.track.artists.map((artist) => artist.name).join(", ")}
                </div>
                <div className="col-span-1 text-center">
                  <Button
                    onClick={() => handleRemoveTrack(item.track.uri)}
                    children={<X />}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>{t(no_playlist_currently)}</p>
      )}
    </div>
  );
};

export default UserPlaylist;
