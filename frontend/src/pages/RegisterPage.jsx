import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

function RegisterPage() {
  // NAVIGATION

  const navigate = useNavigate();

  // STATES

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("Member");

  const [loading, setLoading] = useState(false);

  // REGISTER

  async function handleRegister(event) {
    event.preventDefault();

    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#f8f8f7]
        flex
        items-center
        justify-center
        px-5
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-3xl
          border
          border-gray-200
          p-10
        "
      >
        {/* LOGO */}

        <div
          className="
            flex
            items-center
            gap-4
            mb-10
          "
        >
          <div
            className="
              w-12
              h-12
              rounded-xl
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

          <div>
            <h1
              className="
                text-3xl
                font-serif
                font-bold
                text-slate-900
              "
            >
              Lexora
            </h1>

            <p
              className="
                text-gray-500
              "
            >
              Smart Library. Seamless Experience.
            </p>
          </div>
        </div>

        {/* TITLE */}

        <div
          className="
            mb-8
          "
        >
          <h2
            className="
              text-4xl
              font-serif
              font-bold
              text-slate-900
              mb-3
            "
          >
            Create Account
          </h2>

          <p
            className="
              text-gray-500
            "
          >
            Register to access the library
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleRegister}
          className="
            space-y-6
          "
        >
          {/* NAME */}

          <div>
            <label
              className="
                block
                mb-2
                font-medium
                text-slate-700
              "
            >
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                px-4
                py-3
                outline-none
                focus:border-slate-900
              "
            />
          </div>

          {/* EMAIL */}

          <div>
            <label
              className="
                block
                mb-2
                font-medium
                text-slate-700
              "
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                px-4
                py-3
                outline-none
                focus:border-slate-900
              "
            />
          </div>

          {/* PASSWORD */}

          <div>
            <label
              className="
                block
                mb-2
                font-medium
                text-slate-700
              "
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                px-4
                py-3
                outline-none
                focus:border-slate-900
              "
            />
          </div>

          {/* ROLE */}

          <div>
            <label
              className="
                block
                mb-2
                font-medium
                text-slate-700
              "
            >
              Role
            </label>

            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                px-4
                py-3
                outline-none
                focus:border-slate-900
              "
            >
              <option value="Member">Member</option>

              <option value="Librarian">Librarian</option>

              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-slate-900
              text-white
              py-3
              rounded-2xl
              hover:bg-slate-800
              transition
            "
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* LOGIN */}

        <p
          className="
            text-center
            text-gray-500
            mt-8
          "
        >
          Already have an account?{" "}
          <Link
            to="/"
            className="
              text-slate-900
              font-semibold
            "
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
