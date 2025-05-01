const CardType = ({ name, artist, image,id, onClick }) => {
    return (
      <div
      onClick={() => onClick(id)}
      className="relative rounded-xl overflow-hidden cursor-pointer shadow-md w-48 group" 
    >
        <img src={image} alt={name} />
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/50 text-white p-2 flex flex-col items-center justify-center transition duration-300 group-hover:bg-black/40 group-hover:scale-105">
        <p className="text-lg font-semibold">{name}</p>
        {artist && <p className="text-base text-gray-300">{artist}</p>}
      </div>

      </div>
    );
  };
  
  export default CardType;
  