'use client';

import Link from 'next/link';
import React from 'react';
import { useAppContext } from '@/contexts/app-context';
import { FrontEndRoutes } from '@/constants/routes';

const ClientHeader = () => {
    const { isLoggedIn } = useAppContext();

    return (
        <header className="relative z-50 bg-white px-4 py-4 sm:px-10">
            <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4">
                <a href="javascript:void(0)">
                    <img src="/assets/images/logo-bg-removed.png" alt="logo" className="w-40" />
                </a>

                <div id="collapseMenu" className="max-lg:fixed max-lg:hidden max-lg:before:fixed max-lg:before:inset-0 max-lg:before:bg-black max-lg:before:opacity-40 lg:!block">
                    <button id="toggleClose" className="fixed right-4 top-2 z-[100] rounded-full bg-white p-3 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
                            <path
                                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                data-original="#000000"
                            ></path>
                            <path
                                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                data-original="#000000"
                            ></path>
                        </svg>
                    </button>

                    <ul className="z-50 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full max-lg:w-1/2 max-lg:min-w-[300px] max-lg:space-y-6 max-lg:overflow-auto max-lg:bg-white max-lg:p-4 max-lg:shadow-md lg:ml-12 lg:!flex lg:space-x-6">
                        <li className="px-3 max-lg:border-b max-lg:pb-4 lg:hidden">
                            <a href="javascript:void(0)">
                                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-40" />
                            </a>
                        </li>
                        {/* <li className="px-3 max-lg:border-b max-lg:py-2">
                            <a href="javascript:void(0)" className="block font-semibold text-blue-600 transition-all hover:text-blue-600">
                                Home
                            </a>
                        </li> */}
                        {/* <li className="group relative px-3 max-lg:border-b max-lg:py-2">
                            <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                Pages
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 inline w-3 fill-current" viewBox="0 0 24 24">
                                    <path
                                        fill-rule="evenodd"
                                        d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                        clip-rule="evenodd"
                                        data-original="#000000"
                                    />
                                </svg>
                            </a>

                            <ul className="absolute -left-0 z-50 max-h-0 min-w-[250px] space-y-3 overflow-hidden bg-white px-6 shadow-lg transition-all duration-500 group-hover:max-h-[700px] group-hover:pb-4 group-hover:pt-6 group-hover:opacity-100 max-lg:top-8 lg:top-5">
                                <li className="border-b py-2 ">
                                    <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                        About
                                    </a>
                                </li>
                                <li className="border-b py-2 ">
                                    <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                        Contact
                                    </a>
                                </li>
                                <li className="border-b py-2 ">
                                    <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                        Login
                                    </a>
                                </li>
                                <li className="border-b py-2 ">
                                    <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                        Sign up
                                    </a>
                                </li>
                                <li className="border-b py-2 ">
                                    <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="group relative px-3 max-lg:border-b max-lg:py-2">
                            <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                Feature
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 inline w-3 fill-current" viewBox="0 0 24 24">
                                    <path
                                        fill-rule="evenodd"
                                        d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                        clip-rule="evenodd"
                                        data-original="#000000"
                                    />
                                </svg>
                            </a>

                            <ul className="absolute -left-0 z-50 max-h-0 min-w-[250px] space-y-3 overflow-hidden bg-white px-6 shadow-lg transition-all duration-500 group-hover:max-h-[700px] group-hover:pb-4 group-hover:pt-6 group-hover:opacity-100 max-lg:top-8 lg:top-5">
                                <li className="border-b py-2 ">
                                    <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                        Foods
                                    </a>
                                </li>
                                <li className="border-b py-2 ">
                                    <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                        Sale
                                    </a>
                                </li>
                                <li className="border-b py-2 ">
                                    <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                        Marketing
                                    </a>
                                </li>
                                <li className="border-b py-2 ">
                                    <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                        Investment
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="px-3 max-lg:border-b max-lg:py-2">
                            <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                Blog
                            </a>
                        </li>
                        <li className="px-3 max-lg:border-b max-lg:py-2">
                            <a href="javascript:void(0)" className="block font-semibold transition-all hover:text-blue-600">
                                About
                            </a>
                        </li> */}
                    </ul>
                </div>

                <div className="ml-auto flex grid-rows-2 gap-x-2">
                    {isLoggedIn ? (
                        <Link href={FrontEndRoutes?.DASHBOARD_URL}>
                            <button className="flex items-center rounded-md bg-blue-500 px-5 py-3 font-semibold transition-all hover:bg-blue-200">
                                Dashboard
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-[14px] fill-current" viewBox="0 0 492.004 492.004">
                                    <path
                                        d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                                        data-original="#000000"
                                    />
                                </svg>
                            </button>
                        </Link>
                    ) : (
                        <Link href={FrontEndRoutes?.LOGIN_URL}>
                            <button className="flex items-center rounded-md bg-blue-100 px-5 py-3 font-semibold transition-all hover:bg-blue-200">
                                Sign In
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-[14px] fill-current" viewBox="0 0 492.004 492.004">
                                    <path
                                        d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                                        data-original="#000000"
                                    />
                                </svg>
                            </button>
                        </Link>
                    )}
                    <button id="toggleOpen" className="ml-7 lg:hidden">
                        <svg className="h-7 w-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default ClientHeader;
