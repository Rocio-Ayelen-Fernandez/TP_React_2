import { useState } from "react";
import AlbumCard from "../AlbumCard/AlbumCard";

const AlbumList = ({ albums, title }) => {
<<<<<<< HEAD
    const [expanded, setExpanded] = useState(false);
    const visibleAlbums = expanded ? albums : albums.slice(0, 5);
    return (
        <div className="mt-8 w-full flex flex-col items-center">
            <h2 className="text-xl font-bold mb-6 text-white tracking-wide">{title}</h2>

            <div className="w-[90%] bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-2xl p-6 shadow-inner backdrop-blur-md">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-5">

                    {visibleAlbums.map((album) => (
                        <AlbumCard
                            key={album.id}
                            album={album}
                        />
                    ))}
                </div>
                {albums.length > 5 && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="cursor-pointer px-6 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:from-purple-500 hover:to-indigo-500 transition"
                        >
                            {expanded ? "Mostrar menos" : "Expandir"}
                        </button>
                    </div>
                )}
            </div>
=======
  const [expanded, setExpanded] = useState(false);
  const visibleAlbums = expanded ? albums : albums.slice(0, 5);
  return (
    <div className="mt-8 w-full flex flex-col items-center">
      <h2 className="text-xl font-bold mb-6 text-white tracking-wide">
        {title}
      </h2>

      <div className="w-[90%] bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-2xl p-6 shadow-inner backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-5">
          {visibleAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
>>>>>>> main
        </div>
        {albums.length > 5 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setExpanded(!expanded)}
              className="cursor-pointer px-6 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:from-purple-500 hover:to-indigo-500 transition"
            >
              {expanded ? "Mostrar menos" : "Expandir"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumList;
