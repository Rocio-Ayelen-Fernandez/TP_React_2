const CardGenre = ({ name, image, id, icon, onClick }) => {
  return (
    <div
      onClick={() => onClick(id)}
      className="group mb-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-pointer w-full sm:w-48 text-white border border-white/10 hover:border-white/30 flex flex-row sm:flex-col items-center sm:items-stretch"
    >
      <div className="relative w-20 h-20 sm:w-full sm:h-48 flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition duration-300"
        />
        <div className="absolute inset-0 bg-black/40 transition duration-300 group-hover:bg-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 text-white p-2 flex flex-col items-center justify-center group-hover:scale-105">
          <img src={icon} alt="icon" className="w-14 mb-1" />
          <p className="text-lg font-semibold">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default CardGenre;
