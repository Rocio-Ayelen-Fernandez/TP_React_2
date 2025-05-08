import { ROUTES } from "../../const/routes.js";
import ArtistDetails from '../../components/ArtistDetails/ArtistDetails';
import AlbumDetails from '../../components/AlbumDetails/AlbumDetails'
import TrackDetails from "../../components/TrackDetails/TrackDetails.jsx";
import PlaylistDetails from "../../components/PlaylistDetails/PlaylistDetails.jsx";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.jsx"
import Footer from "../../components/Footer/Footer.jsx";

const Details = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");

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
    const validTypes = ["artist", "album", "single", "compilation", "track", "playlist"];
    if (!validTypes.includes(type)) {
      navigate("/Error404");
    }
  }, [type, navigate]);


  return (
      <div>
         <Header variant={"details"}/>
        {type === "artist" && <ArtistDetails artistId={id} />}
        {(type === "album" || type === "single" || type === "compilation") && <AlbumDetails albumId={id} />}
        {type === "track" && <TrackDetails trackId={id} />}
        {type === "playlist" && <PlaylistDetails playlistId={id} />}
        <Footer/>

      </div>
  );
};
export default Details;
