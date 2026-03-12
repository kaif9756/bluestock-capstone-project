import { Link } from "react-router-dom";

export default function Auth() {

  const guestLogin = () => {

    localStorage.setItem("guest","true");

    window.location.href = "/dashboard";

  };

  return (

    <div className="flex justify-center items-center min-h-[80vh]">

      <div className="bg-white p-8 rounded-xl shadow text-center">

        <h2 className="text-xl font-semibold mb-6">
          Continue Playing
        </h2>

        <div className="flex flex-col gap-4">

          <Link to="/login">

            <button className="bg-primary text-white px-4 py-2 rounded-lg">
              Login
            </button>

          </Link>

          <Link to="/signup">

            <button className="border border-primary text-primary px-4 py-2 rounded-lg">
              Sign Up
            </button>

          </Link>

          <button
            onClick={guestLogin}
            className="text-gray-600 hover:text-primary"
          >
            Continue as Guest
          </button>

        </div>

      </div>

    </div>

  );

}