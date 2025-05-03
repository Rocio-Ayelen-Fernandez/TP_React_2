import { useEffect } from "react";
import { useNavigate } from "react-router";
import Authorization from "../../components/Authorization/Authorization";

const Login = () => {

    
  const clientId = "5c271aa13f7641f8b283fae8ab5c8f70";
  const redirectUri = "http://127.0.0.1:5173/login";
      
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Inicia sesión con Spotify</h1>
      <p className="text-lg">Por favor, autoriza tu cuenta para continuar.</p>
      <Authorization clientId={clientId} redirectUri={redirectUri} />
    </div>
  );
};

export default Login;