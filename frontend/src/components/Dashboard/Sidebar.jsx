import {
  Home,
  Folder,
  History,
  User,
  Settings,
  NotebookPen,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {

  const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/dashboard",
  },
  {
    title: "My Notes",
    icon: NotebookPen,
    path: "/my-notes",
  },
  {
    title: "Collections",
    icon: Folder,
    path: "/collections",
  },
  {
    title: "History",
    icon: History,
    path: "/history",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
  return (

    <div className="w-[260px] min-h-screen p-5">

      {/* Glass Sidebar */}

      <div className="h-full rounded-3xl border border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl p-5">

        {/* Logo */}

        <div className="mb-10">

          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-950 to-cyan-500 bg-clip-text text-transparent">
            Learn Smartly
          </h1>

        </div>

        {/* Menu */}

        <div className="space-y-2">
          {menuItems.map((item, index) => {
  const Icon = item.icon;

      return (
    <NavLink
      key={index}
      to={item.path}
      className={({ isActive }) =>
        `
        w-full flex items-center gap-3 px-4 py-3 rounded-2xl
        transition-all duration-300 group
        ${
          isActive
            ? "bg-white shadow-md text-purple-600"
            : "text-gray-700 hover:bg-white hover:shadow-md"
        }
        `
      }
    >
      <Icon size={20} className="group-hover:scale-110 transition" />

      <span className="font-medium">{item.title}</span>
    </NavLink>
  );
})}



        </div>

      </div>

    </div>

  );
}

export default Sidebar;