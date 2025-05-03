import { ROUTES } from "../../const/routes.js";
import ArtistHeader from "../../components/ArtistHeader/ArtistHeader.jsx";
import AddToFavorite from "../../components/AddToFavorite/AddToFavorite";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

const Details = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  const [artist, setArtist] = useState(null);
  const [access_token, setAccessToken] = useState("");

  const navigate = useNavigate();
  const isTokenValid = () => {
    const token = localStorage.getItem("access_token");
    const expiration = localStorage.getItem("token_expiration");
 
    if (!token || !expiration) {
      return false;
    }
  
    const expirationTime = parseInt(expiration, 10);
  
    if (isNaN(expirationTime)) {
      return false;
    }
  
    if (Date.now() > expirationTime) {
      return false;
    }
    return true;
  };
  
  useEffect(() => {
    const valid = isTokenValid();
    if (valid) {
      setAccessToken(localStorage.getItem("access_token"));
    } else {
      navigate("/Login");
    }
  }, [navigate]);



  useEffect(() => {
    if (access_token && type === "artist") {
      getArtist();
    }
  }, [access_token, type]);

  const getArtist = async () => {
    const artistName = "Stray Kids"; // hardcodeado, iría el id
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          artistName
        )}&type=artist`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      const data = await res.json();
      if (data.artists.items.length > 0) {
        const found = data.artists.items[0];
        setArtist(found);
      } else {
        console.log("Artista no encontrado");
      }
    } catch (err) {
      console.error("Error al obtener al artista", err);
    }
  };
  return (
      <div>
        <AddToFavorite type={type} id={id}/>
        {type === "artist" && artist && <ArtistHeader artist={artist} />}
      </div>
  );
};
export default Details;
