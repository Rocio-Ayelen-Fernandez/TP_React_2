import { useEffect, useState } from "react";
import TrackList from "../TrackList/TrackList";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import  getAlbumWithTracks  from "../../services/albumService";

const AlbumDetails = ({ albumId }) => {
  const [album, setAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState([]);
  const { t } = useTranslation()

  const navigate = useNavigate();
useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (token && albumId) {
    const fetchAlbumWithTracks = async () => {
      try {
        const { album, tracks } = await getAlbumWithTracks(token, albumId);
        setAlbum(album);
        setAlbumTracks(tracks);
      } catch (error) {
        console.error("Error fetching album and tracks:", error);
        navigate("/Error");
      }
    };
    fetchAlbumWithTracks();
  }
}, [albumId, navigate, t]);

  return (
    <div className="relative w-full overflow-hidden shadow-xl">
      <div className="absolute inset-0 z-0 items-center h-full">
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
            <p className="text-white text-lg">{t("loading")}</p>
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center p-0 md:px-4 md:py-10 text-white">
        {album && (
          <div className="backdrop-blur-none md:backdrop-blur-md md:bg-white/5 px-6 py-6 rounded-xl md:border md:border-white/10 md:shadow-inner w-full flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col items-center md:items-center md:w-1/4">
              <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg mb-4">
                <img
                  src={album.images[0]?.url}
                  alt={album.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 text-center">
                {album.name}
              </h1>
              <p>
                {t("Artist")}:
                <span className="ml-1">
                  {album.artists.map((artist, index) => (
                    <span key={artist.id}>
                      <span
                        className="hover:underline cursor-pointer text-blue-300"
                        onClick={() =>
                          navigate(`/Details?type=artist&id=${artist.id}`)
                        }
                      >
                        {artist.name}
                      </span>
                      {index < album.artists.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              </p>
              <p className="text-white/80">
                <span className="font-semibold">{t("released")}:</span>{" "}
                {album.release_date}
              </p>
            </div>
            <div className="w-[100%] md:flex-1">
              <h2 className="text-2xl font-semibold text-white mb-4">
                {t("Songs")}
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
