import { useEffect, useState } from "react";
import getTrackById from "../../services/getTrackById";
import { useTranslation } from "react-i18next";
import getAlbumById from "../../services/getAlbumById";
import getPlaylistById from "../../services/getPlaylistById";

const Player = ({ id, access_token, type }) => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fetchFunctions = {
    track: getTrackById,
    album: getAlbumById,
    playlist: getPlaylistById,
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id && access_token && type) {
        const fetchFunction = fetchFunctions[type];
        if (!fetchFunction) {
          setError("Invalid type provided");
          return;
        }

        try {
          const fetchedData = await fetchFunction(access_token, id);
          setData(fetchedData);
          setError(null);
        } catch (err) {
          console.error(`Error in Player component (${type}):`, err.message);
          setError("Failed to load data");
        }
      }
    };

    fetchData();
  }, [id, access_token, type]);


  const getEmbedUrl = () => {
    if (!data || !type) return null;

    switch (type) {
      case "track":
        return `https://open.spotify.com/embed/track/${data.id}`;
      case "album":
        return `https://open.spotify.com/embed/album/${data.id}`;
      case "playlist":
        return `https://open.spotify.com/embed/playlist/${data.id}`;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center md:justify-end text-white">

      <div id="embed-iframe" className="mt-2">
        {data ? (
          <iframe
            style={{ borderRadius: "12px" }}
            src={getEmbedUrl()}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ) : (
          <p>{t("loading")}</p>
        )}
      </div>
    </div>
  );
};

export default Player;