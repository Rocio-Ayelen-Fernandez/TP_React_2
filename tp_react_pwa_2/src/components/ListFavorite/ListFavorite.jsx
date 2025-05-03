import { use, useEffect, useState } from "react";
import getTrackById from "../../services/getTrackById.js";
import getAlbumById from "../../services/getAlbumById.js";
import getPlaylistById from "../../services/getPlaylistById.js";
import getArtistById from "../../services/getArtistByID.js";
import Player from "../../components/Player/Player.jsx";


const ListFavorite = ({token}) => {
    const [favoriteList, setFavoriteList] = useState({}); // Cambiado a un objeto vacío
    const [data, setData] = useState({});

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

        // Asegurarse de que los datos sean un objeto con las claves esperadas
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
                        fetchFunction(token, object.id));
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
        updatedFavorites[key] = updatedFavorites[key].filter((item) => item.id !== id);
            
        localStorage.setItem("favorite", JSON.stringify(updatedFavorites));

        setFavoriteList(updatedFavorites);
    };


    // Renderiza los objetos por tipo
    const renderObjects = (key) => {
        const objects = data[key] || [];

        return objects.map((object, index) => (
            <div className="objetos" key={object.id || index}>
                {object.images?.[0]?.url && (
                    <img 
                        className="max-w-60 h-auto"
                        src={object.images[0].url}
                        alt={object.name || "Sin nombre"}
                    ></img>
                )}
                <p>{object.name || "Sin nombre"}</p>
               
               {object.type === "playlist" && (
                    <p>{object.description || "Sin descripcion"}</p>
               )}

                {object.type === "track" && (
                    <Player id={object.id} access_token={token} />
                )}

                <button
                    onClick={() => handleRemove(key, object.id)} 
                    >
                    Eliminar
                </button>
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
                                    <p className={"font-[1000]"}>{key.toUpperCase()}</p>
                            </div>

                            <div className="objetos">
                                {renderObjects(key)}
                            </div>


                        </div>
                    )

                })}
            </div>

        )

    }

    return (
        <div className="">
            {renderFavorite()}
        </div>  
    );
};

export default ListFavorite;