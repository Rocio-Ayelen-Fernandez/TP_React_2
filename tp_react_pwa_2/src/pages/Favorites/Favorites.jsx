import { useEffect, useState } from "react";
import ListFavorite from "../../components/ListFavorite/ListFavorite";
import getUserProfile from "../../services/getUserProfile.js";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const Favorites = () => {
  const { t } = useTranslation();
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const expiration = localStorage.getItem("token_expiration");

  useEffect(() => {
    
    const valid = isTokenValid(token, expiration);

    if (!token && !valid){
      navigate("/Login");
    }else{

      const fetchUserProfile = async () => {
        try {
          const profile = await getUserProfile(token);
          setUserProfile(profile);
        } catch (err) {
          console.error("Error fetching user profile:", err.message);
          setError(err.message);
          setTimeout(navigate("/Error?error=403"), 1000); // Redirige al error
        }
      };
  
      fetchUserProfile();
    }
    
  }, [navigate, t, token, expiration]);

  const isTokenValid = (token, expiration) => {
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

  if (!isTokenValid(token, expiration)) {
    return (
      <div className="text-center text-white mt-10">
        {t("loading")}
      </div>
    );
  }

  return (
    <div className="w-full">
      <Header variant={"favorites"} />
      <div className="flex flex-col md:flex-row p-4 ">
        {/* Lista de favoritos */}
        <div className="md:w-3/4 mr-5 ml-5 order-2 md:order-1">
          <h1 className="text-2xl text-gray-200 font-bold mb-4">
            {t("favorites")}
          </h1>
          {token ? (
            <div
              className="bg-gradient-to-br from-cyan-950 from-10% via-indigo-900 border-2 border-indigo-700 rounded-md p-4 shadow-xl overflow-x-auto max-h-3/4 "
              style={{ maxWidth: "100%", height: "90vh" }}
            >
              <ListFavorite token={token} />
            </div>
          ) : (
            <p className="text-rose-500">{t("loading")}</p>
          )}
        </div>

        {/* Información del usuario */}
        <div className="md:w-1/4 mr-5 ml-5 order-1 md:order-2">
          <h1 className="text-2xl text-gray-200 font-bold mb-4">
            {t("myprofile")}
          </h1>
          {userProfile ? (
            <div className=" backdrop-blur-md bg-none bg-white/5 border border-white/10 shadow-inner rounded-md p-4 justify-center items-center flex flex-col max-h-3/4">
              <div className="max-h-1/2">
                {userProfile.images && userProfile.images[0] && (
                  <div>
                    <img
                      className="max-w-22 rounded-2xl shadow-lg pb-2"
                      src={userProfile.images[0].url}
                      alt="Profile"
                    />
                  </div>
                )}
                <p className="text-gray-200">
                  <span className=" font-[1000] text-2xl">
                    {userProfile.display_name}
                  </span>
                </p>
                <p className="text-gray-200">
                  <span className=" font-[1000]">{t("country")}: </span>
                  {userProfile.country}
                </p>
                <p className="text-gray-200">
                  <span className=" font-[1000]">{t("followers")}: </span>
                  {userProfile.followers.total}
                </p>
              </div>
              <div className="max-h-1/2 py-5">
                <CreatePlaylist token={token} id={userProfile.id} />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <p className="text-rose-500">{t("loading")}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
