import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ArtistHeader from "../ArtistHeader/ArtistHeader";
import AlbumList from "../AlbumList/AlbumList";
import useCachedFetch from "../../services/useCachedFetch";
import getArtistById from "../../services/getArtistById";
import getTopTracksByArtist from "../../services/getTopTracksByArtist";

const ArtistDetails = ({ artistId }) => {
  const { fetchData } = useCachedFetch();
  const { t } = useTranslation();

  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        setIsLoading(true);

        // Fetch artist details from cache or API
        const artistData = await fetchData("artist", artistId, () =>
          getArtistById(localStorage.getItem("access_token"), artistId)
        );
        setArtist(artistData);

        // Fetch albums directly from API
        const albumsData = await fetchAlbums(artistId);
        setAlbums(albumsData);

        // Fetch top tracks directly from API
        const topTracksData = await getTopTracksByArtist(localStorage.getItem("access_token"), artistId);
        setTopTracks(topTracksData);
      } catch (error) {
        console.error("Error fetching artist details:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistDetails();
  }, [artistId, fetchData]);

  const fetchAlbums = async (id) => {
    let allAlbums = [];
    let url = `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single,compilation&limit=50`;

    while (url) {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      const data = await res.json();
      allAlbums = [...allAlbums, ...data.items];
      url = data.next;
    }

    return allAlbums;
  };

  const albumsByType = Array.isArray(albums)
    ? albums.reduce((acc, album) => {
        const type = album.album_group || album.album_type;
        if (!acc[type]) acc[type] = [];
        acc[type].push(album);
        return acc;
      }, {})
    : {};

  if (isLoading) {
    return (
      <p className="text-white text-center mt-10">
        {t("Cargando artista...")}
      </p>
    );
  }

  return (
    <div className="relative mt-2">
      <div className="fixed inset-0 -z-10">
        <img
          src={artist.images?.[0]?.url}
          alt={artist.name}
          className="w-full h-full object-cover blur-sm scale-105 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-800/40 to-indigo-900/70 mix-blend-multiply" />
      </div>

      <div className="relative max-w-[80%] mx-auto backdrop-blur-sm bg-white/5 rounded-xl p-4">
        <ArtistHeader artist={artist} topTracks={topTracks} />

        {albumsByType.album && (
          <AlbumList title={t("Álbumes")} albums={albumsByType.album} />
        )}
        {albumsByType.single && (
          <AlbumList title={t("Singles")} albums={albumsByType.single} />
        )}
        {albumsByType.compilation && (
          <AlbumList
            title={t("Compilaciones")}
            albums={albumsByType.compilation}
          />
        )}
      </div>
    </div>
  );
};

export default ArtistDetails;