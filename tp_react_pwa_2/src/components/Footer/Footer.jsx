import { FaGithub, FaSpotify } from "react-icons/fa";
const Footer = () =>{
    return(
        <footer className="bg-gradient-to-t from-slate-950 to-indigo-950 text-gray-300 p-6 mt-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 gap-x-1">
          {/* Cuentas de Github */}
          <div className="flex flex-col text-sm space-y-2  items-start ">
            <span className="font-semibold text-white ">Perfiles de Github</span>
            <a href="https://github.com/Rocio-Ayelen-Fernandez" target="_blank" className="flex items-center gap-x-1 transition-transform hover:scale-105 hover:brightness-125">
            <FaGithub />brisa-celayes
            </a>
            <a href="https://github.com/briabril" target="_blank"  className="flex items-center gap-x-1 transition-transform hover:scale-105 hover:brightness-125">
            <FaGithub />rocío-fernandez
            </a>
            <a href="https://github.com/FlorenciaRusso9606" target="_blank"  className="flex items-center gap-x-1 transition-transform hover:scale-105 hover:brightness-125">
            <FaGithub />florencia-russo
            </a>
          </div>
  
          {/* Links útiles */}
          <div className="flex flex-col text-sm space-y-2 text-start">
            <span className="font-semibold text-white">Enlaces útiles</span>
            <a href="https://github.com/Rocio-Ayelen-Fernandez/TP_React_2" target="_blank" className="flex items-center gap-x-1 transition-transform hover:scale-105 hover:brightness-125">
            <FaGithub />Repositorio del Proyecto
            </a>
            <a href="https://developer.spotify.com/documentation/web-api" target="_blank" className="flex items-center gap-x-1 transition-transform hover:scale-105 hover:brightness-125">
            <FaSpotify /> Documentación de Spotify
            </a>
            <a href="https://spotify.com" target="_blank"  className="flex items-center gap-x-1 transition-transform hover:scale-105 hover:brightness-125">
            <FaSpotify /> Página oficial de Spotify
            </a>
          </div>
        </div>
      </footer>
    )
}
export default Footer