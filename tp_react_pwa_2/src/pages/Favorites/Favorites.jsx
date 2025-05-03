import { useEffect, useState } from "react";
import ListFavorite from "../../components/ListFavorite/ListFavorite";
import getUserProfile from "../../services/getUserProfile.js";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState(null);


    const navigate = useNavigate();
    const isTokenValid = () => {
      const token = localStorage.getItem("access_token");
      const expiration = localStorage.getItem("token_expiration");
   
      if (!token || !expiration) {
        return false;
      }
    
      const expirationTime = parseInt(expiration, 10);
    
      if (isNaN(expirationTime)) {
        return false;
      }
    
      if (Date.now() > expirationTime) {
        return false;
      }
      return true;
    };
    
    useEffect(() => {
      const valid = isTokenValid();
      if (valid) {
        setToken(localStorage.getItem("access_token"));
      } else {
        navigate("/Login");
      }
    }, [navigate]);
  

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
    <div className="w-full bg-linear-to-b from-gray-900 to-indigo-950">
      <div className="flex flex-row p-4">
        {/* Lista de favoritos */}
        <div className="w-4/5 mr-5 ml-5">
          <h1 className="text-2xl text-gray-200 font-bold mb-4">Mis Favoritos</h1>
          {token ? (
            <div
            className="bg-gradient-to-br from-cyan-950 from-10% via-indigo-900 border-2 border-indigo-700 rounded-md p-4 shadow-xl overflow-x-auto "
            style={{ maxWidth: "100%", height: "89.2vh" }} 
          >
            <ListFavorite token={token} />
          </div>
          ) : (
            <p className="text-rose-500">Cargando token...</p>
          )}
        </div>

        {/* Información del usuario */}
        <div className="w-1/5 mr-5 ml-5">
          <h1 className="text-2xl text-gray-200 font-bold mb-4">Mi Perfil</h1>
          {userProfile ? (
            <div className="border-2 border-indigo-700 bg-gradient-to-br from-cyan-950 via-70% via-indigo-900 rounded-md p-4 shadow-md">
              
                
                  {userProfile.images && userProfile.images[0] && (
                    <div>
                      <img
                        className="max-w-30 rounded-full shadow-md"
                        src={userProfile.images[0].url}
                        alt="Profile"
                      />
                    </div>
                  )}
                  <p className="text-gray-200">
                    <span className=" font-[1000]">Nombre: </span>
                    {userProfile.display_name}
                  </p>
                  <p className="text-gray-200">
                    <span className=" font-[1000]">Pais: </span>
                    {userProfile.country}
                  </p>
                  <p className="text-gray-200">
                    <span className=" font-[1000]">Seguidores: </span>
                    {userProfile.followers.total}
                  </p>

                  <div className="p-5">
                    <CreatePlaylist token={token} id={userProfile.id}/>
                  </div>
              
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <p className="text-rose-500">Loading...</p>
            </div>
         
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;