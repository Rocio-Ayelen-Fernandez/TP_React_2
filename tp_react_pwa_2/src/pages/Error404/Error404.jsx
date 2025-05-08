import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import { useTranslation } from "react-i18next";
import bg404 from "../../assets/img/bg404.jpg"; 

const Error404 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-6">{t("page_not_found")}</p>
        <Button
          onClick={() => navigate("/Home")}
          className="cursor-pointer font-bold px-5 py-2 bg-gradient-to-r from-rose-600 to-violet-600 rounded-lg text-white"
          children={t("go_to_home")}
        />
      </div>
    </div>
  );
};

export default Error404;