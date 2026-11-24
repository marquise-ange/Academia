
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
    X,
} from "lucide-react";

import { useTasks } from "../context/TaskContext";
import { useToast } from "../context/ToastContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

const emptyForm = {
    title: "",
    subject: "",
    dueDate: "",
    priority: "Medium",
};

function TasksPage() {
    useDocumentTitle("My Tasks");

    const { tasks, addTask, toggleTask, deleteTask } = useTasks();
    const { showToast } = useToast();

    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("default");
    const [openMenu, setOpenMenu] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [formError, setFormError] = useState("");

    // Task statistics
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    // Search, filter and sort
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

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    // Add a new task
    const handleAddTask = (event) => {
        event.preventDefault();

        if (
            !formData.title.trim() ||
            !formData.subject.trim() ||
            !formData.dueDate
        ) {
            setFormError("Please complete all fields.");
            return;
        }

        addTask({
            title: formData.title.trim(),
            subject: formData.subject.trim(),
            dueDate: formData.dueDate,
            priority: formData.priority,
        });

        setFormData(emptyForm);
        setFormError("");
        setIsModalOpen(false);

        showToast("Task added successfully!", "success");
    };

    // Complete or reopen a task
    const handleToggleTask = (task) => {
        toggleTask(task.id);

        showToast(
            task.completed
                ? "Task moved back to pending."
                : "Task marked as completed!",
            "success"
        );
    };

    // Delete a task
    const handleDeleteTask = (taskId) => {
        deleteTask(taskId);
        setOpenMenu(null);

        showToast("Task deleted successfully!", "success");
    };

    // Close and reset modal
    const closeModal = () => {
        setIsModalOpen(false);
        setFormData(emptyForm);
        setFormError("");
    };

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
                    onClick={() => setIsModalOpen(true)}
                    className="flex w-fit items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-80"
                >
                    <Plus size={18} />
                    Add New Task
                </button>
            </section>

            {/* TASK SUMMARY */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                    {
                        label: "Total Tasks",
                        value: totalTasks,
                        description: "Tasks in your list",
                    },
                    {
                        label: "Pending",
                        value: pendingTasks,
                        description: "Still need your attention",
                    },
                    {
                        label: "Completed",
                        value: completedTasks,
                        description: "Great progress so far",
                    },
                ].map((item) => (
                    <div
                        key={item.label}
                        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                    >
                        <p className="text-sm text-[var(--muted)]">
                            {item.label}
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-[var(--foreground)]">
                            {String(item.value).padStart(2, "0")}
                        </h2>

                        <p className="mt-2 text-xs text-[var(--muted)]">
                            {item.description}
                        </p>
                    </div>
                ))}
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
                            Sort:{" "}
                            {sortOrder === "default"
                                ? "Default"
                                : sortOrder === "alphabetical"
                                    ? "A–Z"
                                    : "Priority"}
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
                            {activeFilter === "All"
                                ? "All Tasks"
                                : `${activeFilter} Tasks`}
                        </h2>

                        <p className="mt-1 text-sm text-[var(--muted)]">
                            Your current study activities.
                        </p>
                    </div>

                    <span className="text-sm text-[var(--muted)]">
                        {filteredTasks.length}{" "}
                        {filteredTasks.length === 1 ? "task" : "tasks"}
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
                                        onClick={() => handleToggleTask(task)}
                                        aria-label={
                                            task.completed
                                                ? "Mark as pending"
                                                : "Mark as completed"
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
                                            onClick={() =>
                                                setOpenMenu(
                                                    openMenu === task.id
                                                        ? null
                                                        : task.id
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
                                                    onClick={() =>
                                                        handleDeleteTask(task.id)
                                                    }
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
                            <BookOpen
                                size={30}
                                className="mx-auto text-[var(--muted)]"
                            />

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

            {/* ADD TASK MODAL */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-task-title"
                        className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2
                                    id="add-task-title"
                                    className="text-xl font-bold text-[var(--foreground)]"
                                >
                                    Create a New Task
                                </h2>

                                <p className="mt-1 text-sm text-[var(--muted)]">
                                    Add something you want to accomplish.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Close form"
                                className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--surface-secondary)]"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddTask} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                                >
                                    Task Title
                                </label>

                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Complete React assignment"
                                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                                >
                                    Subject
                                </label>

                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Web Development"
                                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="dueDate"
                                    className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                                >
                                    Due Date
                                </label>

                                <input
                                    id="dueDate"
                                    name="dueDate"
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="priority"
                                    className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                                >
                                    Priority
                                </label>

                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>

                            {formError && (
                                <p
                                    role="alert"
                                    className="text-sm text-[var(--foreground)]"
                                >
                                    {formError}
                                </p>
                            )}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-80"
                                >
                                    Save Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TasksPage;
