export default function Hero() {
    return (
        <section className="hero bg-base-200 min-h-[60vh] glass mb-4">
            <div className="hero-content flex flex-col lg:flex-row items-center justify-center gap-8 px-6 lg:px-12 text-center lg:text-left w-full max-w-6xl mx-auto">
                <div className="flex justify-center w-full lg:w-1/2">
                    <img
                        src="logo.png"
                        alt="SportHub Logo"
                        className="w-48 sm:w-64 md:w-72 lg:w-80 xl:w-96 max-w-full h-auto object-contain rounded-lg"
                    />
                </div>

                <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        Välkommen till SportHub!
                    </h1>

                    <p className="py-4 text-sm sm:text-base md:text-lg max-w-prose">
                        En kraftfull plattform som hämtar sportdata via API från <a className="link link-hover text-warning" href="https://www.everysport.com/">Everysport.com</a> och gör det enkelt att analysera
                        och följa matcher i realtid. Håll dig alltid steget före! Vi samlar in live-data om dina
                        favoritlag och sporter – allt på ett ställe.
                    </p>
                </div>
            </div>
        </section>
    );
}
