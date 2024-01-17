const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className="flex items-center justify-center bg-gradient-to-r from-midblue to-lightblue w-full h-24 p-12 mt-10">

            <button 
            onClick={scrollToTop}
            className="bg-white px-2 border border-lightblue text-lightblue font-quick text-sm rounded-md w-auto h-10 hover:outline-none hover:ring-1 hover:ring-offset-1 hover:ring-offset-lightblue hover:ring-lightblue">
                Back to the top Morty !
            </button>

        </div>
    )
}

export default Footer;