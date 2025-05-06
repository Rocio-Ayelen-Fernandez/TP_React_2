import { useNavigate } from "react-router";
import { ROUTES } from "../../const/routes.js";

const TrackList = ({ tracks }) => {
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
        <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b text-sm text-gray-300 uppercase tracking-wider">
          <div className="col-span-1">#</div>
          <div className="col-span-6">Título</div>
          <div className="col-span-3">Artista</div>
          <div className="col-span-2 text-right">Duración</div>
        </div>

        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="grid grid-cols-12 gap-4 px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => onClickNavigateToTrack(track.id)}
          >
            {console.log(track.id)}
            <div className="col-span-1 text-gray-400">{index + 1}</div>
            <div className="col-span-5 font-medium whitespace-nowrap">
              {track.name}
            </div>
            <div className="col-span-4 text-gray-300">
              {track.artists.map((artist) => artist.name).join(", ")}
            </div>
            <div className="col-span-2 text-right text-gray-400">
              {formatDuration(track.duration_ms)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackList;
