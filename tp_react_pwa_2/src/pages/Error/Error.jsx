import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import { useTranslation } from "react-i18next";
import bg404 from "../../assets/img/bg404.jpg"; 
import { useSearchParams } from "react-router";

const Error = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div
      className="relative h-screen flex flex-col items-center justify-center text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg404})`,
        animation: "warp 50s infinite linear",
        backgroundSize: "200% 200%",
      }}
    >

      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-indigo-950 opacity-80"></div>


      <div className="relative z-10 text-center bg-white/5 bg-opacity-20 p-10 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold mb-4">{error}</h1>
        {          error === "404" ? ( <p className="text-2xl mb-6">{t("page_not_found")}</p>): (
          <p className="text-2xl mb-6">{t("not_authorized")}</p>
        )}
       
       
        <Button
          onClick={ error ==="404" ? (() => navigate("/Home")) : (() => navigate("/Login"))}
          className="cursor-pointer font-bold px-5 py-2 bg-gradient-to-r from-rose-600 to-violet-600 rounded-lg text-white"
          children={ error ==="404" ? t("go_to_home") : t("go_to_login")}
        />
      </div>
    </div>
  );
};

export default Error;