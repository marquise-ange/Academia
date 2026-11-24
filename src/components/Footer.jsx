
import { GraduationCap, ArrowUp } from "lucide-react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-12 border-t border-[var(--border)] bg-[var(--surface)]">
            <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 lg:px-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)]">
                                <GraduationCap size={20} />
                            </div>

                            <span className="text-lg font-bold tracking-tight">
                                Academia
                            </span>
                        </div>

                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
                            Stay focused, manage your tasks, and make every study session
                            count.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-5 text-sm text-[var(--muted)]">
                        <a href="/" className="transition hover:text-[var(--foreground)]">
                            Dashboard
                        </a>
                        <a href="/tasks" className="transition hover:text-[var(--foreground)]">
                            My Tasks
                        </a>
                        <a href="/focus" className="transition hover:text-[var(--foreground)]">
                            Focus
                        </a>
                        <a href="/settings" className="transition hover:text-[var(--foreground)]">
                            Settings
                        </a>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
                    <p>© {currentYear} Academia. All rights reserved.</p>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                        <span>Built for better learning.</span>

                        <button
                            type="button"
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                            aria-label="Back to top"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] transition hover:bg-[var(--surface-secondary)]"
                        >
                            <ArrowUp size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
