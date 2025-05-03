import { useEffect, useState } from "react";
import ListFavorite from "../../components/ListFavorite/ListFavorite";
import getUserProfile from "../../services/getUserProfile.js";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";

const Favorites = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  // Función para obtener el token desde localStorage
  useEffect(() => {

  // localStorage.setItem(
  //     "favorite",
  //     JSON.stringify({
  //         "track": [
  //             { "id": "11dFghVXANMlKmJXsNCbNl", "name": "Track 1" }
  //         ],
  //         "album": [
  //             { "id": "4aawyAB9vmqN3uQ7FjRGTy", "name": "Album 1" }
  //         ],
  //         "playlist": [
  //             { "id": "3cEYpjA9oz9GiPac4AsH4n", "name": "Playlist 1" }
  //         ],
  //         "artist": [
  //             { "id": "0TnOYISbd1XYRBk9myaseg", "name": "Artist 1" }
  //         ]
  //     })
  // );


    const storedToken = localStorage.getItem("access_token");
    if (!storedToken) {
      setError("Access token is missing.");
    } else {
      setToken(storedToken)
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile(token);
        setUserProfile(profile);
        
      } catch (err) {
        console.error("Error fetching user profile:", err.message);
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, [token]);

  return (
    <div className="max-w-full  p-4">
      <div className="flex flex-row w-xl">
        {/* Lista de favoritos */}
        <div className="mr-10 ml-4">
          <h1 className="text-2xl font-bold mb-4">Mis Favoritos</h1>
          {token ? (
            <div>
              <ListFavorite token={token} />
            </div>
          ) : (
            <p className="text-red-500">Cargando token...</p>
          )}
        </div>

        {/* Información del usuario */}
        <div className="mr-4 ml-10">
          <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
          {userProfile ? (
            <div>
              
                
                  {userProfile.images && userProfile.images[0] && (
                    <div>
                      <img
                        className="max-w-30 rounded-full"
                        src={userProfile.images[0].url}
                        alt="Profile"
                      />
                    </div>
                  )}
                  <p>
                    <span className="font-[1000]">Nombre: </span>
                    {userProfile.display_name}
                  </p>

                  <div className="p-5">
                    <CreatePlaylist token={token} id={userProfile.id}/>
                  </div>
              
            </div>
          ) : (
            <p className="text-red-500">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;