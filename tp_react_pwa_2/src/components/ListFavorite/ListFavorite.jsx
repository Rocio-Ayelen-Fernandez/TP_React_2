import { use, useEffect, useState } from "react";
import getTrackById from "../../services/getTrackById.js";
import getAlbumById from "../../services/getAlbumById.js";
import getPlaylistById from "../../services/getPlaylistById.js";
import getArtistById from "../../services/getArtistById.js";
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
            <div className="border-2 border-slate-800 bg-gradient-to-r from-indigo-700 via-200% via-teal-500 shadow-xl rounded-md p-2 mb-2" 
                key={object.id || index}>

                <div className="md:flex gap-2 items-center">
                
                    <div className="md:w-5/6">
                    
                        {object.type === "track" && (
                            <div className="md:flex gap-5 items-center">
                                {object.album?.images?.[0]?.url && (
                                    <img 
                                        className="max-w-30 rounded-md h-auto"
                                        src={object.album.images[0].url}
                                        alt={object.name || "Sin nombre"}
                                    ></img>
                                )}
                                <div>
                                    
                                    <p><span className="font-bold">{object.name || "Sin nombre"}</span></p>
                                    <p>{object.artists[0].name || "sin artista"}</p>

                                </div>

                            </div>
                        )}

                        <div className="flex gap-2 items-center">
                        {object.images?.[0]?.url && (
                            <img 
                                className="max-w-30 rounded-md h-auto"
                                src={object.images[0].url}
                                alt={object.name || "Sin nombre"}
                            ></img>
                        )}

                        {object.type === "playlist" && (
                                
                                    
                                    <div>
                                        <p><span className="font-bold">{object.name || "Sin nombre"}</span></p>
                                        <p>{object.description || "Sin descripcion"}</p>
                                    </div>
                                
                        )}


                        {object.type === "album" && (

                                <div>
                                    <p><span className="font-bold"></span>{object.name || "Sin nombre"}</p>
                                    <p><span className="font-bold"></span>{object.release_date || "Sin fecha"}</p>
                                    <p><span className="font-bold"></span>{object.artists[0].name || "Sin artista"}</p>
                                </div>
                            

                        )}


                        {object.type === "artist" && (

                                <div>
                                    <p><span className="font-bold">{object.name || "Sin nombre"}</span></p>
                                    <p><span className="font-bold">Seguidores: </span>{object.followers.total || "No info"}</p>
                                    <p><span className="font-bold">Genero: </span>{object.genres[0] || "Sin genero"}</p>
                                </div>
                           


                        )}
                        </div>
                        </div>

                        <div className="md:w-1/6">
                        
                            <button
                                className="bg-rose-500 hover:bg-rose-950 text-white font-bold rounded-lg px-4 py-2 mt-2"
                                onClick={() => handleRemove(key, object.id)} 
                                >
                                Eliminar
                            </button>

                        </div>
                        

                    
                    
                </div>
                {object.type === "track" && (
                    <div className="pt-2">
                        <Player id={object.id} access_token={token} />
                    </div>
                )}
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
                                    <p className={"text-gray-300 font-[1000]"}>{key.toUpperCase()}</p>
                            </div>

                            <div className="objetos">
                                {renderObjects(key) && favoriteList[key].length > 0 ? (
                                    renderObjects(key)
                                ) : (
                                    <div className="border-2 border-slate-800 bg-gradient-to-r from-indigo-700 via-200% via-teal-500 shadow-xl rounded-md p-2 mb-2">
                                        <p className="text-rose-300 shadow-indigo-900">No hay {key.toUpperCase()} en favoritos</p>
                                    </div>
                                )}
                                
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