const ArtistHeader = ({ artist }) => {
    if (!artist) return null

    return (
        <div className="w-full overflow-hidden relative h-84">
            <div className="absolute w-full inset-0 flex justify-center items-center mask-x-from-90% mask-x-to-97%">
                <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="opacity-80 w-[95%] h-auto max-w-none object-contain"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-color)]"></div>
            <div className="relative z-10 p-4">
                <h1 className="text-[60px] font-bold text-white drop-shadow">{artist.name}</h1>
            </div>
        </div>
    )
}

export default ArtistHeader
