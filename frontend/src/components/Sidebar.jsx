import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-72 min-h-screen bg-slate-950 text-white border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold">EduScoreX AI</h1>
        <p className="text-slate-400 text-sm mt-1">Academic Intelligence Suite</p>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-3">
        <Link to="/dashboard">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black transition-all duration-300">
            📊 Dashboard
          </button>
        </Link>

        {user?.role !== "student" ? (
          <Link to="/students">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black transition-all duration-300">
              👨‍🎓 Students
            </button>
          </Link>
        ) : (
          <Link to={`/report/${user.studentId}`}>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black transition-all duration-300">
              📄 My Report
            </button>
          </Link>
        )}

        {user?.role === "student" && (
          <Link to="/my-attendance">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black transition-all duration-300">
              📅 My Attendance
            </button>
          </Link>
        )}

        {user?.role === "student" && (
          <Link to="/my-rank">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black transition-all duration-300">
              🏆 My Rank
            </button>
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/manage-classes">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black transition-all duration-300">
              🏫 Manage Classes
            </button>
          </Link>
        )}

        {user?.role !== "student" && (
          <Link to="/leaderboard">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black transition-all duration-300">
              🏆 Leaderboard
            </button>
          </Link>
        )}

        {user?.role !== "student" && (
          <Link to="/add-student">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black transition-all duration-300">
              ➕ Add Student
            </button>
          </Link>
        )}

        {user?.role !== "student" && (
          <Link to="/attendance">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black transition-all duration-300">
              📅 Attendance
            </button>
          </Link>
        )}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="mb-4 p-3 rounded-xl bg-slate-900">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-slate-400 text-sm capitalize">{user?.role}</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          className="w-full px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-all duration-300"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
