import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import TrackList from "../TrackList/TrackList";

<<<<<<< HEAD
const ArtistHeader = ({ artist, topTracks, onFollowToggle, isFollowing, collaborations = [] }) => {
=======
const ArtistHeader = ({
  artist,
  topTracks,
  onFollowToggle,
  isFollowing,
  collaborations = [],
}) => {
>>>>>>> main
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("top");
  const [showAllTracks, setShowAllTracks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderTracks = (tracks = []) => {
    if (!Array.isArray(tracks)) return null;

    const visibleTracks = showAllTracks ? tracks : tracks.slice(0, 5);

    return (
      <div>
        <TrackList tracks={visibleTracks} type="artist" />
        {tracks.length > 5 && (
          <button
            onClick={() => setShowAllTracks(!showAllTracks)}
            className="mt-2 text-sm text-violet-400 hover:underline focus:outline-none"
          >
            {showAllTracks ? t("Mostrar menos") : t("Mostrar más")}
          </button>
        )}
      </div>
    );
  };

  if (!artist) return null;

  return (
    <div className="relative w-full rounded-b-3xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-8 text-white relative z-10">
        <div className="flex flex-col items-center md:justify-start md:col-span-1">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden shadow-md border border-white/20 mb-2">
<<<<<<< HEAD
            <img src={artist.images[0]?.url} alt={artist.name} className="w-full h-full object-cover" />
          </div>        
          <div className="flex flex-col items-center md:items-center text-center md:text-left col-span-1">
          <h1 className="text-4xl font-extrabold">{artist.name}</h1>
          <p className="mt-2 text-white/70 text-sm">{t("Seguidores")}: {artist.followers.total.toLocaleString()}</p>
          <Button
            onClick={onFollowToggle}
            className={`mt-4 px-6 py-2 rounded-full font-medium shadow-lg text-sm transition-all ${
              isFollowing
                ? "bg-gradient-to-l from-pink-500 to-violet-600 hover:from-red-500 hover:to-pink-500"
                : "bg-gradient-to-r from-green-500 to-violet-600 hover:from-green-400 hover:to-purple-500"
            }`}
          >
            {isFollowing ? t("Dejar de Seguir") : t("Seguir")}
          </Button>
        </div>
=======
            <img
              src={artist.images[0]?.url}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center md:items-center text-center md:text-left col-span-1">
            <h1 className="text-4xl font-extrabold">{artist.name}</h1>
            <p className="mt-2 text-white/70 text-sm">
              {t("Seguidores")}: {artist.followers.total.toLocaleString()}
            </p>
            <Button
              onClick={onFollowToggle}
              className={`mt-4 px-6 py-2 rounded-full font-medium shadow-lg text-sm transition-all ${
                isFollowing
                  ? "bg-gradient-to-l from-pink-500 to-violet-600 hover:from-red-500 hover:to-pink-500"
                  : "bg-gradient-to-r from-green-500 to-violet-600 hover:from-green-400 hover:to-purple-500"
              }`}
            >
              {isFollowing ? t("Dejar de Seguir") : t("Seguir")}
            </Button>
          </div>
>>>>>>> main
        </div>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 shadow-md md:col-span-3">
          <nav className="flex justify-center md:justify-start space-x-3 mb-4">
            <button
              onClick={() => setActiveTab("top")}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                activeTab === "top"
                  ? "bg-violet-600 text-white"
                  : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
              }`}
            >
              {t("Top Tracks")}
            </button>
            <button
              onClick={() => setActiveTab("collabs")}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                activeTab === "collabs"
                  ? "bg-violet-600 text-white"
                  : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
              }`}
            >
              {t("Colaboraciones")}
            </button>
          </nav>

          <div className="transition-all duration-300 ease-in-out max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
<<<<<<< HEAD
            {activeTab === "top" ? renderTracks(topTracks) : renderTracks(collaborations)}
=======
            {activeTab === "top"
              ? renderTracks(topTracks)
              : renderTracks(collaborations)}
>>>>>>> main
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;
