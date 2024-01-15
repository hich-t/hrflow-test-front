import React from "react"
import { Switch } from "@headlessui/react";
import { useAppContext } from "../context/AppContext"


const TopMenu = ()  => {
    
    const { isDarkMode, toggleDarkMode } = useAppContext();


    return(
        <div className="bg-gradient-to-r from-midblue to-lightblue w-full p-12 mb-10">
        <div className="hidden sm:flex items-center justify-between">
          <img
            className="w-32 sm:w-36"
            src="Assets/images/hrflow_logo.png"
            alt="Logo HrFlow.ai"
          />
          <h1 className="font-quick font-normal text-5xl">Job Listings</h1>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 w-6 sm:w-10 h-6 sm:h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>

            <Switch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              className={`${isDarkMode ? "bg-darkblue" : "bg-teal-300"}
                    relative inline-flex h-[19px] sm:h-[38px] w-[37px] sm:w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              <span className="sr-only">Toggle Dark Mode</span>
              <span
                aria-hidden="true"
                className={`${
                  isDarkMode
                    ? "translate-x-4 sm:translate-x-9"
                    : "translate-x-0"
                }
                    mt-[-2px] sm:mt-0  pointer-events-none inline-block h-[20px] sm:h-[34px] w-[20px] sm:w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-2 w-6 sm:w-9 h-6 sm:h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </div>
        </div>

        {/* mobile top menu  */}

        <div className="sm:hidden">
          <div className="flex justify-between items-center mb-4">
            <img
              className="w-32"
              src="Assets/images/hrflow_logo.png"
              alt="Logo HrFlow.ai"
            />
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 w-6 sm:w-10 h-6 sm:h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>

              <Switch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                className={`${isDarkMode ? "bg-darkblue" : "bg-teal-300"}
                    relative inline-flex h-[19px] sm:h-[38px] w-[37px] sm:w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
              >
                <span className="sr-only">Toggle Dark Mode</span>
                <span
                  aria-hidden="true"
                  className={`${
                    isDarkMode
                      ? "translate-x-4 sm:translate-x-9"
                      : "translate-x-0"
                  }
                    mt-[-2px] sm:mt-0  pointer-events-none inline-block h-[20px] sm:h-[34px] w-[20px] sm:w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-2 w-6 sm:w-9 h-6 sm:h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </div>
          </div>
          <h1 className="font-quick font-normal text-3xl text-center mt-10">
            Job Listings
          </h1>
        </div>
      </div>
    )
}

export default TopMenu;