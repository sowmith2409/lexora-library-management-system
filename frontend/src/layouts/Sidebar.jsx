import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  HandCoins,
  Users,
  RotateCcw,
  LogOut,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  // NAVIGATION

  const navigate = useNavigate();

  const location = useLocation();

  // USER

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const role = user.role?.toLowerCase();

  // ACTIVE LINK

  function isActive(path) {
    return location.pathname === path;
  }

  // LOGOUT

  function handleLogout() {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  }

  return (
    <div
      className="
        w-[290px]
        h-screen
        fixed
        left-0
        top-0
        bg-white
        border-r
        border-gray-200
        flex
        flex-col
        justify-between
        px-6
        py-8
      "
    >
      {/* TOP */}

      <div>
        {/* LOGO */}

        <div
          className="
            h-[90px]
            border-b
            border-gray-200
            flex
            items-center
            px-7
            gap-4
          "
        >
          {/* ICON */}

          <div
            className="
              w-10
              h-10
              rounded-lg
              bg-slate-900
              text-white
              flex
              items-center
              justify-center
              text-xl
              font-bold
            "
          >
            L
          </div>

          {/* TITLE */}
          <div>
            <h1
              className="
                text-[22px]
                font-serif
                font-semibold
                text-slate-900
              "
            >
              Lexora
            </h1>
          </div>
        </div>

        {/* MENU */}

        <div
          className="
            px-5
            pt-8
          "
        >
          <p
            className="
              text-gray-400
              text-sm
              font-semibold
              mb-5
              tracking-wide
            "
          >
            MENU
          </p>

          <div
            className="
              flex
              flex-col
              gap-2
            "
          >
            {/* DASHBOARD */}

            {role === "admin" && (
              <Link
                to="/dashboard"
                className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-[17px]
                    transition

                    ${
                      isActive("/dashboard")
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-gray-100"
                    }
                  `}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
            )}

            {/* CATALOG */}

            <Link
              to="/books"
              className={`
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-[17px]
                transition

                ${
                  isActive("/books")
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-gray-100"
                }
              `}
            >
              <BookOpen size={20} />
              Catalog
            </Link>

            {/* INVENTORY */}

            {(role === "admin" || role === "librarian") && (
              <Link
                to="/inventory"
                className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-[17px]
                    transition

                    ${
                      isActive("/inventory")
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-gray-100"
                    }
                  `}
              >
                <ClipboardList size={20} />
                Inventory
              </Link>
            )}

            {/* BORROW REQUESTS */}

            {(role === "admin" || role === "librarian") && (
              <Link
                to="/borrow-requests"
                className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-[17px]
                    transition

                    ${
                      isActive("/borrow-requests")
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-gray-100"
                    }
                  `}
              >
                <ClipboardList size={20} />
                Requests
              </Link>
            )}

            {/* RETURNS */}

            {(role === "admin" || role === "librarian") && (
              <Link
                to="/returns"
                className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-[17px]
                    transition

                    ${
                      isActive("/returns")
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-gray-100"
                    }
                  `}
              >
                <RotateCcw size={20} />
                Returns
              </Link>
            )}

            {/* USERS */}

            {role === "admin" && (
              <Link
                to="/users"
                className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-[17px]
                    transition

                    ${
                      isActive("/users")
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-gray-100"
                    }
                  `}
              >
                <Users size={20} />
                Users
              </Link>
            )}

            {/* ALL FINES */}

            {role === "admin" && (
              <Link
                to="/fines"
                className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-[17px]
                    transition

                    ${
                      isActive("/fines")
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-gray-100"
                    }
                  `}
              >
                <HandCoins size={20} />
                All Fines
              </Link>
            )}

            {/* MEMBER PAGES */}

            {role === "member" && (
              <>
                {/* MY BORROWS */}

                <Link
                  to="/my-borrows"
                  className={`
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-[17px]
                      transition

                      ${
                        isActive("/my-borrows")
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-gray-100"
                      }
                    `}
                >
                  <ClipboardList size={20} />
                  My Borrows
                </Link>

                {/* MY FINES */}

                <Link
                  to="/my-fines"
                  className={`
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-[17px]
                      transition

                      ${
                        isActive("/my-fines")
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-gray-100"
                      }
                    `}
                >
                  <HandCoins size={20} />
                  My Fines
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div
        className="
          border-t
          border-gray-200
          p-5
        "
      >
        {/* USER */}

        <div
          className="
            flex
            items-center
            gap-4
            mb-5
          "
        >
          {/* AVATAR */}

          <div
            className="
              w-11
              h-11
              rounded-full
              bg-gray-100
              flex
              items-center
              justify-center
              font-semibold
              text-slate-900
            "
          >
            {user.name?.charAt(0)}
          </div>

          {/* USER INFO */}

          <div>
            <h3
              className="
                font-semibold
                text-slate-900
              "
            >
              {user.name}
            </h3>

            <p
              className="
                text-sm
                text-gray-400
              "
            >
              {user.role}
            </p>
          </div>
        </div>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="
            w-full
            border
            border-gray-200
            rounded-xl
            py-3
            flex
            items-center
            justify-center
            gap-3
            text-slate-700
            hover:bg-gray-100
            transition
          "
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
