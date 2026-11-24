
import {
    BookOpen,
    Clock3,
    CheckCircle2,
    Target,
    ArrowUpRight,
    Plus,
    CalendarDays,
    MoreHorizontal,
    Flame,
    Play,
    Circle,
    ArrowRight,
} from "lucide-react";

const weeklyActivity = [
    { day: "Mon", hours: 3 },
    { day: "Tue", hours: 5 },
    { day: "Wed", hours: 2 },
    { day: "Thu", hours: 6 },
    { day: "Fri", hours: 4 },
    { day: "Sat", hours: 7 },
    { day: "Sun", hours: 3 },
];

const tasks = [
    {
        id: 1,
        title: "Complete React components",
        subject: "Web Development",
        time: "10:00 AM",
        priority: "High",
        completed: false,
    },
    {
        id: 2,
        title: "Review database concepts",
        subject: "Database Management",
        time: "01:30 PM",
        priority: "Medium",
        completed: false,
    },
    {
        id: 3,
        title: "Read Chapter 4 notes",
        subject: "Information Management",
        time: "03:00 PM",
        priority: "Low",
        completed: true,
    },
];

function StatCard({ title, value, description, icon: Icon }) {
    return (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-secondary)] text-[var(--foreground)]">
                    <Icon size={21} />
                </div>
                <ArrowUpRight size={18} className="text-[var(--muted)]" />
            </div>

            <p className="mt-5 text-sm text-[var(--muted)]">{title}</p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-[var(--foreground)]">
                {value}
            </h2>

            <p className="mt-2 text-xs text-[var(--muted)]">{description}</p>
        </div>
    );
}

