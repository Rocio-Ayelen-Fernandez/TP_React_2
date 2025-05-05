import SearchInput from '../SearchInput/SearchInput';
import AddToFavorite from '../AddToFavorite/AddToFavorite';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { House } from 'lucide-react';
import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";

const Header = ({ variant }) => {
  const isHome = variant === 'home';
  const isDetails = variant === 'details';
  const isFavorites = variant === 'favorites';
const navigate = useNavigate();
  return (
<header className="flex items-center m-0 justify-between px-8 py-3 text-white shadow-md h-24 w-full bg-white/3 backdrop-blur-md ">
      
      <div className="flex items-center">
        {(isDetails || isFavorites) && (
          <Button 
          onClick={() => navigate("/Home")}
          className="text-gray-500 cursor-pointer hover:text-white transition-colors duration-200"
        >
          <House size={32} color='white' />
        </Button>
          
        )}
      </div>

      <div className="flex-1 flex justify-center">
        {isHome && (
          <SearchInput />
        )}

        {isDetails && (
          <div className="flex items-center gap-6">
            <AddToFavorite id="ejemplo-id" type="juego" />
          </div>
        )}
      </div>

      <div className="flex items-center text-xl">
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
