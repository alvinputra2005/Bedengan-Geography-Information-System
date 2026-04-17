import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

export default function MainLayout() {
    return (
        <div className="bg-gradient-organic min-h-screen">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}
