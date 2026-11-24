
import { useState } from "react";
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
    Trash2,
} from "lucide-react";
import { useTasks } from "../context/TaskContext";

function TasksPage() {
    const { tasks, toggleTask, deleteTask } = useTasks();

    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("default");
    const [openMenu, setOpenMenu] = useState(null);

    // Task statistics
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    // Search and filter tasks
    const filteredTasks = tasks
        .filter((task) => {
            const matchesSearch =
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.subject.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilter =
                activeFilter === "All" ||
                (activeFilter === "Pending" && !task.completed) ||
                (activeFilter === "Completed" && task.completed);

            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            if (sortOrder === "alphabetical") {
                return a.title.localeCompare(b.title);
            }

            if (sortOrder === "priority") {
                const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                return (
                    (priorityOrder[a.priority] || 4) -
                    (priorityOrder[b.priority] || 4)
                );
            }

            return 0;
        });

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
                    onClick={() => alert("Task creation will be implemented in our next step.")}
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
                        {String(totalTasks).padStart(2, "0")}
                    </h2>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                        Tasks in your list
                    </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                    <p className="text-sm text-[var(--muted)]">Pending</p>
                    <h2 className="mt-2 text-3xl font-bold text-[var(--foreground)]">
                        {String(pendingTasks).padStart(2, "0")}
                    </h2>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                        Still need your attention
                    </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                    <p className="text-sm text-[var(--muted)]">Completed</p>
                    <h2 className="mt-2 text-3xl font-bold text-[var(--foreground)]">
                        {String(completedTasks).padStart(2, "0")}
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
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search your tasks..."
                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-3 pl-11 pr-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--foreground)]"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                setActiveFilter(
                                    activeFilter === "All" ? "Pending" : "All"
                                )
                            }
                            className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]"
                        >
                            <ListFilter size={16} />
                            Filter
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setSortOrder(
                                    sortOrder === "default"
                                        ? "alphabetical"
                                        : sortOrder === "alphabetical"
                                            ? "priority"
                                            : "default"
                                )
                            }
                            className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]"
                        >
                            <ArrowUpDown size={16} />
                            Sort: {sortOrder === "default" ? "Default" : sortOrder === "alphabetical" ? "A–Z" : "Priority"}
                        </button>
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--border)] pt-5">
                    {["All", "Pending", "Completed"].map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeFilter === filter
                                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                                    : "text-[var(--muted)] hover:bg-[var(--surface-secondary)]"
                                }`}
                        >
                            {filter === "All" ? "All Tasks" : filter}
                        </button>
                    ))}
                </div>
            </section>

            {/* TASK LIST */}
            <section>
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-[var(--foreground)]">
                            {activeFilter === "All" ? "All Tasks" : `${activeFilter} Tasks`}
                        </h2>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                            Your current study activities.
                        </p>
                    </div>

                    <span className="text-sm text-[var(--muted)]">
                        {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
                    </span>
                </div>

                <div className="space-y-3">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <article
                                key={task.id}
                                className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--foreground)] sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-start gap-4">
                                    <button
                                        type="button"
                                        onClick={() => toggleTask(task.id)}
                                        aria-label={
                                            task.completed
                                                ? `Mark ${task.title} as pending`
                                                : `Mark ${task.title} as completed`
                                        }
                                        className="mt-1 text-[var(--muted)] transition hover:text-[var(--foreground)]"
                                    >
                                        {task.completed ? (
                                            <CheckCircle2 size={21} />
                                        ) : (
                                            <Circle size={21} />
                                        )}
                                    </button>

                                    <div>
                                        <h3
                                            className={`text-sm font-semibold ${task.completed
                                                    ? "text-[var(--muted)] line-through"
                                                    : "text-[var(--foreground)]"
                                                }`}
                                        >
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

                                    <div className="relative">
                                        <button
                                            type="button"
                                            aria-label={`More options for ${task.title}`}
                                            aria-expanded={openMenu === task.id}
                                            onClick={() =>
                                                setOpenMenu(
                                                    openMenu === task.id ? null : task.id
                                                )
                                            }
                                            className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--surface-secondary)]"
                                        >
                                            <MoreHorizontal size={20} />
                                        </button>

                                        {openMenu === task.id && (
                                            <div className="absolute right-0 top-full z-10 mt-2 w-40 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        deleteTask(task.id);
                                                        setOpenMenu(null);
                                                    }}
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]"
                                                >
                                                    <Trash2 size={16} />
                                                    Delete task
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-5 py-12 text-center">
                            <BookOpen size={30} className="mx-auto text-[var(--muted)]" />
                            <h3 className="mt-4 font-semibold text-[var(--foreground)]">
                                No tasks found
                            </h3>
                            <p className="mt-2 text-sm text-[var(--muted)]">
                                Try changing your search or filter.
                            </p>
                        </div>
                    )}
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
