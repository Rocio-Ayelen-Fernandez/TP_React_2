const TrackList = ({ tracks }) => (
    <div className="mt-8 w-[70%] text-black rounded p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-white">Canciones del álbum</h3>
            {tracks.map(track => (
                <iframe
                    src={`https://open.spotify.com/embed/track/${track.id}`}
                    width="100%"
                    height="80"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded"
                ></iframe>
            ))}
    </div>
)

export default TrackList
