import React, { useState }  from "react";
import { useTranslation } from "react-i18next";

const SearchInput = ({ onSearch }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onSearch(searchTerm);
        }

    }

    return(

        <div>

            <input 
                className="border-2 border-white/10 hover:border-white/30 rounded-xl p-2 md:w-xl "
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t("search")}
            />
            {/* <button onClick={() => onSearch(searchTerm)}>Search</button> */}

        </div>
    )
}

export default SearchInput;