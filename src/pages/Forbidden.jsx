import { FaBan } from "react-icons/fa";
import { useNavigate } from "react-router";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-white dark:from-gray-900 dark:to-black px-6">
      <div className="text-center max-w-md p-8 rounded-2xl shadow-lg bg-white dark:bg-base-200 border border-red-300 dark:border-red-600">
        <div className="text-red-500 mb-4">
          <FaBan className="text-6xl mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">403 Forbidden</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Oops! You don’t have permission to access this page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-primary hover:bg-accent text-white font-semibold rounded-lg transition-all duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Forbidden;