function DashboardPage() {
    const maxHours = 8;

    return (
        <div className="space-y-8 pb-10">

            {/* WELCOME SECTION */}
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-medium text-[var(--muted)]">
                        Welcome back
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                        Your learning space.
                    </h1>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                        Stay focused, keep learning, and make today count.
                    </p>
                </div>

                <button className="flex w-fit items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-80">
                    <Plus size={18} />
                    Add New Task
                </button>
            </section>

            {/* DATE AND DAILY MOTIVATION */}
            <section className="flex flex-col justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                        <CalendarDays size={21} />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">
                            Your daily progress
                        </p>
                        <p className="text-xs text-[var(--muted)]">
                            A little progress every day adds up.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
                    <Flame size={18} />
                    Keep your momentum going
                </div>
            </section>

            {/* STATISTICS */}
            <section>
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-[var(--foreground)]">
                        Overview
                    </h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                        Your study performance at a glance.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Total Study Hours"
                        value="32.5h"
                        description="Hours invested in learning"
                        icon={Clock3}
                    />

                    <StatCard
                        title="Completed Tasks"
                        value="24"
                        description="Tasks successfully completed"
                        icon={CheckCircle2}
                    />

                    <StatCard
                        title="Current Streak"
                        value="7 days"
                        description="Keep showing up every day"
                        icon={Flame}
                    />

                    <StatCard
                        title="Weekly Goal"
                        value="75%"
                        description="15 of 20 hours completed"
                        icon={Target}
                    />
                </div>
            </section>

            {/* MAIN DASHBOARD GRID */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">

                {/* WEEKLY ACTIVITY */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 xl:col-span-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-[var(--foreground)]">
                                Weekly Activity
                            </h2>
                            <p className="mt-1 text-sm text-[var(--muted)]">
                                Your study hours throughout the week.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--surface-secondary)]"
                            aria-label="More activity options"
                        >
                            <MoreHorizontal size={21} />
                        </button>
                    </div>

                    <div className="mt-8 flex h-52 items-end justify-between gap-3 sm:gap-5">
                        {weeklyActivity.map((item) => (
                            <div
                                key={item.day}
                                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                            >
                                <span className="text-xs font-semibold text-[var(--muted)]">
                                    {item.hours}h
                                </span>

                                <div className="flex h-full w-full items-end justify-center rounded-t-lg bg-[var(--surface-secondary)]">
                                    <div
                                        className="w-full max-w-12 rounded-t-lg bg-[var(--primary)] transition-all"
                                        style={{
                                            height: `${(item.hours / maxHours) * 100}%`,
                                        }}
                                    />
                                </div>

                                <span className="text-xs text-[var(--muted)]">
                                    {item.day}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
                        <p className="text-sm text-[var(--muted)]">
                            Total study time
                        </p>
                        <p className="text-sm font-bold text-[var(--foreground)]">
                            30 hours
                        </p>
                    </div>
                </div>

                {/* DAILY GOAL */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                    <h2 className="text-lg font-bold text-[var(--foreground)]">
                        Daily Goal
                    </h2>

                    <p className="mt-1 text-sm text-[var(--muted)]">
                        Stay consistent with your learning.
                    </p>

                    <div className="my-8 flex justify-center">
                        <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-[var(--surface-secondary)]">
                            <div
                                className="absolute inset-[-12px] rounded-full border-[12px] border-transparent border-t-[var(--primary)] border-r-[var(--primary)]"
                                style={{ transform: "rotate(35deg)" }}
                            />

                            <div className="text-center">
                                <p className="text-4xl font-bold text-[var(--foreground)]">
                                    75%
                                </p>
                                <p className="mt-1 text-xs text-[var(--muted)]">
                                    Completed
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-[var(--muted)]">Studied</span>
                            <span className="font-semibold text-[var(--foreground)]">
                                3 / 4 hours
                            </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
                            <div className="h-full w-3/4 rounded-full bg-[var(--primary)]" />
                        </div>

                        <p className="text-xs text-[var(--muted)]">
                            One more hour to reach your daily goal.
                        </p>
                    </div>
                </div>
            </section>

            {/* TASKS AND QUICK ACTIONS */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">

                {/* UPCOMING TASKS */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 xl:col-span-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-[var(--foreground)]">
                                Upcoming Tasks
                            </h2>
                            <p className="mt-1 text-sm text-[var(--muted)]">
                                Keep track of what needs your attention.
                            </p>
                        </div>

                        <button className="flex items-center gap-1 text-sm font-semibold text-[var(--foreground)] hover:opacity-60">
                            View all
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="mt-6 space-y-3">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex flex-col gap-3 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 text-[var(--muted)]">
                                        {task.completed ? (
                                            <CheckCircle2 size={20} />
                                        ) : (
                                            <Circle size={20} />
                                        )}
                                    </div>

                                    <div>
                                        <h3
                                            className={`text-sm font-semibold ${task.completed
                                                ? "text-[var(--muted)] line-through"
                                                : "text-[var(--foreground)]"
                                                }`}
                                        >
                                            {task.title}
                                        </h3>

                                        <p className="mt-1 text-xs text-[var(--muted)]">
                                            {task.subject} · {task.time}
                                        </p>
                                    </div>
                                </div>

                                <span className="w-fit rounded-lg bg-[var(--surface-secondary)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)]">
                                    {task.priority} Priority
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* QUICK ACTIONS */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                    <h2 className="text-lg font-bold text-[var(--foreground)]">
                        Quick Actions
                    </h2>

                    <p className="mt-1 text-sm text-[var(--muted)]">
                        What would you like to do?
                    </p>

                    <div className="mt-6 space-y-3">
                        <button className="flex w-full items-center gap-3 rounded-xl border border-[var(--border)] p-4 text-left transition hover:bg-[var(--surface-secondary)]">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                                <Plus size={20} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[var(--foreground)]">
                                    Create a task
                                </p>
                                <p className="text-xs text-[var(--muted)]">
                                    Add something to your list
                                </p>
                            </div>
                        </button>

                        <button className="flex w-full items-center gap-3 rounded-xl border border-[var(--border)] p-4 text-left transition hover:bg-[var(--surface-secondary)]">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                                <Play size={20} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[var(--foreground)]">
                                    Start focus session
                                </p>
                                <p className="text-xs text-[var(--muted)]">
                                    Focus on your next goal
                                </p>
                            </div>
                        </button>

                        <button className="flex w-full items-center gap-3 rounded-xl border border-[var(--border)] p-4 text-left transition hover:bg-[var(--surface-secondary)]">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                                <BookOpen size={20} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[var(--foreground)]">
                                    Review progress
                                </p>
                                <p className="text-xs text-[var(--muted)]">
                                    Check your study performance
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER MESSAGE */}
            <div className="border-t border-[var(--border)] pt-6 text-center">
                <p className="text-sm text-[var(--muted)]">
                    Stay focused. Stay consistent. Keep growing.
                </p>
            </div>
        </div>
    );
}

export default DashboardPage;
