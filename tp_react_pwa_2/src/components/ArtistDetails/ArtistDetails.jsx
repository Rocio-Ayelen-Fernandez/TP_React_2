// ... imports
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import ArtistHeader from "../ArtistHeader/ArtistHeader";
import AlbumList from "../AlbumList/AlbumList";
import getArtistById from "../../services/getArtistById";
import getTopTracksByArtist from "../../services/getTopTracksByArtist";
import { checkIfFollowingArtist, toggleFollowArtist as toggleFollowArtistService } from "../../services/followArtistService";
import getAlbumsByArtistId from "../../services/getAlbumByArtistId";

const ArtistDetails = ({ artistId }) => {
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [isFollowing, setIsFollowing] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token || !artistId) return;
    const fetchData = async () => {
      try {
        const artistData = await getArtistById(token, artistId);
        setArtist(artistData);

        const [albumsData, tracksData, followingStatus] = await Promise.all([
          getAlbumsByArtistId(token, artistId),
          getTopTracksByArtist(token, artistId),
          checkIfFollowingArtist(artistId, token),
        ]);

        setAlbums(albumsData);
        setTopTracks(tracksData);
        setIsFollowing(followingStatus);
      } catch (error) {
        console.error(t("Error al obtener datos del artista:"), error);
        navigate("/Error?error=404");
      }
    };

    fetchData();
  }, [navigate, artistId, t]);

  const toggleFollowArtist = async () => {
    const token = localStorage.getItem("access_token");
    if (!artist || !token) return;

    try {
      await toggleFollowArtistService(artist.id, token, isFollowing);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(t("Error al seguir o dejar de seguir al artista:"), error);
    }
  };

  const albumsByType = albums.reduce((acc, album) => {
    const type = album.album_group || album.album_type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(album);
    return acc;
  }, {});

  if (!artist) {
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

      <div className="relative w-full md:max-w-[80%] mx-auto md:backdrop-blur-sm md:bg-white/5 md:rounded-xl p-4">
        <ArtistHeader
          artist={artist}
          topTracks={topTracks}
          onFollowToggle={toggleFollowArtist}
          isFollowing={isFollowing}
        />

        {albumsByType.album && (
          <AlbumList title={t("Albums")} albums={albumsByType.album} />
        )}
        {albumsByType.single && (
          <AlbumList title={t("Singles")} albums={albumsByType.single} />
        )}
        {albumsByType.compilation && (
          <AlbumList title={t("Compilations")} albums={albumsByType.compilation} />
        )}
      </div>
    </div>
  );
};

export default ArtistDetails;
