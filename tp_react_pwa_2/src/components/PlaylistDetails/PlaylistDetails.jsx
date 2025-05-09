import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrackList from "../../components/TrackList/TrackList";
import getPlaylistById from "../../services/getPlaylistById";

const PlaylistDetails = ({ playlistId }) => {
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token && playlistId) {
            const fetchPlaylist = async () => {
                try {
                    const data = await getPlaylistById(token, playlistId);
                    setPlaylist(data);
                } catch (error) {
                    navigate("/Error404");
                }
            };
            fetchPlaylist();
        }
    }, [playlistId, navigate]);

    if (!playlist) {
        return <div className="text-white text-center mt-10">Cargando playlist...</div>;
    }

    return (
        <div className="text-white p-6">
            <div className="flex items-center gap-6 mb-8">
                {playlist.images[0] && (
                    <img
                        src={playlist.images[0].url}
                        alt="Playlist Cover"
                        className="w-44 h-44 rounded shadow-lg"
                    />
                )}
                <div>
                    <h1 className="text-4xl font-bold">{playlist.name}</h1>
                    {playlist.description && (
                        <p
                            className="mt-2 text-gray-300 text-sm max-w-xl"
                            dangerouslySetInnerHTML={{ __html: playlist.description }}
                        ></p>
                    )}
                    <p className="mt-1 text-gray-400 text-sm">{playlist.tracks.total} canciones</p>
                </div>
            </div>

            <TrackList tracks={playlist.tracks.items.map(item => item.track)} />
        </div>
    );
};

export default PlaylistDetails;
