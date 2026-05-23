import { useEffect, useState } from "react";

import { Trash2, User } from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

function UsersPage() {
  // STATES

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH USERS

  async function fetchUsers() {
    try {
      const response = await api.get("/users");

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // PAGE LOAD

  useEffect(() => {
    fetchUsers();
  }, []);

  // DELETE USER

  async function handleDeleteUser(userId) {
    const confirmDelete = window.confirm("Delete this user?");

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/users/${userId}`);

      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete user");
    }
  }

  return (
    <MainLayout>
      {/* HEADER */}

      <div
        className="
          mb-10
        "
      >
        <h1
          className="
            text-3xl
            font-serif
            font-bold
            text-slate-900
            mb-3
          "
        >
          Users
        </h1>

        <p
          className="
            text-gray-500
            text-20px
          "
        >
          Manage system users and roles.
        </p>
      </div>

      {/* TABLE */}

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-3xl
          overflow-hidden
        "
      >
        {/* HEADER */}

        <div
          className="
            grid
            grid-cols-[2fr_2fr_1.5fr_1fr]
            px-8
            py-5
            bg-gray-50
            text-sm
            font-medium
            text-gray-500
          "
        >
          <div>User</div>

          <div>Email</div>

          <div>Role</div>

          <div>Actions</div>
        </div>

        {/* BODY */}

        {loading ? (
          <div
            className="
                p-10
                text-center
                text-gray-500
              "
          >
            Loading users...
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="
                    grid
                    grid-cols-[2fr_2fr_1.5fr_1fr]
                    items-center
                    px-8
                    py-6
                    border-t
                    border-gray-100
                    hover:bg-gray-50
                    transition
                  "
            >
              {/* USER */}

              <div
                className="
                      flex
                      items-center
                      gap-4
                    "
              >
                {/* AVATAR */}

                <div
                  className="
                        w-12
                        h-12
                        rounded-full
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-slate-700
                      "
                >
                  <User size={20} />
                </div>

                {/* INFO */}

                <div>
                  <h3
                    className="
                          text-[18px]
                          font-semibold
                          text-slate-900
                        "
                  >
                    {user.name}
                  </h3>
                </div>
              </div>

              {/* EMAIL */}

              <div
                className="
                      text-gray-600
                    "
              >
                {user.email}
              </div>

              {/* ROLE */}

              <div>
                <span
                  className={`
                        px-4
                        py-2
                        rounded-xl
                        text-sm
                        font-medium
                        capitalize

                        ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "librarian"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                        }
                      `}
                >
                  {user.role}
                </span>
              </div>

              {/* ACTIONS */}

              <div>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="
                        w-10
                        h-10
                        rounded-xl
                        bg-red-100
                        text-red-700
                        flex
                        items-center
                        justify-center
                        hover:bg-red-200
                        transition
                      "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}

export default UsersPage;
