import { useNavigate } from "react-router";
import { ROUTES } from "../../const/routes.js";
import { useTranslation } from "react-i18next";

const TrackList = ({ tracks }) => {
  const { t } = useTranslation()

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const navigate = useNavigate();

  const onClickNavigateToTrack = (trackId) => {
    navigate(`${ROUTES.details}?type=track&id=${trackId}`);
  };
  return (
    <div>
      <div className="w-full">
        <div className="rounded-t hidden md:grid grid-cols-12 gap-4 px-4 py-2 border-b text-sm text-gray-200 uppercase tracking-wider sticky top-0 z-10 bg-gray-600 ">
          <div className="col-span-1">#</div>
          <div className="col-span-6">{t("title")}</div>
          <div className="col-span-3">{t("Artist")}(s)</div>
          <div className="col-span-2 text-right">{t("duration")}</div>
        </div>

        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="py-2 hover:bg-white/10 transition-colors cursor-pointer "
            onClick={() => onClickNavigateToTrack(track.id)}
          >
            <div className="grid grid-cols-12 md:grid-cols-13 md:gap-4">
              <div className="col-span-1 flex items-center justify-center md:col-span-1 text-gray-400 mb-1 md:mb-0 text-center">
                {index + 1}
              </div>
              <div className="grid md:grid-cols-9 col-span-9 md:col-span-10">
                <div className="col-span-5 md:col-span-5 md:text-white">
                  {track.name}
                </div>
                <div className="col-span-3 md:col-span-4 text-gray-400">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </div>
              </div>

              <div className="rounded-full bg-white/10 flex justify-center items-center col-span-2 text-right text-gray-400">
                {formatDuration(track.duration_ms)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackList;
