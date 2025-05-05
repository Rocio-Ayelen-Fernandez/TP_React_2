
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
      className="rmb-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-pointer w-full md:w-48 sm:w-48 text-white border border-white/10 hover:border-white/30 flex flex-row sm:flex-col items-center sm:items-stretch" 
    >
        <img src={image} alt={name} className="w-full h-full object-cover rounded-xl mb-0 sm:mb-3"/>
        <div className="ml-4 sm:ml-0 mt-2 text-sm font-semibold leading-tight sm:text-center text-left sm:h-auto break-words">
        <p className="text-base md:text-sm font-semibold text-center">{name}</p>
        {artist && <p className="text-base text-gray-300 font-medium">{artist}</p>}
      </div>

      </div>
    );
  };
  
  export default CardType;
  