
import {
    UserRound,
    Palette,
    Bell,
    BookOpen,
    Clock3,
    Moon,
    Sun,
    ChevronRight,
    RotateCcw,
    ShieldCheck,
    Target,
} from "lucide-react";

import useDocumentTitle from "../hooks/useDocumentTitle";

function SettingsSection({ title, description, icon: Icon, children }) {
    return (
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
            <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                    <Icon size={20} />
                </div>

                <div>
                    <h2 className="font-bold text-[var(--foreground)]">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                        {description}
                    </p>
                </div>
            </div>

            <div className="space-y-5">
                {children}
            </div>
        </section>
    );
}

function SettingRow({ title, description, children }) {
    return (
        <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    {title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                    {description}
                </p>
            </div>

            <div className="shrink-0">
                {children}
            </div>
        </div>
    );
}

function SettingsPage() {
    useDocumentTitle("Settings");

    return (
        <div className="space-y-8 pb-10">

            {/* PAGE HEADER */}
            <section>
                <p className="text-sm font-medium text-[var(--muted)]">
                    Make Academia yours
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                    Settings
                </h1>

                <p className="mt-2 text-sm text-[var(--muted)]">
                    Manage your preferences and personalize your learning space.
                </p>
            </section>

            {/* PROFILE */}
            <SettingsSection
                title="Profile"
                description="Your personal information."
                icon={UserRound}
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)] text-2xl font-bold text-[var(--primary-foreground)]">
                        A
                    </div>

                    <div>
                        <h3 className="font-bold text-[var(--foreground)]">
                            Academia Student
                        </h3>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                            Welcome to your personal learning space.
                        </p>
                    </div>
                </div>

                <SettingRow
                    title="Display Name"
                    description="The name displayed on your profile."
                >
                    <input
                        type="text"
                        defaultValue="Academia Student"
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)] sm:w-52"
                    />
                </SettingRow>
            </SettingsSection>

            {/* APPEARANCE */}
            <SettingsSection
                title="Appearance"
                description="Customize how Academia looks."
                icon={Palette}
            >
                <SettingRow
                    title="Theme"
                    description="Choose your preferred appearance."
                >
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-lg border border-[var(--foreground)] bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)]"
                        >
                            <Sun size={16} />
                            Light
                        </button>

                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-secondary)]"
                        >
                            <Moon size={16} />
                            Dark
                        </button>
                    </div>
                </SettingRow>
            </SettingsSection>

            {/* STUDY PREFERENCES */}
            <SettingsSection
                title="Study Preferences"
                description="Set your learning and focus goals."
                icon={BookOpen}
            >
                <SettingRow
                    title="Daily Study Goal"
                    description="Your target study time each day."
                >
                    <select
                        defaultValue="4"
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none sm:w-36"
                    >
                        <option value="2">2 hours</option>
                        <option value="3">3 hours</option>
                        <option value="4">4 hours</option>
                        <option value="5">5 hours</option>
                        <option value="6">6 hours</option>
                        <option value="8">8 hours</option>
                    </select>
                </SettingRow>

                <SettingRow
                    title="Focus Duration"
                    description="How long each focus session should last."
                >
                    <select
                        defaultValue="25"
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none sm:w-36"
                    >
                        <option value="15">15 minutes</option>
                        <option value="25">25 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                    </select>
                </SettingRow>

                <SettingRow
                    title="Short Break"
                    description="Your preferred break between focus sessions."
                >
                    <select
                        defaultValue="5"
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none sm:w-36"
                    >
                        <option value="5">5 minutes</option>
                        <option value="10">10 minutes</option>
                        <option value="15">15 minutes</option>
                    </select>
                </SettingRow>
            </SettingsSection>

            {/* NOTIFICATIONS */}
            <SettingsSection
                title="Notifications"
                description="Choose which reminders you want to receive."
                icon={Bell}
            >
                <SettingRow
                    title="Study Reminders"
                    description="Get reminders to stay consistent with your study goals."
                >
                    <input
                        type="checkbox"
                        defaultChecked
                        aria-label="Enable study reminders"
                        className="h-5 w-5 accent-[var(--foreground)]"
                    />
                </SettingRow>

                <SettingRow
                    title="Task Due Date Alerts"
                    description="Receive reminders about upcoming tasks."
                >
                    <input
                        type="checkbox"
                        defaultChecked
                        aria-label="Enable task due date alerts"
                        className="h-5 w-5 accent-[var(--foreground)]"
                    />
                </SettingRow>

                <SettingRow
                    title="Focus Session Notifications"
                    description="Get notified when a focus session ends."
                >
                    <input
                        type="checkbox"
                        defaultChecked
                        aria-label="Enable focus session notifications"
                        className="h-5 w-5 accent-[var(--foreground)]"
                    />
                </SettingRow>
            </SettingsSection>

            {/* APPLICATION */}
            <SettingsSection
                title="Application"
                description="Manage your Academia preferences."
                icon={ShieldCheck}
            >
                <SettingRow
                    title="Reset Preferences"
                    description="Restore the application settings to their defaults."
                >
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]"
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>
                </SettingRow>
            </SettingsSection>

            {/* FOOTER MESSAGE */}
            <div className="flex items-center justify-center gap-2 border-t border-[var(--border)] pt-6">
                <Target size={17} className="text-[var(--muted)]" />

                <p className="text-sm text-[var(--muted)]">
                    Build a learning environment that works for you.
                </p>
            </div>
        </div>
    );
}

export default SettingsPage;
