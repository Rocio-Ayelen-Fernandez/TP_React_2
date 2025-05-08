// ... imports
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import ArtistHeader from "../ArtistHeader/ArtistHeader";
import AlbumList from "../AlbumList/AlbumList";
import getArtistById from "../../services/getArtistById";
import getTopTracksByArtist from "../../services/getTopTracksByArtist";

const ArtistDetails = ({ artistId }) => {
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [isFollowing, setIsFollowing] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const { t } = useTranslation();

// useEffect para obtener el token de acceso desde localStorage al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token || !artistId) return;

    const fetchData = async () => {
      
      try {
        const artistData = await getArtistById(token, artistId);
        setArtist(artistData);
        await Promise.all([
          fetchAlbums(artistId, token),
          fetchTopTracks(artistData.id, token),
          checkIfFollowing(artistId, token),
        ]);
      } catch (error) {
        console.error(t("Error al obtener datos del artista:"), error);
        navigate("/Error404");
      }
    };

    fetchData();
  }, [navigate, artistId, t]);

  const fetchTopTracks = async (id, token) => {
    try {
      const tracks = await getTopTracksByArtist(token, id);
      setTopTracks(tracks);
    } catch (error) {
      console.error(t("Error al obtener las canciones populares:"), error);
    }
  };

  const fetchAlbums = async (id, token) => {
    try {
      let allAlbums = [];
      let url = `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single,compilation&limit=50`;

      while (url) {

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        allAlbums = [...allAlbums, ...data.items];
        url = data.next;
      }

      setAlbums(allAlbums);
    } catch (err) {
      console.error(t("Error al obtener los álbumes:"), err);
    }
  };

  const checkIfFollowing = async (id, token) => {
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setIsFollowing(data[0]);
    } catch (err) {
      console.error(t("Error al comprobar seguimiento:"), err);
    }
  };

  const toggleFollowArtist = async () => {
    const token = localStorage.getItem("access_token");
    if (!artist || !token) return;

    const method = isFollowing ? "DELETE" : "PUT";
    const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artist.id}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        setIsFollowing(!isFollowing);
      } else {
        alert(t("No se pudo actualizar el estado de seguimiento."));
      }
    } catch (err) {
      console.error(t("Error al cambiar el seguimiento:"), err);
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

      <div className="relative max-w-[80%] mx-auto backdrop-blur-sm bg-white/5 rounded-xl p-4">
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
