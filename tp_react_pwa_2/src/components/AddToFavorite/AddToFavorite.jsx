import { useEffect, useState } from "react"
import style from "./AddToFavorite.module.css"



const AddToFav = (id) => {
    
    const [favorites, setFavorites] = useState([])

    useEffect (() => {

        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites))
        } else {
            setFavorites([])
        }

    },[])

    // useEffect(() =>{
    //     console.log(id);
    // },[id])

    const handleAddToFavorites = (id) => {

        if(id){
            const updatedFavorites = [...favorites, id]
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
            setFavorites([...favorites, id])

            console.log(localStorage.getItem("favorites",[id]));
        }
        
        
    }
    
    
    return (
        <div className={style.container}>
            <button onClick={() => handleAddToFavorites(id)}></button>         
        </div>
    )

}

export default AddToFav