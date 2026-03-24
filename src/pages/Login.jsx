import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

export default function Login() {

  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("user", "true");
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow w-full max-w-sm">

        <h2 className="text-lg sm:text-xl font-semibold mb-5">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4 text-sm"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-5 text-sm"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-3 rounded-lg flex justify-center items-center gap-2 active:scale-95"
        >
          <FaSignInAlt />
          Login
        </button>

        <p className="text-xs sm:text-sm text-gray-500 text-center mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-medium">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}