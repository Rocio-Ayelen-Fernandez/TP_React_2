import React, { useState, useEffect}  from "react";

const SearchInput = ({ onSearch }) => {

    const [searchTerm, setSearchTerm] = useState("");

    return(

        <div>

            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={() => onSearch(searchTerm)}>Search</button>


        </div>

    )


}

export default SearchInput;