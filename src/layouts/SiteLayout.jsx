
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function SiteLayout() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />

            <main className="min-h-screen pt-16 lg:ml-64 lg:pt-0">
                <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default SiteLayout;
