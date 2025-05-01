import { useEffect, useState } from "react";

const Player = ({ id, access_token }) => {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    if (id && access_token) {
      getTrack(id);
    }
  }, [id, access_token]);

  const getTrack = async (id) => {
    if (!access_token) return;

    try {
      const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!response.ok) throw new Error("Error fetching track data");

      const data = await response.json();
      setTrack(data);
      console.log("Track data:", data);
    } catch (error) {
      console.error("Error fetching track:", error.message);
    }
  };

  return (
    <div className="container">
      <div id="embed-iframe">
        {track ? (
          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/track/${id}`}
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
