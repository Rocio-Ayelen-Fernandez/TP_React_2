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
        <div className="rounded-t hidden md:grid grid-cols-12 gap-4 px-4 py-2 border-b text-sm text-gray-200 uppercase tracking-wider sticky top-0 z-10 bg-gray-600 ">
          <div className="col-span-1">#</div>
          <div className="col-span-6">Título</div>
          <div className="col-span-3">Artista</div>
          <div className="col-span-2 text-right">Duración</div>
        </div>

        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer "
            onClick={() => onClickNavigateToTrack(track.id)}
          >
            {/* {console.log(track.id)} */}
            <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4">
              <div className="md:col-span-1 text-gray-400 mb-1 md:mb-0">
                {index + 1}
              </div>


              <div className="md:flex md:flex-col md:col-span-9 ">
                <div className="md:text-white">
                  {track.name}
                </div>
                <div className="text-gray-400 md:flex ">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </div>
              </div>

              <div className=" col-span-2 text-right text-gray-400 ">
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
