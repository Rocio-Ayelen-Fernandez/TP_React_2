const TrackPlayer = (track) => {


    return(

        <div className="flex flex-col items-center gap-8">

            <div className="image">
                <img src={track.image} alt={track.name} className="w-1/2 h-1/2 rounded-full"/>
            </div>
            <div className="name">
                <h1 className="text-2xl font-bold">{track.name}</h1>
            </div>
            <div className="artist">
                <h2 className="text-xl font-semibold">{track.artist}</h2>
            </div>

            <div className="player">

            </div>

        </div>



    )


}