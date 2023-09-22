import { useNavigate } from "react-router-dom";
import errorImage from "../../assets/error.jpeg";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="not-found-container bg-gray-200 flex h-screen min-h-full justify-center items-center">
        <div className="text-center">
          <h1 className="text-7xl text-black">404 - Page Not Found</h1>
          <p className="not-found-text text-gray-500 mt-5 text-2xl">
            Oops! The page you are looking for might be in another galaxy.
          </p>
          <button
            className="mx-auto block m-2 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-5"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
          <img
            src={errorImage}
            alt="404 Error with man kneeling in front of server"
            className="m-auto"
          />
        </div>
      </div>
    </>
  );
};
