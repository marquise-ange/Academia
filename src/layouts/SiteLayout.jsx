
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SiteLayout() {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            <Navbar />

            <main className="min-h-screen pt-16 lg:ml-64 lg:pt-0">
                <div className="mx-auto max-w-7xl p-5 md:p-8 lg:p-10">
                    <Outlet />
                </div>
            </main>

            <div className="lg:ml-64">
                <Footer />
            </div>
        </div>
    );
}

export default SiteLayout;
