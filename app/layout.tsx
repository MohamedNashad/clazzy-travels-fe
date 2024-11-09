import ProviderComponent from '@/components/layouts/provider-component';
import { AppContextProvider } from '@/contexts/app-context';
import { QueryClientLayout } from '@/providers/query-client-layout';
import { Metadata } from 'next';
import { Inter, Nunito, Poppins } from 'next/font/google';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';

export const metadata: Metadata = {
    title: {
        template: '%s | CLAZZY TRAVELS',
        default: 'CLAZZY TRAVELS',
    },
};
const nunito = Nunito({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
});

// Configure Poppins
const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
});

// Configure Inter
const inter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${nunito.variable}`}>
                <QueryClientLayout>
                    <ProviderComponent>
                        <AppContextProvider>{children}</AppContextProvider>
                    </ProviderComponent>
                </QueryClientLayout>
            </body>
        </html>
    );
}
