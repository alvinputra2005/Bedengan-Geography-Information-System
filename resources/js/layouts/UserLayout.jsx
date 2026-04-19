import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/user/UserSidebar';
import UserTopbar from '../components/user/UserTopbar';

export default function UserLayout() {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(57,184,253,0.08),transparent_24%),linear-gradient(180deg,#f7faff_0%,#eef4ff_100%)] text-on-surface">
            <UserSidebar />
            <div className="min-h-screen md:ml-72">
                <UserTopbar />
                <main className="px-4 pb-10 pt-24 md:px-8 md:pt-28">
                    <div className="mx-auto w-full max-w-7xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
