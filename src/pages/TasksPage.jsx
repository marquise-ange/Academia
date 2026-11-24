
import {
    Plus,
    Search,
    ListFilter,
    CalendarDays,
    Clock3,
    CheckCircle2,
    Circle,
    MoreHorizontal,
    BookOpen,
    ArrowUpDown,
} from "lucide-react";

const sampleTasks = [
    {
        id: 1,
        title: "Complete React components",
        subject: "Web Development",
        dueDate: "Today",
        priority: "High",
        completed: false,
    },
    {
        id: 2,
        title: "Review database concepts",
        subject: "Database Management",
        dueDate: "Tomorrow",
        priority: "Medium",
        completed: false,
    },
    {
        id: 3,
        title: "Read Chapter 4 notes",
        subject: "Information Management",
        dueDate: "Today",
        priority: "Low",
        completed: true,
    },
    {
        id: 4,
        title: "Practice JavaScript exercises",
        subject: "Web Development",
        dueDate: "Friday",
        priority: "High",
        completed: false,
    },
    {
        id: 5,
        title: "Prepare accounting revision notes",
        subject: "Accounting",
        dueDate: "Saturday",
        priority: "Medium",
        completed: false,
    },
];

function TasksPage() {
    return (
        <div className="space-y-8 pb-10">

            {/* PAGE HEADER */}
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-medium text-[var(--muted)]">
                        Stay organized
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                        My Tasks
                    </h1>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                        Manage your assignments, priorities, and study plans.
                    </p>
                </div>

                <button
                    type="button"
                    className="flex w-fit items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-80"
                >
                    <Plus size={18} />
                    Add New Task
                </button>
            </section>

            {/* TASK SUMMARY */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                    <p className="text-sm text-[var(--muted)]">Total Tasks</p>
                    <h2 className="mt-2 text-3xl font-bold text-[var(--foreground)]">
                        05
                    </h2>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                        Tasks in your list
                    </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                    <p className="text-sm text-[var(--muted)]">Pending</p>
                    <h2 className="mt-2 text-3xl font-bold text-[var(--foreground)]">
                        04
                    </h2>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                        Still need your attention
                    </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                    <p className="text-sm text-[var(--muted)]">Completed</p>
                    <h2 className="mt-2 text-3xl font-bold text-[var(--foreground)]">
                        01
                    </h2>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                        Great progress so far
                    </p>
                </div>
            </section>

            {/* SEARCH AND FILTERS */}
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div className="relative w-full lg:max-w-md">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                        />

                        <input
                            type="text"
                            placeholder="Search your tasks..."
                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-3 pl-11 pr-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--foreground)]"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]">
                            <ListFilter size={16} />
                            Filter
                        </button>

                        <button className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]">
                            <ArrowUpDown size={16} />
                            Sort
                        </button>
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--border)] pt-5">
                    <button className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)]">
                        All Tasks
                    </button>

                    <button className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--surface-secondary)]">
                        Pending
                    </button>

                    <button className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--surface-secondary)]">
                        Completed
                    </button>
                </div>
            </section>

            {/* TASK LIST */}
            <section>
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-[var(--foreground)]">
                            All Tasks
                        </h2>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                            Your current study activities.
                        </p>
                    </div>

                    <span className="text-sm text-[var(--muted)]">
                        5 tasks
                    </span>
                </div>

                <div className="space-y-3">
                    {sampleTasks.map((task) => (
                        <article
                            key={task.id}
                            className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--foreground)] sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1 text-[var(--muted)]">
                                    {task.completed ? (
                                        <CheckCircle2 size={21} />
                                    ) : (
                                        <Circle size={21} />
                                    )}
                                </div>

                                <div>
                                    <h3 className={`text-sm font-semibold ${task.completed
                                            ? "text-[var(--muted)] line-through"
                                            : "text-[var(--foreground)]"
                                        }`}>
                                        {task.title}
                                    </h3>

                                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
                                        <span className="flex items-center gap-1">
                                            <BookOpen size={14} />
                                            {task.subject}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <CalendarDays size={14} />
                                            {task.dueDate}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 sm:justify-end">
                                <span className="rounded-lg bg-[var(--surface-secondary)] px-3 py-2 text-xs font-medium text-[var(--foreground)]">
                                    {task.priority} Priority
                                </span>

                                <button
                                    type="button"
                                    aria-label={`More options for ${task.title}`}
                                    className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--surface-secondary)]"
                                >
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* BOTTOM MESSAGE */}
            <div className="flex items-center gap-3 border-t border-[var(--border)] pt-6">
                <Clock3 size={18} className="text-[var(--muted)]" />
                <p className="text-sm text-[var(--muted)]">
                    Every completed task brings you one step closer to your goals.
                </p>
            </div>
        </div>
    );
}

export default TasksPage;
