import React from "react";
import { useAppContext } from "../../context/AppContext";

const Spinner = () => {
  const { isDarkMode, toggleDarkMode } = useAppContext();
  const textColor = isDarkMode ? "text-white" : "text-darkblue";

  return (
    <div className="flex flex-col mt-48 mb-48 justify-center items-center">
      <h1 className={`${textColor} font-quick font-normal text-5xl mb-20`}>
        Nothing here...
      </h1>
      <div className="animate-spin rounded-full h-48 w-48 border-b-4 border-lightblue"></div>
    </div>
  );
};

export default Spinner;
