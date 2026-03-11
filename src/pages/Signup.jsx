import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

export default function Signup() {

  const navigate = useNavigate();

  const handleSignup = () => {

    localStorage.setItem("user", "true");

    navigate("/dashboard");

  };

  return (

    <div className="flex justify-center items-center min-h-[70vh]">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h2 className="text-xl font-semibold mb-6">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-6"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-primary text-white py-2 rounded flex justify-center items-center gap-2"
        >
          <FaUserPlus />
          Sign Up
        </button>

        <p className="text-sm text-gray-500 text-center mt-6"> Already have an account?{" "} 
          <Link to="/login" className="text-primary font-medium hover:underline"> Login </Link> 
          </p>

      </div>

    </div>

  );

}