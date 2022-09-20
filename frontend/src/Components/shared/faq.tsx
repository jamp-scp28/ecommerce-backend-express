const FAQComponent = () => {
    return (
        <>
            <section className="relative py-16 bg-white min-w-screen animation-fade animation-delay">
                <div className="container px-0 px-8 mx-auto sm:px-12 xl:px-5">
                    <p className="text-xs font-bold text-left text-pink-500 uppercase sm:mx-6 sm:text-center sm:text-normal sm:font-bold">
                        Tienes preguntas? tenemos respuestas!
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0">
                        Preguntas Frecuentes
                    </h3>
                    <div className="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
                        <h3 className="text-lg font-bold text-blue sm:text-xl md:text-2xl">How does it work?</h3>
                        <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                            Our platform works with your content to provides insights and metrics on how you can grow your business and scale your infastructure.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FAQComponent;