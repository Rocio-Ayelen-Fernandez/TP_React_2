import { useTranslation } from "react-i18next";


const Authorization = ({ clientId, redirectUri }) => {
    const { t } = useTranslation();
    const generateRandomString = (length) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    };

    const sha256 = async (plain) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    };

    const base64encode = (input) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    };

    const handleAuthorization = async () => {
        const codeVerifier = generateRandomString(128);
        const hashed = await sha256(codeVerifier);
        const codeChallenge = base64encode(hashed);
      
        const scope = [
          'user-read-email',
          'user-read-private',
          'playlist-read-private',
          'playlist-modify-private',
        ].join(' ');
      
        const authUrl = new URL("https://accounts.spotify.com/authorize");
      
        window.localStorage.setItem('code_verifier', codeVerifier);
      
        const params = {
          response_type: 'code',
          client_id: clientId,
          scope,
          code_challenge_method: 'S256',
          code_challenge: codeChallenge,
          redirect_uri: redirectUri,
        };
      
        authUrl.search = new URLSearchParams(params).toString();
        console.log("Redirecting to:", authUrl.toString());
        window.location.href = authUrl.toString(); // Redirigir al usuario
      };

    return (
        <div className="px-4 py-2 m-6  bg-gradient-to-r from-rose-600 to-violet-600 rounded-lg text-white">
            <button className="font-bold" onClick={handleAuthorization}>{t('authorize')}</button>
        </div>
    );
};

export default Authorization;