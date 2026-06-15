import { FaBell } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const today = new Date();

  return (
    <div className="bg-slate-900 border border-slate-800 shadow-2xl px-8 py-4 flex justify-between items-center rounded-3xl mb-8">
      <div>
        <h2 className="text-3xl font-bold text-white">
          Welcome Back 👋
        </h2>

        <p className="text-slate-400">
          {today.toDateString()}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <input
          type="text"
          placeholder="Search..."
          className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button className="text-cyan-400 text-xl hover:scale-110 transition">
          <FaBell />
        </button>

        <div className="bg-linear-to-r from-cyan-500 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
          {user?.name?.charAt(0)}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
