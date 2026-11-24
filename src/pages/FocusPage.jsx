
import { useEffect, useState } from "react";
import {
    Play,
    Pause,
    RotateCcw,
    Coffee,
    Brain,
    Clock3,
    CheckCircle2,
    Target,
    Settings2,
} from "lucide-react";
import useLocalStorage from "../hooks/useLocalStorage";

const focusModes = [
    { name: "Focus", minutes: 25, icon: Brain },
    { name: "Short Break", minutes: 5, icon: Coffee },
    { name: "Long Break", minutes: 15, icon: Clock3 },
];

function FocusPage() {
    const [activeMode, setActiveMode] = useState("Focus");
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);

    const [stats, setStats] = useLocalStorage("academia-focus-stats", {
        completedSessions: 0,
        focusMinutes: 0,
    });

    const selectedMode = focusModes.find(
        (mode) => mode.name === activeMode
    );

    // Format seconds into MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    // Switch between timer modes
    const changeMode = (mode) => {
        setActiveMode(mode.name);
        setSecondsLeft(mode.minutes * 60);
        setIsRunning(false);
    };

    // Start or pause the timer
    const toggleTimer = () => {
        if (secondsLeft === 0) {
            setSecondsLeft(selectedMode.minutes * 60);
        }

        setIsRunning((previous) => !previous);
    };

    // Reset the current timer
    const resetTimer = () => {
        setIsRunning(false);
        setSecondsLeft(selectedMode.minutes * 60);
    };

    // Run the countdown and clean up the interval
    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setSecondsLeft((previous) => Math.max(previous - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning]);

    // Handle timer completion
    useEffect(() => {
        if (secondsLeft !== 0 || !isRunning) return;

        setIsRunning(false);

        if (activeMode === "Focus") {
            setStats((previousStats) => ({
                completedSessions: previousStats.completedSessions + 1,
                focusMinutes: previousStats.focusMinutes + selectedMode.minutes,
            }));
        }
    }, [secondsLeft, isRunning, activeMode, selectedMode, setStats]);

    // Display total focus time
    const formatFocusTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours === 0) return `${remainingMinutes}m`;

        return remainingMinutes === 0
            ? `${hours}h`
            : `${hours}h ${remainingMinutes}m`;
    };

    return (
        <div className="space-y-8 pb-10">
            {/* PAGE HEADER */}
            <section>
                <p className="text-sm font-medium text-[var(--muted)]">
                    Make time for what matters
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                    Focus Session
                </h1>

                <p className="mt-2 text-sm text-[var(--muted)]">
                    Give your attention to one thing at a time.
                </p>
            </section>

            {/* TIMER SECTION */}
            <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10">
                <div className="mx-auto max-w-2xl">

                    {/* TIMER MODES */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {focusModes.map((mode) => {
                            const Icon = mode.icon;

                            return (
                                <button
                                    key={mode.name}
                                    type="button"
                                    onClick={() => changeMode(mode)}
                                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${activeMode === mode.name
                                            ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                                            : "text-[var(--muted)] hover:bg-[var(--surface-secondary)]"
                                        }`}
                                >
                                    <Icon size={17} />
                                    {mode.name}
                                </button>
                            );
                        })}
                    </div>

                    {/* CIRCULAR TIMER */}
                    <div className="my-12 flex justify-center">
                        <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-[12px] border-[var(--surface-secondary)] sm:h-72 sm:w-72">

                            <div
                                className="absolute inset-[-12px] rounded-full border-[12px] border-transparent border-t-[var(--primary)] border-r-[var(--primary)]"
                                style={{
                                    transform: `rotate(${45 + (1 - secondsLeft / (selectedMode.minutes * 60)) * 360
                                        }deg)`,
                                    transition: "transform 1s linear",
                                }}
                            />

                            <div className="text-center">
                                <p className="text-6xl font-bold tracking-tight text-[var(--foreground)] sm:text-7xl">
                                    {formatTime(secondsLeft)}
                                </p>

                                <p className="mt-3 text-sm font-medium text-[var(--muted)]">
                                    {secondsLeft === 0
                                        ? "Session completed!"
                                        : isRunning
                                            ? "Stay focused..."
                                            : "Ready to focus?"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* TIMER CONTROLS */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={toggleTimer}
                            className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-8 py-4 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-80"
                        >
                            {isRunning ? (
                                <>
                                    <Pause size={18} />
                                    Pause
                                </>
                            ) : (
                                <>
                                    <Play size={18} />
                                    {secondsLeft === 0 ? "Start Again" : "Start Focus"}
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={resetTimer}
                            aria-label="Reset timer"
                            className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]"
                        >
                            <RotateCcw size={18} />
                        </button>

                        <button
                            type="button"
                            disabled
                            title="Custom timer settings coming later"
                            aria-label="Timer settings"
                            className="flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] opacity-50"
                        >
                            <Settings2 size={18} />
                        </button>
                    </div>

                    <p className="mt-6 text-center text-xs text-[var(--muted)]">
                        Work in focused intervals and take breaks to recharge.
                    </p>
                </div>
            </section>

            {/* SESSION STATISTICS */}
            <section>
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-[var(--foreground)]">
                        Your Focus Progress
                    </h2>

                    <p className="mt-1 text-sm text-[var(--muted)]">
                        A little consistency goes a long way.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {/* COMPLETED SESSIONS */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                            <Target size={21} />
                        </div>

                        <p className="mt-5 text-sm text-[var(--muted)]">
                            Completed Sessions
                        </p>

                        <h3 className="mt-1 text-3xl font-bold text-[var(--foreground)]">
                            {String(stats.completedSessions).padStart(2, "0")}
                        </h3>

                        <p className="mt-2 text-xs text-[var(--muted)]">
                            Total focus sessions
                        </p>
                    </div>

                    {/* FOCUS TIME */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                            <Clock3 size={21} />
                        </div>

                        <p className="mt-5 text-sm text-[var(--muted)]">
                            Focus Time
                        </p>

                        <h3 className="mt-1 text-3xl font-bold text-[var(--foreground)]">
                            {formatFocusTime(stats.focusMinutes)}
                        </h3>

                        <p className="mt-2 text-xs text-[var(--muted)]">
                            Total time spent focusing
                        </p>
                    </div>

                    {/* DAILY GOAL */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                            <CheckCircle2 size={21} />
                        </div>

                        <p className="mt-5 text-sm text-[var(--muted)]">
                            Daily Goal
                        </p>

                        <h3 className="mt-1 text-3xl font-bold text-[var(--foreground)]">
                            {stats.completedSessions} / 6
                        </h3>

                        <p className="mt-2 text-xs text-[var(--muted)]">
                            Total sessions compared with your goal
                        </p>
                    </div>
                </div>
            </section>

            {/* FOCUS TIPS */}
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                        <Brain size={21} />
                    </div>

                    <div>
                        <h2 className="font-bold text-[var(--foreground)]">
                            A reminder for today
                        </h2>

                        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                            You don't need to do everything at once. Choose one
                            important task, give it your full attention, and
                            take one step at a time.
                        </p>
                    </div>
                </div>
            </section>

            {/* BOTTOM MESSAGE */}
            <div className="border-t border-[var(--border)] pt-6 text-center">
                <p className="text-sm text-[var(--muted)]">
                    Less distraction. More intention. Better results.
                </p>
            </div>
        </div>
    );
}

export default FocusPage;
