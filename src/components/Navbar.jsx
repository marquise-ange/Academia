
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    ClipboardList,
    Timer,
    Settings,
    GraduationCap,
    Menu,
    X,
    BookOpen,
} from "lucide-react";

import useToggle from "../hooks/useToggle";

const navigation = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "My Tasks", path: "/tasks", icon: ClipboardList },
    { name: "Focus", path: "/focus", icon: Timer },
    { name: "Settings", path: "/settings", icon: Settings },
];

function Navbar() {
    const [isOpen, toggleMenu, setIsOpen] = useToggle(false);

    // Navigation link styling
    const navStyle = ({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 500,
        textDecoration: "none",
        transition: "all 0.2s ease",
        backgroundColor: isActive
            ? "var(--primary)"
            : "transparent",
        color: isActive
            ? "var(--primary-foreground)"
            : "var(--foreground)",
        boxShadow: isActive
            ? "0 1px 3px rgba(0, 0, 0, 0.1)"
            : "none",
    });

    return (
        <>
            {/* MOBILE HEADER */}
            <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-5 lg:hidden">
                <NavLink to="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)]">
                        <GraduationCap size={21} />
                    </div>

                    <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                        Academia
                    </span>
                </NavLink>

                <button
                    type="button"
                    onClick={toggleMenu}
                    className="rounded-lg p-2 text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={23} /> : <Menu size={23} />}
                </button>
            </header>

            {/* MOBILE NAVIGATION */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                >
                    <nav
                        className="absolute right-0 top-16 flex w-72 flex-col gap-2 rounded-bl-2xl border-t border-[var(--border)] bg-[var(--surface)] p-5 shadow-xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === "/"}
                                    onClick={() => setIsOpen(false)}
                                    style={navStyle}
                                >
                                    <Icon size={19} />
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            )}

            {/* DESKTOP SIDEBAR */}
            <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-[var(--border)] bg-[var(--surface)] px-5 py-7 lg:flex">

                {/* BRAND */}
                <NavLink to="/" className="mb-12 flex items-center gap-3 px-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)]">
                        <GraduationCap size={25} />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                            Academia
                        </h1>

                        <p className="text-xs text-[var(--muted)]">
                            Your personal study space
                        </p>
                    </div>
                </NavLink>

                {/* NAVIGATION TITLE */}
                <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                    Workspace
                </p>

                {/* NAVIGATION LINKS */}
                <nav className="flex flex-col gap-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}
                                style={navStyle}
                            >
                                <Icon size={19} />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* LEARNING REMINDER */}
                <div className="mt-auto rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)]">
                        <BookOpen size={19} />
                    </div>

                    <h3 className="text-sm font-semibold text-[var(--foreground)]">
                        Keep learning!
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                        Small steps every day lead to big achievements.
                    </p>
                </div>
            </aside>
        </>
    );
}

export default Navbar;
