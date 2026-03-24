import { Link } from "react-router-dom";

export default function Auth() {

  const guestLogin = () => {
    localStorage.setItem("guest","true");
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow w-full max-w-sm text-center">

        <h2 className="text-lg sm:text-xl font-semibold mb-6">
          Continue Playing
        </h2>

        <div className="flex flex-col gap-3">

          <Link to="/login">
            <button className="w-full bg-primary text-white py-3 rounded-lg">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="w-full border border-primary text-primary py-3 rounded-lg">
              Sign Up
            </button>
          </Link>

          <button
            onClick={guestLogin}
            className="text-sm text-gray-600 hover:text-primary mt-2"
          >
            Continue as Guest
          </button>

        </div>

      </div>

    </div>
  );
}