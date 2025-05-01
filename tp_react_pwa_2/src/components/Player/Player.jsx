import { useEffect, useState } from "react";
import getTrackById from "../../services/getTrackById";

const Player = ({ id, access_token }) => {
  const [track, setTrack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      if (id && access_token) {
        try {
          const trackData = await getTrackById(access_token, id);
          setTrack(trackData);
          setError(null); // Limpiar errores previos
        } catch (err) {
          console.error("Error in Player component:", err.message);
          setError("Failed to load track. Please try again.");
        }
      }
    };

    fetchTrack();
  }, [id, access_token]);


  return (
    <div className="container">
      <div id="embed-iframe">
        {track ? (
          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/track/${track.id}`}
            width="40%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ) : (
          <p>Loading track...</p>
        )}
      </div>
    </div>
  );
};

export default Player;