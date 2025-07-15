import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User2, Trash2, Download } from "lucide-react";

export default function PersonasList() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/list-personas")
      .then((res) => res.json())
      .then((data) => {
        setPersonas(data.personas || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (username) => {
    try {
      await fetch(`http://localhost:8000/delete?username=${username}`, {
        method: "DELETE",
      });
      setPersonas((prev) => prev.filter((p) => p !== username));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleDownload = (username) => {
    const link = document.createElement("a");
    link.href = `http://localhost:8000/persona?username=${username}`;
    link.download = `${username}_persona.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-37 w-full mx-auto">
      <h1 className="text-6xl font-bold mb-20">🧠 Saved Personas</h1>
      {loading ? (
        <p className="text-gray-400">Loading personas...</p>
      ) : personas.length === 0 ? (
        <p className="text-gray-400">No personas found in output folder.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {personas.map((username) => (
            <div
              key={username}
              className="bg-zinc-900 border border-zinc-700 hover:border-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col gap-3"
            >
              {/* Profile Icon */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <User2 className="text-white" />
                </div>
                <Link className="text-2xl font-semibold hover:underline">
                  {username}
                </Link>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4 relative">
                <Link
                  to={`/personas/${username}`}
                  className="bg-green-500 hover:bg-green-700 text-sm text-white py-2 px-4 rounded flex items-center gap-2"
                >
                  👁️ View
                </Link>
                <button
                  onClick={() => handleDownload(username)}
                  className="bg-gray-800 hover:bg-gray-700 text-sm text-white py-2 px-4 rounded flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => handleDelete(username)}
                  className="bg-red-600 absolute right-0 top-[-75px] hover:bg-red-700 text-sm text-white py-2 px-4 rounded flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
