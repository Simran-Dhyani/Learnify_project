import { Search, Bell } from "lucide-react";
import { useSelector } from "react-redux";


function Navbar({searchQuery,setSearchQuery}) {
const user = useSelector((state) => state.auth.userData);
  return (

    <div className="flex items-center justify-between mb-10">

      {/* Search Bar */}

      <div className="relative w-full max-w-xl">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 "
        />

        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          className="
            w-full
            pl-12
            pr-4
            h-12
            rounded-2xl
            border
            border-white/40
            bg-white/20
            backdrop-blur-xl
            shadow-md
            outline-none
            focus:ring-2
            focus:ring-purple-300
            transition
             hover:shadow-purple-500
             text-black
            
          "
        />

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4 ml-6">

        {/* Notification */}

        <button
          className="
            w-12
            h-12
            rounded-2xl
            bg-white/60
            backdrop-blur-xl
            border
            border-white/40
            flex
            items-center
            justify-center
            shadow-md
            hover:scale-105
            transition
          "
        >

          <Bell size={20} />

        </button>

        {/* Avatar */}

        <div
          className="
            w-12
            h-12
            rounded-2xl
            overflow-hidden
            border
            border-white/40
            shadow-md
          "
        >

          <img
            src={user?.avatar||"https://i.pravatar.cc/100"}
            alt="profile"
            className="w-full h-full object-cover"
          />

        </div>

      </div>

    </div>

  );
}

export default Navbar;