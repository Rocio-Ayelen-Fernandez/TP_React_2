import SearchInput from "../SearchInput/SearchInput";
import AddToFavorite from "../AddToFavorite/AddToFavorite";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { FaHome } from "react-icons/fa";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import NavigateToFavorite from "../NavigateToFavorite/NavigateToFavorite";

const Header = ({ variant, onSearch }) => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const isHome = variant === "home";
  const isDetails = variant === "details";
  const isFavorites = variant === "favorites";
  const navigate = useNavigate();

  return (
    <header className="flex items-center m-0 justify-between px-8 py-3 text-white shadow-md h-24 w-full bg-white/3 backdrop-blur-md ">
      <div className="flex items-center">
        {(isDetails || isFavorites) && (
          <Button
            onClick={() => navigate("/Home")}
            className="text-gray-500 cursor-pointer hover:text-white transition-colors duration-200"
          >
            <FaHome className="text-4xl text-white" />
          </Button>
        )}
      </div>

      <div className="flex-1 flex justify-center">
        {isHome && (
          <div className="flex items-center">
            <div className="absolute left-4">
            <NavigateToFavorite/>
            </div>

            <div className="flex-1 flex justify-center">
              <SearchInput onSearch={onSearch} />
            </div>
          </div>
        )}

        {isDetails && (
          <div className="flex items-center gap-6">
            <AddToFavorite id={id} type={type} />
            <NavigateToFavorite/>
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
