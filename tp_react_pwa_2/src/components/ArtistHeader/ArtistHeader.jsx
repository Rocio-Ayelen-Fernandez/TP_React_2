import Button from "../Button/Button";
import { useTranslation } from "react-i18next";

const ArtistHeader = ({ artist, onFollowToggle, isFollowing, backImage }) => {
    const { t } = useTranslation();

    if (!artist) return null;

    return (
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[300px] overflow-hidden rounded-b-3xl shadow-xl">
            <div className="absolute inset-0 z-0">
                <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="w-full h-full object-cover blur-sm scale-105 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-800/40 to-indigo-900/70 mix-blend-multiply" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 py-6 text-white space-y-4">
                <div className="backdrop-blur-none sm:backdrop-blur-md bg-none md:bg-white/5 px-4 sm:px-6 py-4 md:rounded-xl md:border md:border-white/10 md:shadow-inner sm:shadow-none w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 overflow-hidden rounded mx-auto md:mx-0">
                        <img
                            src={artist.images[0]?.url}
                            alt=""
                            className="w-full h-full object-cover scale-125"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center md:items-start text-left md:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
                            {artist.name}
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-white/80 drop-shadow-sm">
                            {t("Seguidores")}: {artist.followers.total.toLocaleString()}
                        </p>
                        <Button
                            onClick={onFollowToggle}
                            className={`cursor-pointer px-6 py-2 rounded-full font-medium shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none text-sm sm:text-base ${
                                isFollowing
                                    ? "bg-gradient-to-l from-pink-400 to-violet-600 hover:from-red-500 hover:to-pink-500"
                                    : "bg-gradient-to-r from-green-500 to-violet-600 hover:from-purple-400 hover:to-violet-500"
                            }`}
                        >
                            {isFollowing ? t("Dejar de Seguir") : t("Seguir")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistHeader;
