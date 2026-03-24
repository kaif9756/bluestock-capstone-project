import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

export default function Signup() {

  const navigate = useNavigate();

  const handleSignup = () => {
    localStorage.setItem("user", "true");
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow w-full max-w-sm">

        <h2 className="text-lg sm:text-xl font-semibold mb-5">
          Sign Up
        </h2>

        <input type="text" placeholder="Name" className="w-full border p-3 rounded-lg mb-4 text-sm" />
        <input type="email" placeholder="Email" className="w-full border p-3 rounded-lg mb-4 text-sm" />
        <input type="password" placeholder="Password" className="w-full border p-3 rounded-lg mb-5 text-sm" />

        <button
          onClick={handleSignup}
          className="w-full bg-primary text-white py-3 rounded-lg flex justify-center items-center gap-2 active:scale-95"
        >
          <FaUserPlus />
          Sign Up
        </button>

        <p className="text-xs sm:text-sm text-gray-500 text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}