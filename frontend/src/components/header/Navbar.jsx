import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-red-900 via-black to-red-700 bg-[length:200%_200%] animate-gradient-bg p-4 flex justify-between items-center shadow-[0_0_20px_rgba(255,0,0,0.8)] font-['Bangers'] fixed w-full top-0 z-50">
      <NavLink
        to="/"
        className="text-4xl font-extrabold text-red-500 drop-shadow-[0_4px_8px_rgba(255,0,0,0.7)] tracking-wider uppercase animate-glow"
      >
        Memory Card Clash
      </NavLink>
      <div className="flex space-x-8">
        <NavLink
          to="/game"
          className={({ isActive }) =>
            `text-xl text-red-300 hover:text-red-500 hover:scale-105 transition duration-200 ${isActive ? "text-red-500 scale-105" : ""}`
          }
        >
          Game
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            `text-xl text-red-300 hover:text-red-500 hover:scale-105 transition duration-200 ${isActive ? "text-red-500 scale-105" : ""}`
          }
        >
          Leaderboard
        </NavLink>
        <NavLink
          to="/my-games"
          className={({ isActive }) =>
            `text-xl text-red-300 hover:text-red-500 hover:scale-105 transition duration-200 ${isActive ? "text-red-500 scale-105" : ""}`
          }
        >
          My Games
        </NavLink>
        <button
          onClick={handleLogout}
          className="text-xl text-red-300 hover:text-red-500 hover:scale-105 transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;