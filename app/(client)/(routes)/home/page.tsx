import ClientFooter from '@/components/layouts/client/footer';
import ClientHeader from '@/components/layouts/client/header';
import HeroSection from '@/components/layouts/client/hero-section';

const Home = () => {
    return (
        <div>
            <ClientHeader />
            <HeroSection />
            <ClientFooter />
        </div>
    );
};

export default Home;
