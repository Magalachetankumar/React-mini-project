import { useState, useEffect } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on page reload
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">📝 Task Manager</h1>

      {/* Input & Add Button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a new task..."
          className="border p-2 rounded-lg w-64"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-2 w-72">
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center">No tasks yet! 🎉</p>
        )}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-white p-3 rounded-xl shadow"
          >
            <span
              onClick={() => toggleTask(task.id)}
              className={`cursor-pointer ${
                task.done ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
