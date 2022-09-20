import { useState } from "react";
import AboutComponent from "../about/about";
import HeaderComponent from "../../../Components/header/header";
import './home.css'
import {FaMountain} from "react-icons/fa";

function HomeComponent(){
    return (
        <>
        <section className="w-screen px-3 pb-2 antialiased bg-indigo-600 lg:px-6" data-tails-scripts="//unpkg.com/alpinejs">
            <div className="mx-auto max-w-7xl">
                <div className="container py-32 mx-auto text-center sm:px-4">

                    <h1 className="text-4xl font-extrabold leading-10 tracking-tight text-white sm:text-5xl sm:leading-none md:text-6xl xl:text-7xl"><span className="block">Simplify the way you</span> <span className="relative inline-block mt-3 text-white">design websites</span></h1>
                    <div className="max-w-lg mx-auto mt-6 text-sm text-center text-indigo-200 md:mt-12 sm:text-base md:max-w-xl md:text-lg xl:text-xl">If you are ready to change the way you design websites, then you'll want to use our block builder to make it fun and easy!</div>
                    <div className="relative flex items-center max-w-md mx-auto mt-12 overflow-hidden text-center rounded-full">
                        <span className="relative top-0 right-0 block">
                            <button type="button" className="inline-flex items-center w-32 h-12 px-8 text-base font-bold leading-6 text-white transition duration-150 ease-in-out bg-indigo-400 border border-transparent hover:bg-indigo-700 focus:outline-none active:bg-indigo-700">
                                Sign Up
                            </button>
                        </span>
                    </div>
                    <div className="mt-8 text-sm text-indigo-300">By signing up, you agree to our terms and services.</div>
                </div>
            </div>

            <div className="container w-screen px-6 mx-auto my-24">
                <section className="mb-32">
                    <div className="flex flex-wrap">
                    <div className="w-full mb-12 grow-0 shrink-0 basis-auto lg:w-5/12 lg:mb-0">
                        <div className="flex lg:py-12">
                        <img src="https://mdbootstrap.com/img/new/standard/people/058.jpg" className="w-full rounded-lg shadow-lg"
                            id="cta-img-nml-50" style={{zIndex: 10}} alt="" />
                        </div>
                    </div>

                    <div className="w-full rounded-lg grow-0 shrink-0 basis-auto lg:w-7/12 bg-blue">
                        <div
                        className="flex items-center h-full p-6 text-center text-white bg-yellow-500 rounded-lg lg:pl-12 lg:text-left">
                        <div className="lg:pl-12">
                            <h2 className="mb-6 text-3xl font-bold">Let it surprise you</h2>
                            <p className="pb-2 mb-6 lg:pb-0">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, sint, repellat
                            vel quo quisquam accusamus in qui at ipsa enim quibusdam illo laboriosam omnis.
                            Labore itaque illum distinctio eum neque!
                            </p>

                            <div className="flex flex-col mx-auto mb-6 md:flex-row md:justify-around xl:justify-start">
                            <p className="flex items-center mx-auto mb-4 md:mb-2 lg:mb-0 md:mx-0 xl:mr-20">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 mr-2">
                                <path fill="currentColor"
                                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                                </path>
                                </svg>
                                Best team
                            </p>

                            <p className="flex items-center mx-auto mb-4 md:mb-2 lg:mb-0 md:mx-0 xl:mr-20">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 mr-2">
                                <path fill="currentColor"
                                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                                </path>
                                </svg>
                                Best quality
                            </p>

                            <p className="flex items-center mx-auto mb-2 lg:mb-0 md:mx-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 mr-2">
                                <path fill="currentColor"
                                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                                </path>
                                </svg>
                                Best experience
                            </p>
                            </div>

                            <p>
                            Duis sagittis, turpis in ullamcorper venenatis, ligula nibh porta dui, sit amet
                            rutrum enim massa in ante. Curabitur in justo at lorem laoreet ultricies. Nunc
                            ligula felis, sagittis eget nisi vitae, sodales vestibulum purus. Vestibulum nibh
                            ipsum, rhoncus vel sagittis nec, placerat vel justo. Duis faucibus sapien eget
                            tortor finibus, a eleifend lectus dictum. Cras tempor convallis magna id rhoncus.
                            Suspendisse potenti. Nam mattis faucibus imperdiet. Proin tempor lorem at neque
                            tempus aliquet. Phasellus at ex volutpat, varius arcu id, aliquam lectus.
                            Vestibulum mattis felis quis ex pharetra luctus. Etiam luctus sagittis massa, sed
                            iaculis est vehicula ut.
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        </section>
        </>
       
    )
}

export default HomeComponent;