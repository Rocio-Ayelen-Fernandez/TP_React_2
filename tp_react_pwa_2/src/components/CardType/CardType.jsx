
import { useNavigate } from "react-router";
import { ROUTES } from "../../const/routes";
import { useEffect } from "react";
const CardType = ({ name, artist, image, type, id, onClick }) => {

  const navigate = useNavigate();
  const onClickNavigateToDetails = () => {
    navigate(`${ROUTES.details}?type=${type}&id=${id}`);
  }
  
    return (
      <div
      onClick={onClickNavigateToDetails}
      className="relative rounded-xl overflow-hidden cursor-pointer shadow-md w-32 group" 
    >
        <img src={image} alt={name} className="w-full h-full object-cover"/>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/50 text-white p-2 flex flex-col items-center justify-center transition duration-300 group-hover:bg-black/40 group-hover:scale-105">
        <p className="text-base md:text-sm font-semibold text-center">{name}</p>
        {artist && <p className="text-base text-gray-300">{artist}</p>}
      </div>

      </div>
    );
  };
  
  export default CardType;
  