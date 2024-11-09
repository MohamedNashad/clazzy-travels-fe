import React from 'react';
import IconX from '@/components/icon/icon-x';

interface SideSheetProps {
    isSheetOpen: boolean;
    setIsSheetOpen: (isOpen: boolean) => void;
    title?: string;
    description?: string;
    children: any;
    maxWidth: string;
}

const CommonSheet: React.FC<SideSheetProps> = ({ maxWidth, isSheetOpen, setIsSheetOpen, title = 'TITLE', description, children }) => {
    return (
        <div>
            <div className={`${(isSheetOpen && '!block') || ''} fixed inset-0 z-[51] hidden bg-[black]/60 px-4 transition-[display]`} onClick={() => setIsSheetOpen(false)}></div>

            <nav
                className={`${
                    (isSheetOpen && 'ltr:!right-0 rtl:!left-0') || ''
                } fixed bottom-0 top-0 z-[51] w-full ${maxWidth} bg-white p-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 dark:bg-black ltr:-right-[80%] rtl:-left-[80%]`}
            >
                <div className="perfect-scrollbar h-full overflow-y-auto overflow-x-hidden">
                    <div className="relative border-b-2 pb-2 text-left">
                        <button type="button" className="absolute top-0 opacity-30 hover:opacity-100 dark:text-white ltr:right-0 rtl:left-0" onClick={() => setIsSheetOpen(false)}>
                            <IconX className="h-5 w-5" />
                        </button>

                        <h4 className="mb-1 font-bold dark:text-white">{title}</h4>
                        <p className="text-white-dark">{description}</p>
                    </div>
                    <div className="mt-5 flex">{children}</div>
                </div>
            </nav>
        </div>
    );
};

export default CommonSheet;
