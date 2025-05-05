import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import ArtistHeader from "../ArtistHeader/ArtistHeader"
import AlbumList from "../AlbumList/AlbumList"
import TrackList from "../TrackList/TrackList"

const ArtistDetails = ({ artistId }) => {
    const [artist, setArtist] = useState(null)
    const [access_token, setAccessToken] = useState("")
    const [albums, setAlbums] = useState([])
    const [selectedAlbum, setSelectedAlbum] = useState(null)
    const [tracks, setTracks] = useState([])
    const [isFollowing, setIsFollowing] = useState(null)

    const { t } = useTranslation()

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (token) {
            setAccessToken(token)
        }
    }, [])

    useEffect(() => {
        if (access_token && artistId) {
            getArtistById(artistId)
        }
    }, [access_token, artistId])

    const getArtistById = async (id) => {
        try {
            const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
                headers: { Authorization: `Bearer ${access_token}` },
            })
            const data = await res.json()
            setArtist(data)
            getAlbumsByArtist(id)
            checkIfFollowing(id)
        } catch (err) {
            console.error(t("Error al obtener al artista"), err)
        }
    }

    const getAlbumsByArtist = async (id) => {
        try {
            let albums = []
            let url = `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`

            while (url) {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${access_token}` },
                })
                const data = await res.json()
                albums = [...albums, ...data.items]
                url = data.next // Paginación
            }

            setAlbums(albums)
        } catch (err) {
            console.error(t("Error al obtener los álbumes"), err)
        }
    }

    const getAlbumTracks = async (albumId) => {
        try {
            const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
                headers: { Authorization: `Bearer ${access_token}` },
            })
            const data = await res.json()
            setTracks(data.items)
        } catch (err) {
            console.error(t("Error al obtener las canciones"), err)
        }
    }

    const handleAlbumClick = (id) => {
        if (selectedAlbum === id) {
            setSelectedAlbum(null)
            setTracks([])
        } else {
            setSelectedAlbum(id)
            getAlbumTracks(id)
        }
    }

    const toggleFollowArtist = async () => {
        if (!artist || !access_token) return

        const method = isFollowing ? "DELETE" : "PUT"
        const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artist.id}`

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })

            if (res.status === 204) {
                setIsFollowing(!isFollowing)
            } else {
                alert(t("No se pudo actualizar el estado de seguimiento."))
            }
        } catch (err) {
            console.error(t("Error al actualizar el seguimiento del artista:"), err)
        }
    }

    const checkIfFollowing = async (artistId) => {
        try {
            const res = await fetch(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            const data = await res.json()
            setIsFollowing(data[0]) // true o false
        } catch (err) {
            console.error(t("Error al comprobar si sigue al artista:"), err)
        }
    }

    const albumsByType = albums.reduce((acc, album) => {
        const type = album.album_group || album.album_type
        if (!acc[type]) acc[type] = []
        acc[type].push(album)
        return acc
    }, {})

    return (
        <div>

            {!artist ? (
                <p className="text-white text-center mt-10">{t("Cargando artista...")}</p>
            ) : (
                <>
                    <ArtistHeader
                        artist={artist}
                        onFollowToggle={toggleFollowArtist}
                        isFollowing={isFollowing}
                    />
                    {albumsByType.album && (
                        <AlbumList
                            albums={albumsByType.album}
                            selectedAlbum={selectedAlbum}
                            onAlbumClick={handleAlbumClick}
                            title={t("Álbumes")}
                        />
                    )}
                    {albumsByType.single && (
                        <AlbumList
                            albums={albumsByType.single}
                            selectedAlbum={selectedAlbum}
                            onAlbumClick={handleAlbumClick}
                            title={t("Singles")}
                        />
                    )}
                    {albumsByType.compilation && (
                        <AlbumList
                            albums={albumsByType.compilation}
                            selectedAlbum={selectedAlbum}
                            onAlbumClick={handleAlbumClick}
                            title={t("Compilaciones")}
                        />
                    )}
                    {selectedAlbum && tracks.length > 0 && <TrackList tracks={tracks} />}
                </>
            )}
        </div>
    )
}

export default ArtistDetails
