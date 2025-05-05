import { useEffect, useState } from "react"



const AddToFavorite = ({ id, type }) => {
    
    const [favorite, setFavorite] = useState({})
    const [message, setMessage] = useState("")

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
                setMessage("Añadido a favoritos")
              }else {
                setMessage("Ya existe en favoritos")
              }
      
            // Actualiza el localStorage y el estado
            localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
            setFavorite(updatedFavorites);
            console.log("Updated favorite:", updatedFavorites);
          }
        
    }

    useEffect(() => {

        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 5000)

            return () => clearTimeout(timer)
        }

    },[message])
    
    
    return (

        <div className="relative flex flex-col justify-center items-center w-full h-full">

            <div className="justify-center items-center flex flex-row w-20 h-20 bg-gradient-to-r from-rose-600 to-violet-600 rounded-lg text-white">
                <button onClick={handleAddToFavorites}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>    
                </button>         
            </div>

            {message && (
                <div className="mt-4 bg-gradient-to-t from-green-500 to-transparent text-white p-2 rounded-md shadow-md">
                    {message}
                </div>
            )}
            
        </div>
    )

}

export default AddToFavorite