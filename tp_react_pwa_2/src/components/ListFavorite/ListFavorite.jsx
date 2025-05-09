import { useEffect, useState } from "react";
import getTrackById from "../../services/getTrackById.js";
import getAlbumById from "../../services/getAlbumById.js";
import getPlaylistById from "../../services/getPlaylistById.js";
import getArtistById from "../../services/getArtistById.js";
import Player from "../../components/Player/Player.jsx";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button.jsx";

const ListFavorite = ({ token }) => {
  const { t } = useTranslation();
  const [favoriteList, setFavoriteList] = useState({});
  const [data, setData] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (id) => {
    setIsVisible((prevId) => (prevId === id ? null : id));
  };

  const fetchFunctions = {
    track: getTrackById,
    album: getAlbumById,
    playlist: getPlaylistById,
    artist: getArtistById,
  };

  // Obtener la lista de favoritos desde localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorite")) || {};
    console.log("Stored Favorites:", storedFavorites);


    if (typeof storedFavorites === "object" && storedFavorites !== null) {
      setFavoriteList(storedFavorites);
    } else {
      setFavoriteList({});
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const loadedData = {};

      for (const key of Object.keys(favoriteList)) {
        const objects = favoriteList[key] || [];
        const fetchFunction = fetchFunctions[key];

        if (fetchFunction) {
          const promises = objects.map((object) =>
            fetchFunction(token, object.id)
          );
          loadedData[key] = await Promise.all(promises);
        }
      }

      setData(loadedData);
      console.log("Loaded Data:", loadedData);
    };

    if (Object.keys(favoriteList).length > 0) {
      loadData();
    }
  }, [favoriteList]);

  const handleRemove = (key, id) => {
    const updatedFavorites = { ...favoriteList };
    updatedFavorites[key] = updatedFavorites[key].filter(
      (item) => item.id !== id
    );

    localStorage.setItem("favorite", JSON.stringify(updatedFavorites));

    setFavoriteList(updatedFavorites);
  };

  // Renderiza los objetos por tipo
  const renderObjects = (key) => {
    const objects = data[key] || [];

    return objects.map((object, index) => (
      <div
        className="backdrop-blur-md bg-none bg-white/5 border border-white/10 shadow-inner rounded-md p-4 mb-5"
        key={object.id || index}
      >
        <div className="md:flex gap-2 items-center text-white">
          <div className="md:w-5/6 ">
            {object.type === "track" && (
              <div className=" flex flex-col items-center md:flex-row md:items-start gap-2">
                {object.album?.images?.[0]?.url && (
                  <img
                    className="max-w-30 rounded-md h-auto"
                    src={object.album.images[0].url}
                    alt={object.name || t("No_name")}
                  />
                )}
                <div>
                  <p>
                    <span className="font-bold text-2xl">
                      {object.name || t("No_name")}
                    </span>
                  </p>
                  <p>{object.artists?.[0]?.name || t("No_artist")}</p>
                  <p>{object.album?.release_date || t("No_date")}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center md:flex-row md:items-start gap-2">
              {object.images?.[0]?.url && (
                <img
                  className="max-w-30 rounded-md h-auto"
                  src={object.images[0].url}
                  alt={object.name || t("No_name")}
                />
              )}

              {object.type === "playlist" && (
                <div className="flex flex-col items-center md:items-start gap-2">
                  <p>
                    <span className="font-bold text-2xl">
                      {object.name || t("No_name")}
                    </span>
                  </p>
                  <p>{object.description || t("No_description")}</p>
                  <p>{object.owner?.display_name || t("No_owner")}</p>
                </div>
              )}

              {object.type === "album" && (
                <div className="flex flex-col items-center md:flex-row md:items-start gap-2">
                  <p>
                    <span className="font-bold text-2xl">{object.name || t("No_name")}</span>
                  </p>
                  <p>{object.release_date || t("No_date")}</p>
                  <p>{object.artists?.[0]?.name || t("No_artist")}</p>
                </div>
              )}

              {object.type === "artist" && (
                <div>
                  <p>
                    <span className="font-bold text-2xl">{object.name || t("No_name")}</span>
                  </p>
                  <p>
                    <span className="font-bold">{t("Followers")}: </span>
                    {object.followers?.total || t("No_info")}
                  </p>
                  <p>
                    <span className="font-bold">{t("Genre")}: </span>
                    {object.genres?.[0] || t("No_genre")}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="md:w-1/6 flex flex-col justify-center md:mr-5">
            <button
              className="cursor-pointer px-6 py-2 sm:rounded-full md:rounded-4xl rounded-2xl font-medium shadow-lg transition-transform duration-300 transform hover:scale-101 focus:outline-none text-sm sm:text-base bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-400 hover:to-red-500 text-center md:flex md:justify-center md:items-center"
              onClick={() => handleRemove(key, object.id)}
            >
              {t("remove")}
            </button>

            {(object.type === "track" ||
              object.type === "album" ||
              object.type === "playlist") && (
                <div className="flex flex-col md:flex-row justify-center mt-2">
                  <Button
                    onClick={() => toggleVisibility(object.id)}
                    className="cursor-pointer px-6 py-2 sm:rounded-full md:rounded-4xl rounded-2xl font-medium shadow-lg transition-transform duration-300 transform hover:scale-101 focus:outline-none text-sm sm:text-base bg-gradient-to-r from-green-500 to-violet-600 hover:from-purple-400 hover:to-violet-500  text-center"
                  >
                    {isVisible === object.id ? t("Hide_Player") : t("Show_Player")}
                  </Button>
                </div>
              )}
          </div>
        </div>
        {isVisible === object.id ? (
          <Player id={object.id} access_token={token} type={object.type} />
        ) : null}
      </div>
    ));
  };

  //Renderiza por tipo
  const renderFavorite = () => {
    return (
      <div className="">
        {Object.keys(favoriteList).map((key) => {
          return (
            <div className="Lista" key={key}>
              <div className="Titulo">
                <p className={"text-gray-300 font-[1000]"}>
                  {key.toUpperCase()}
                </p>
              </div>

              <div className="objetos">
                {renderObjects(key) && favoriteList[key].length > 0 ? (
                  renderObjects(key)
                ) : (
                  <div className="backdrop-blur-md bg-none bg-white/5 border border-white/10 shadow-inner rounded-md p-4">
                    <p className="text-gray-300 shadow-indigo-900">
                      {t("No_favorites", { type: key.toUpperCase() })}
                    </p>

                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return <div className="">{renderFavorite()}</div>;
};

export default ListFavorite;
