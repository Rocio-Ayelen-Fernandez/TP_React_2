import { useNavigate } from "react-router-dom";
import getTrackById from "../../services/getTrackById";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TrackDetails = ({ trackId }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [track, setTrack] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token && trackId) {
          const fetchTrack = async () => {
            try {
              const foundTrack = await getTrackById(token, trackId);
              if (!foundTrack) {
                throw new Error("Track not found");
              }
              setTrack(foundTrack);
            } catch (error) {
              console.error("Error fetching track:", error);
              navigate("/Error?error=404"); 
            }
          };
          fetchTrack();
        }
      }, [trackId, navigate]);

    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="md:px-4 md:py-6 w-full">
            {track ? (
                <div className="w-full sm:w-full md:w-[80%] lg:w-[60%] md:mx-auto">
                    <div className="py-8 relative col-span-1 lg:col-span-1 overflow-hidden rounded-0 md:rounded-2xl shadow-2xl bg-gradient-to-br from-purple-700/60 via-indigo-800/50 to-black/80 backdrop-blur-lg">
                        <div className="absolute inset-0">
                            <img
                                src={track.album.images[0]?.url}
                                alt="background"
                                className="w-full h-full object-cover blur-lg scale-110 opacity-30"
                            />
                        </div>
                        <div className="pl-10 relative z-10 flex flex-col  items-center p-6 gap-4 text-white">
                            <div className="w-48 h-48 md:w-48 md:h-48 mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-md">
                                <img
                                    src={track.album.images[0]?.url}
                                    alt={track.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-3 text-center">
                                <h1 className="text-3xl font-bold">{track.name}</h1>
                                <p>
                                    {t("Artist")}:
                                    <span className="ml-1">
                                        {track.artists.map((artist, index) => (
                                            <span key={artist.id}>
                                                <span
                                                    className="hover:underline cursor-pointer text-blue-300"
                                                    onClick={() =>
                                                        navigate(`/Details?type=artist&id=${artist.id}`)
                                                    }
                                                >
                                                    {artist.name}
                                                </span>
                                                {index < track.artists.length - 1 && ", "}
                                            </span>
                                        ))}
                                    </span>
                                </p>
                                <p>
                                    {t("Album")}:
                                    <span
                                        className="ml-1 hover:underline cursor-pointer text-blue-300"
                                        onClick={() =>
                                            navigate(`/Details?type=album&id=${track.album.id}`)
                                        }
                                    >
                                        {track.album.name}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-300">
                                    {t("duration")}: {formatDuration(track.duration_ms)}
                                </p>
                                <a
                                    href={track.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-2 text-sm bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 rounded-full"
                                >
                                    {t("listen_on_spotify")}
                                </a>
                                <div className="mt-4 flex justify-center">
                                    <iframe
                                        src={`https://open.spotify.com/embed/track/${track.id}`}
                                        height="80"
                                        width="90%"
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                        className="rounded-xl shadow-lg"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-300">{t("Cargando canción...")}</p>
            )}
        </div>
    );
};

export default TrackDetails;
