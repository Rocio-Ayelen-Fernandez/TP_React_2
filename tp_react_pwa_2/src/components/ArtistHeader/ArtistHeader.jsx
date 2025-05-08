import { useState } from "react";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import TrackList from "../TrackList/TrackList";

const ArtistHeader = ({
  artist,
  topTracks,
  onFollowToggle,
  isFollowing,
}) => {
  const { t } = useTranslation();
  const [showAllTracks, setShowAllTracks] = useState(false);

  const renderTracks = (tracks = []) => {
    if (!Array.isArray(tracks)) return null;
    const tracksToShow = showAllTracks ? tracks : tracks.slice(0, 5);

    return (
      <div>
        <div className="relative max-h-[400px] overflow-y-auto md:border-1 md:border-white/10 rounded">
          <TrackList tracks={tracksToShow} type="artist" />
        </div>
      </div>
    );
  };

  if (!artist) return null;

  return (
    <div className="relative w-full rounded-b-3xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-8 text-white relative z-10">
        <div className="flex flex-col items-center md:justify-start md:col-span-1">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden shadow-md border border-white/20 mb-2">
            <img
              src={artist.images[0]?.url}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center text-center md:text-left">
            <h1 className="text-4xl font-extrabold">{artist.name}</h1>
            <p className="mt-2 text-white/70 text-sm">
              {t("followers")}: {artist.followers.total.toLocaleString()}
            </p>
            <Button
              onClick={onFollowToggle}
              className={`cursor-pointer mt-4 px-6 py-2 rounded-full font-medium shadow-lg text-sm transition-all ${isFollowing
                ? "bg-gradient-to-l from-pink-500 to-red-600 hover:from-pink-700 hover:to-red-700"
                : "bg-gradient-to-r from-green-500 to-violet-600 hover:from-green-600 hover:to-purple-700"
              }`}
            >
              {isFollowing ? t("unfollow") : t("follow")}
            </Button>
          </div>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 shadow-md md:col-span-3">
          <h2 className="text-lg font-bold mb-4">Top {t("Songs")}</h2>
          <div className="transition-all duration-300 ease-in-out max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
            {renderTracks(topTracks)}
          </div>
          {topTracks.length > 5 && (
            <div className="flex justify-center mt-4">
              <div className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 w-[40%] p-2 text-center cursor-pointer">
                <Button
                  onClick={() => setShowAllTracks(!showAllTracks)}
                  className="text-sm text-white hover:underline focus:outline-none"
                >
                  {showAllTracks ? t("show_less") : t("show_more")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;
