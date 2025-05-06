import { useNavigate } from "react-router";
import { ROUTES } from "../../const/routes";

const AlbumCard = ({ album }) => {
<<<<<<< HEAD
      const navigate = useNavigate();
      const onClickNavigateToDetails = () => {
        navigate(`${ROUTES.details}?type=${album.album_type}&id=${album.id}`);
      }
    return (
         <div
        className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-pointer w-full md:w-auto text-white border border-white/10 hover:border-white/30 flex flex-row sm:flex-col items-center sm:items-stretch"
        onClick={onClickNavigateToDetails}
    >
        {album.images?.[0]?.url && (
            <div className="relative w-auto h-20 md:w-full sm:h-48 flex-shrink-0">
                <img
                    src={album.images[0].url}
                    alt={album.name}
                    className="w-full h-full object-cover rounded-xl mb-0 sm:mb-3"
                />
                <div className="absolute inset-0 rounded-xl bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200" />
            </div>
        )}
        <div className="ml-4 sm:ml-0 mt-2 text-sm font-semibold leading-tight sm:text-center text-left sm:h-auto break-words">
            {album.name}
        </div>
    </div>
    )
}
=======
  const navigate = useNavigate();
  const onClickNavigateToDetails = () => {
    navigate(`${ROUTES.details}?type=${album.album_type}&id=${album.id}`);
  };
  return (
    <div
      className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-pointer w-full md:w-auto text-white border border-white/10 hover:border-white/30 flex flex-row sm:flex-col items-center sm:items-stretch"
      onClick={onClickNavigateToDetails}
    >
      {album.images?.[0]?.url && (
        <div className="relative w-auto h-20 md:w-full sm:h-48 flex-shrink-0">
          <img
            src={album.images[0].url}
            alt={album.name}
            className="w-full h-full object-cover rounded-xl mb-0 sm:mb-3"
          />
          <div className="absolute inset-0 rounded-xl bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200" />
        </div>
      )}
      <div className="ml-4 sm:ml-0 mt-2 text-sm font-semibold leading-tight sm:text-center text-left sm:h-auto break-words">
        {album.name}
      </div>
    </div>
  );
};
>>>>>>> main

export default AlbumCard