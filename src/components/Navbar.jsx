
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

// Correct import: useToggle is a default export
import useToggle from "../hooks/useToggle";

const navigation = [
    {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
    },
    {
        name: "My Tasks",
        path: "/tasks",
        icon: ClipboardList,
    },
    {
        name: "Focus",
        path: "/focus",
        icon: Timer,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings,
    },
];

function Navbar() {
    const [isOpen, toggleMenu, setIsOpen] = useToggle(false);

    return (
        <>
            {/* Mobile Header */}
            <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-5 lg:hidden">
                <NavLink to="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
                        <GraduationCap size={21} />
                    </div>

                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        Academia
                    </span>
                </NavLink>

                <button
                    type="button"
                    onClick={toggleMenu}
                    className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={23} /> : <Menu size={23} />}
                </button>
            </header>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden">
                    <nav className="absolute right-0 top-16 w-72 rounded-bl-2xl border-t border-slate-100 bg-white p-5 shadow-xl">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === "/"}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                            ? "bg-slate-900 text-white"
                                            : "text-slate-600 hover:bg-slate-100"
                                        }`
                                    }
                                >
                                    <Icon size={19} />
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white px-5 py-7 lg:flex">
                <NavLink to="/" className="mb-12 flex items-center gap-3 px-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                        <GraduationCap size={25} />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">
                            Academia
                        </h1>

                        <p className="text-xs text-slate-400">
                            Your learning companion
                        </p>
                    </div>
                </NavLink>

                <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Workspace
                </p>

                <nav className="flex flex-col gap-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                    }`
                                }
                            >
                                <Icon size={19} />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Learning Reminder */}
                <div className="mt-auto rounded-2xl bg-slate-50 p-4">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                        <BookOpen size={19} />
                    </div>

                    <h3 className="text-sm font-semibold text-slate-800">
                        Keep learning!
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Small steps every day lead to big achievements.
                    </p>
                </div>
            </aside>
        </>
    );
}

export default Navbar;
