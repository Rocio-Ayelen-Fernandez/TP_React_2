import { useEffect, useState } from "react"
import style from "./AddToFavorite.module.css"



const AddToFav = ({ id, type }) => {
    
    const [favorites, setFavorites] = useState({})

    //Carga el localStorage al iniciar el componente
    // y lo guarda en el estado de favoritos
    useEffect (() => {

        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites))
        } else {
            setFavorites({})
        }

    },[])

    //
    const handleAddToFavorites = () => {

        if (id && type) {
            
            const updatedFavorites = { ...favorites };
      
            //Si no existe el tipo en el objeto de favoritos, lo crea
            if (!updatedFavorites[type]) {
              updatedFavorites[type] = [];
            }
      
            //Si no esta el mismo id en el array de favoritos, lo agrega
            if (!updatedFavorites[type].includes(id)) {
              updatedFavorites[type].push(id);
            }
      
            // Actualiza el localStorage y el estado
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
            console.log("Updated favorites:", updatedFavorites);
          }
        
        
    }
    
    
    return (
        <div className={style.container}>
            <button onClick={handleAddToFavorites}>&lt;3</button>         
        </div>
    )

}

export default AddToFav