import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";


const NavigateToFavorite = () => {
  const navigate = useNavigate();

  return (
    <Button
      className="text-gray-300 cursor-pointer hover:text-white hover:brightness-125 transition-all duration-200"
      onClick={() => navigate("/Favorites")}
      children={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 64 64"
          fill="none"
        >
          <line
            x1="8"
            y1="18"
            x2="28"
            y2="18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="26"
            x2="28"
            y2="26"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="34"
            x2="22"
            y2="34"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <ellipse
            cx="36"
            cy="42"
            rx="6"
            ry="4"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <line
            x1="42"
            y1="42"
            x2="42"
            y2="20"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M42 20 L52 17 V23 L42 26 Z"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      }
    />
  )

}

export default NavigateToFavorite;