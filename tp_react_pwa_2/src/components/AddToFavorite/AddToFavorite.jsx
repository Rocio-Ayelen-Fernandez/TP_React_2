import { useEffect, useState } from "react"
import style from "./AddToFavorite.module.css"



const AddToFavorite = ({ id, type }) => {
    
    const [favorite, setFavorite] = useState({})

    //Carga el localStorage al iniciar el componente
    // y lo guarda en el estado de favoritos
    useEffect (() => {

        const storedFavorites = localStorage.getItem('favorite')
        if (storedFavorites) {
            setFavorite(JSON.parse(storedFavorites))
        } else {
            setFavorite({})
        }

    },[])

    //
    const handleAddToFavorites = () => {

        if (id && type) {
            
            const updatedFavorites = { ...favorite };
      
            //Si no existe el tipo en el objeto de favoritos, lo crea
            if (!updatedFavorites[type]) {
              updatedFavorites[type] = [];
            }
      
            //Si no esta el mismo id en el array de favoritos, lo agrega
            if (!updatedFavorites[type].some((item) => item.id === id)) {
                updatedFavorites[type].push({ id });
              }
      
            // Actualiza el localStorage y el estado
            localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
            setFavorite(updatedFavorites);
            console.log("Updated favorite:", updatedFavorites);
          }
        
        
    }
    
    
    return (
        <div className={style.container}>
            <button onClick={handleAddToFavorites}>&lt;3</button>         
        </div>
    )

}

export default AddToFavorite