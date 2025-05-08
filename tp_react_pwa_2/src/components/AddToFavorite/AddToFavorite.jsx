import { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";

const AddToFavorite = ({ id, type }) => {
  const [favorite, setFavorite] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorite");
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      setFavorite(parsedFavorites);

 
      if (parsedFavorites[type]?.some((item) => item.id === id)) {
        setIsFavorite(true);
      }
    }
  }, [id, type]);

  const handleAddToFavorites = () => {
    if (id && type) {
      const updatedFavorites = { ...favorite };

      if (!updatedFavorites[type]) {
        updatedFavorites[type] = [];
      }

      // Si no está el mismo id en el array de favoritos, lo agrega
      if (!updatedFavorites[type].some((item) => item.id === id)) {
        updatedFavorites[type].push({ id });
        setIsFavorite(true); 
      } else {
     
        updatedFavorites[type] = updatedFavorites[type].filter(
          (item) => item.id !== id
        );
        setIsFavorite(false);
      }

      localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
      setFavorite(updatedFavorites);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full">
      <div className={`justify-center items-center flex flex-row w-15 h-15 rounded-lg text-white ${
          isFavorite
            ? "bg-gradient-to-l from-pink-400 to-violet-600 hover:from-red-500 hover:to-pink-500"
            : "bg-gradient-to-r from-green-500 to-violet-600 hover:from-purple-400 hover:to-violet-500"
        }`}
      >

      
        <Button
        
        children={<svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? "white" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="2.2"
            stroke="currentColor"
            className="size-10 cursor-pointer "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>}

          onClick={handleAddToFavorites}
        
        />
        {/* <button onClick={handleAddToFavorites}>
          
        </button> */}
      </div>
    </div>
  );
};

export default AddToFavorite;