import { useEffect, useState } from "react";
import getTrackById from "../../services/getTrackById";

const Player = ({ id, access_token }) => {
  const [track, setTrack] = useState(null);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar la visibilidad

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

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Cambiar el estado de visibilidad
  };

  return (
    <div className="container">
      <button
        onClick={toggleVisibility}
        className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-md mb-4"
      >
        {isVisible ? "Esconder Reproductor" : "Mostrar Reproductor"}
      </button>
      <div id="embed-iframe">
        {isVisible && track ? (
          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/track/${track.id}`}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ) : (
          isVisible && <p>Loading track...</p>
        )}
      </div>
    </div>
  );
};

export default Player;