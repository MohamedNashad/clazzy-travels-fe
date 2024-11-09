import RegisterForm from '@/components/forms/auth/register-form';
import LanguageDropdown from '@/components/organisms/language-dropdown/language-dropdown';
import { FrontEndRoutes } from '@/constants/routes';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Register',
};

const Register = () => {
    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px]">
                        <div className="absolute end-6 top-6">
                            <Link href={FrontEndRoutes?.HOME_URL}>
                                <button className="flex items-center rounded-md bg-blue-100 px-5 py-3 font-semibold transition-all hover:bg-blue-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-[14px] fill-current" viewBox="0 0 492.004 492.004">
                                        <path
                                            d="M7.864 226.886l177.68-177.68c5.072-5.072 11.832-7.856 19.04-7.856 7.216 0 13.972 2.788 19.044 7.856l16.132 16.136c5.068 5.064 7.86 11.828 7.86 19.04 0 7.208-2.792 14.2-7.86 19.264L136.1 207.526H465.42c14.848 0 26.58 11.624 26.58 26.476v22.812c0 14.852-11.732 27.648-26.58 27.648H136.1L242.752 388.926c5.068 5.072 7.86 11.652 7.86 18.864 0 7.204-2.792 13.88-7.86 18.948l-16.132 16.084c-5.072 5.072-11.828 7.836-19.044 7.836-7.208 0-13.968-2.8-19.04-7.872L7.864 246.926c-5.084-5.088-7.88-11.88-7.86-19.1-.016-7.244 2.776-14.04 7.864-19.12z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                    Back To Home
                                </button>
                            </Link>
                        </div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign Up</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to register</p>
                            </div>
                            <RegisterForm />
                            <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>

                            <div className="text-center dark:text-white">
                                Already have an account ?&nbsp;
                                <Link href={FrontEndRoutes?.LOGIN_URL} className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN IN
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
