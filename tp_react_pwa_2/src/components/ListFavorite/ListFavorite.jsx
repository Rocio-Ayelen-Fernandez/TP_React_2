import { useEffect, useState } from "react";

const ListFavorite = (access_token) => {
    const [favoriteList, setFavoriteList] = useState([]);
    const [error, setError] = useState(null);

    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    // Obtener la lista de favoritos desde localStorage
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorite")) || {};
        console.log(localStorage.getItem("favorite"));

        // Asegurarse de que los datos sean un objeto con las claves esperadas
        if (typeof storedFavorites === "object" && storedFavorites !== null) {
            setFavoriteList(storedFavorites);
        } else {
            setFavoriteList({});
        }
    }, []);

    useEffect(() => {
        console.log("Favorite List:", favoriteList);

        // Asegurarse de que cada categoría sea un array antes de usar .filter()
        setTracks(favoriteList.track || []);
        setAlbums(favoriteList.album || []);
        setPlaylists(favoriteList.playlist || []);
        setArtists(favoriteList.artist || []);
    }, [favoriteList]);

    useEffect(() => {
        console.log("Tracks:", tracks);
        console.log("Albums:", albums);
        console.log("Playlists:", playlists);
        console.log("Artists:", artists);
    }, [tracks, albums, playlists, artists]);

    return <div className="container"></div>;
};  

export default ListFavorite;