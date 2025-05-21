import { FaGithub, FaSpotify } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () =>{
    const { t } = useTranslation();
    return(
        <footer className="bg-gradient-to-t from-slate-950 to-indigo-950 text-gray-300 p-6 mt-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row sm:justify-start md:justify-between items-center space-y-4 md:space-y-0 gap-x-1 ">
          {/* Cuentas de Github */}
          <div className="flex flex-col text-sm space-y-2 items-start ">
            <span className="font-semibold text-white ">{t("Github_Profiles")}</span>
            <a href="https://github.com/Rocio-Ayelen-Fernandez" target="_blank" className="flex items-center gap-x-1 transition-transform hover:scale-105 hover:brightness-125">
            <FaGithub />rocio-fernandez
            </a>
            <a href="https://github.com/briabril" target="_blank"  className="flex items-center gap-x-1 transition-transform hover:scale-105 hover:brightness-125">
            <FaGithub />brisa-celayes
            </a>
            <a href="https://github.com/FlorenciaRusso9606" target="_blank"  className="flex items-center gap-x-1 transition-transform hover:scale-105 hover:brightness-125">
            <FaGithub />florencia-russo
            </a>
          </div>
  
          {/* Links útiles */}
          <div className="flex flex-col text-sm space-y-2 items-start">
            <span className="font-semibold text-white">{t("Useful_Links")}s</span>
            <a href="https://github.com/Rocio-Ayelen-Fernandez/TP_React_2" target="_blank" className="flex items-center gap-x-1 transition-transform hover:scale-105 hover:brightness-125">
            <FaGithub />{t("Proyect_Repository")}
            </a>
            <a href="https://developer.spotify.com/documentation/web-api" target="_blank" className="flex items-center gap-x-1 transition-transform hover:scale-105 hover:brightness-125">
            <FaSpotify />{t("Spotify_Documentation")}
            </a>
            <a href="https://spotify.com" target="_blank"  className="flex items-center gap-x-1 transition-transform hover:scale-105 hover:brightness-125">
            <FaSpotify />{t("Oficial_Spotify_Page")}
            </a>
          </div>
        </div>
      </footer>
    )
}
export default Footer