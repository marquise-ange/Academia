
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TaskContext = createContext(null);

const initialTasks = [
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

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useLocalStorage(
        "academia-tasks",
        initialTasks
    );

    // Add a new task
    const addTask = (task) => {
        const newTask = {
            id: Date.now(),
            ...task,
            completed: false,
        };

        setTasks((previousTasks) => [...previousTasks, newTask]);
    };

    // Edit an existing task
    const updateTask = (taskId, updatedDetails) => {
        setTasks((previousTasks) =>
            previousTasks.map((task) =>
                task.id === taskId
                    ? { ...task, ...updatedDetails }
                    : task
            )
        );
    };

    // Delete a task
    const deleteTask = (taskId) => {
        setTasks((previousTasks) =>
            previousTasks.filter((task) => task.id !== taskId)
        );
    };

    // Mark a task as completed or pending
    const toggleTask = (taskId) => {
        setTasks((previousTasks) =>
            previousTasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                updateTask,
                deleteTask,
                toggleTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasks must be used inside TaskProvider");
    }

    return context;
}
