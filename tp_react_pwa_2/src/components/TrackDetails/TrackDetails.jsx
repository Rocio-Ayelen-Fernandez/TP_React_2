import { useNavigate } from "react-router-dom";
import getTrackById from "../../services/getTrackById";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TrackList from "../TrackList/TrackList";

const TrackDetails = ({ trackId }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [access_token, setAccessToken] = useState(null);
    const [track, setTrack] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setAccessToken(token);
        }
    }, []);

    useEffect(() => {
        if (access_token && trackId) {
            const fetchTrack = async () => {
                const foundTrack = await getTrackById(access_token, trackId);
                setTrack(foundTrack);
                console.log(foundTrack.album)
            };
            fetchTrack();
        }
    }, [access_token, trackId]);

    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="px-4">
            {track ? (
                <div className="w-full max-w-7xl mx-auto my-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="relative col-span-1 lg:col-span-1 overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-purple-700/60 via-indigo-800/50 to-black/80 backdrop-blur-lg">
                        <div className="absolute inset-0">
                            <img
                                src={track.album.images[0]?.url}
                                alt="background"
                                className="w-full h-full object-cover blur-lg scale-110 opacity-30"
                            />
                        </div>
                        <div className="relative z-10 flex flex-col p-6 gap-4 text-white">
                            <div className="w-40 h-40 md:w-48 md:h-48 mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-md">
                                <img
                                    src={track.album.images[0]?.url}
                                    alt={track.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-3 text-center lg:text-left">
                                <h1 className="text-3xl font-bold">{track.name}</h1>
                                <p>
                                    {t("Artista")}:
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
                                    {t("Álbum")}:
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
                                    {t("Duración")}: {formatDuration(track.duration_ms)}
                                </p>
                                <a
                                    href={track.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-2 text-sm bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 rounded-full"
                                >
                                    {t("Escuchar en Spotify")}
                                </a>
                                <div className="mt-4 w-full">
                                    <iframe
                                        src={`https://open.spotify.com/embed/track/${track.id}`}
                                        width="100%"
                                        height="80"
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
