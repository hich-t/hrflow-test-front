import React from "react";
import { useAppContext } from "../../context/AppContext";

const Empty = () => {
  const { isDarkMode, toggleDarkMode } = useAppContext();
  const textColor = isDarkMode ? "text-white" : "text-darkblue";

  return (
    <div className="flex flex-col mt-10 mb-48 justify-center items-center">
      <h1 className={`${textColor} font-quick font-normal text-5xl mb-10`}>
        Nothing here...
      </h1>
      <img src="Assets/images/character.png" className="w-9/12 sm:w-1/3 mb-20 mt-10" />
    </div>
  );
};

export default Empty;
