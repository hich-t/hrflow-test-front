"use client"

import { useAppContext } from "../context/AppContext"

import TopMenu from "../components/TopMenu"
import JobsCards from "@/components/JobsCards"
import SearchAndFilter from "@/components/SearchAndFilter/SearchandFilter"

const HomePage = () => {

    const { isDarkMode, toggleDarkMode } = useAppContext();
    const bgColor = isDarkMode ? "bg-darkblue" : "bg-white";
    const textColor = isDarkMode ? "text-white" : "text-darkblue";

    return(
        <main className={`flex ${bgColor} items-center flex-col min-h-screen`}>
            <TopMenu />
            <SearchAndFilter />
            <JobsCards />
        </main>
    )
}

export default HomePage;