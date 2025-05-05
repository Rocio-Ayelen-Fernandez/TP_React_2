import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import ListFavorite from '../ListFavorite/ListFavorite';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { ROUTES } from '../../const/routes';
import { House, Heart } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const showSearch = path === ROUTES.home;
  const showFavorites = path === ROUTES.details;
  const showHomeButton = path === ROUTES.details || path === ROUTES.favorites;

  return (
    <header className="flex items-center justify-between px-8 py-3 bg-neutral-900 text-white shadow-md h-24 w-full">
      <div className="flex items-center">
        {showHomeButton && (
          <House
            onClick={() => navigate(ROUTES.home)}
            size={32}
            className="text-gray-500 cursor-pointer hover:text-white transition-colors duration-200"
          />
        )}
      </div>

      <div className="flex-1 flex justify-center">
        {showSearch && <SearchBar />}
        {showFavorites && (
          <div className="relative flex items-center justify-center">
            <Heart className="text-violet-600 mr-2" size={32} />
            <div className="absolute top-1 left-1">
              <ListFavorite />
            </div>
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
