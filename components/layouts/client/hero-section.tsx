import HomePageEnquiryForm from '@/components/forms/enquiry/enquiry-form';
import React from 'react';

const HeroSection = () => {
    return (
        <div className="bg-slate-100 px-4 sm:px-10 lg:min-h-[560px]">
            <div className="mx-auto w-full max-w-7xl py-3">
                <div className="grid items-center justify-center gap-5 lg:grid-cols-2">
                    <div>
                        <h1 className="mb-3 text-4xl font-bold md:text-5xl md:!leading-[55px]">Send your Enquiry</h1>
                        <p className="text-base leading-relaxed text-gray-500">Fill the form to recieve the quotation via message.</p>
                        <HomePageEnquiryForm />
                    </div>
                    <div className="h-full max-lg:mt-12">
                        <img src="assets/gifs/the-plane-13509.gif" alt="banner img" className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
