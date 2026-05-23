import { Search, Bell } from "lucide-react";

function Navbar() {
  // USER

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div
      className="
        flex
        items-center
        justify-between
        mb-10
      "
    >
      {/* LEFT */}

      <div>
        <h1
          className="
            text-5xl
            font-serif
            font-bold
            text-slate-900
            leading-none
            mb-2
          "
        >
          Dashboard
        </h1>

        <p
          className="
            text-gray-500
            text-lg
          "
        >
          Welcome back, {user.name}
        </p>
      </div>

      {/* RIGHT */}

      <div
        className="
          flex
          items-center
          gap-5
        "
      >
        {/* SEARCH */}

        <div
          className="
            flex
            items-center
            gap-3
            bg-white
            border
            border-gray-200
            rounded-2xl
            px-4
            h-[54px]
            w-[320px]
          "
        >
          <Search
            size={18}
            className="
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="
              Search...
            "
            className="
              w-full
              outline-none
              bg-transparent
              text-sm
              text-slate-700
              placeholder:text-gray-400
            "
          />
        </div>

        {/* NOTIFICATION */}

        <button
          className="
            w-12
            h-12
            rounded-2xl
            bg-white
            border
            border-gray-200
            flex
            items-center
            justify-center
            text-slate-700
            hover:bg-gray-100
            transition
          "
        >
          <Bell size={20} />
        </button>

        {/* USER */}

        <div
          className="
            w-12
            h-12
            rounded-full
            bg-slate-900
            text-white
            flex
            items-center
            justify-center
            font-semibold
            text-lg
          "
        >
          {user.name?.charAt(0)}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
