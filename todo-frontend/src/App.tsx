import { useEffect, useState } from "react";
import { fetchAllTasks } from "./services/api";
import { publishTask } from "./services/mqtt";
import { FaRegStickyNote } from "react-icons/fa";
import NoteItem from "./components/NoteItem";
import type { Task } from "./types";

const App = () => {
  const [note, setNote] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const all = await fetchAllTasks();
    setTasks(all);
  };

  const handleAdd = () => {
    if (note.trim()) {
      publishTask(note.trim());
      setNote("");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-80 bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <FaRegStickyNote className="text-xl text-orange-700" />
          <h2 className="text-xl font-semibold text-gray-800">Note App</h2>
        </div>

        <div className="flex mb-3 gap-2">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="New Note..."
            className="flex-grow border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="bg-orange-700 text-white px-3 py-1 rounded hover:bg-orange-800"
          >
            Add
          </button>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-1 text-gray-700">Notes</h3>
          <div className="max-h-40 overflow-y-auto pr-1">
            {tasks.map((task, i) => (
              <NoteItem key={i} text={task.text} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;