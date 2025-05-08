import { useEffect } from "react";
import { useNavigate } from "react-router";
import Authorization from "../../components/Authorization/Authorization";
import logo from "../../assets/img/logo.svg";

const Login = () => {

    

  // 2c33d57b71d945cd8af77809beddbdce (Cuenta OurApp)
  // email: spotifyapiapp.2025@gmail.com
  // password: SpotifyApp2025
  const clientId = "2c33d57b71d945cd8af77809beddbdce";
  const redirectUri = window.location.origin + "/login";
      
  const navigate = useNavigate();

  const getToken = async (authorizationCode) => {
    const codeVerifier = localStorage.getItem("code_verifier");
    if (!codeVerifier) {
      console.error("Code verifier not found in localStorage.");
      return;
    }
  
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };
  
    try {
      const response = await fetch(url, payload);
      if (!response.ok) {
        throw new Error("Error fetching token: " + response.statusText);
      }
      const data = await response.json();
      console.log("Token data:", data);
  
      // Guardar el token en localStorage
      localStorage.setItem("access_token", data.access_token);
      console.log("Access token saved:", data.access_token);
  
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
        console.log("Refresh token saved:", data.refresh_token);
      }
      if (data.expires_in) {
        const expirationTime = Date.now() + data.expires_in * 1000;
        localStorage.setItem("token_expiration", expirationTime.toString());
        console.log("Token expiration saved:", expirationTime);
      }
  
      // Redirigir al Home
      navigate("/Home");
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };
  
  useEffect(() => {
    const captureAuthorizationCode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");
  
      if (authorizationCode) {
        console.log("Authorization code:", authorizationCode);
  
        localStorage.setItem("authorization_code", authorizationCode);
  
        getToken(authorizationCode);
  
        // Limpiar la URL
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      } else {
        console.log("Authorization code not found in URL.");
      }
    };
  
    // Agrega un retraso para capturar el código
    setTimeout(captureAuthorizationCode, 500);
  }, [navigate]);


  return (
    <div className="h-screen flex flex-col p-5 items-center justify-center gap-5">
      <img className="h-40 pulse" src={logo} alt="Lily_logo"/>
      <div>
        <h1 className="text-gray-200 text-2xl font-bold mb-4 text-center">Inicia sesión con Spotify</h1>
        <p className=" text-gray-200 text-lg text-center">Por favor, autoriza tu cuenta para continuar.</p>
      </div>
      <Authorization clientId={clientId} redirectUri={redirectUri} />
    </div>
  );
};

export default Login;