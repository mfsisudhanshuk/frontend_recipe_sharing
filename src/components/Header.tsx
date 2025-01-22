import { useState } from "react";
import { MENU_ITEMS } from "../utils/constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions, RootState } from "../store";

const NavMenu = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) => (
  <div
    className={`fixed top-0 left-0 z-50 w-full h-full bg-white p-6 transition-transform transform lg:relative lg:flex lg:w-auto lg:p-0 lg:bg-transparent lg:h-auto ${
      isOpen ? "translate-x-0 top-16" : "-translate-x-full"
    }`}
  >
    <button
      className="absolute top-2 right-2 lg:hidden"
      onClick={toggleMenu}
      aria-label="Close Menu"
    >
      {/* Close Icon */}
      <svg
        className="w-6 h-6 text-gray-700"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <ul className="flex flex-col gap-4 items-center lg:flex-row lg:items-center lg:space-x-8">
      {MENU_ITEMS.map((item) => (
        <li key={item.MENU}>
          <Link
            to={item.URL}
            className="text-gray-700 hover:text-blue-500 lg:text-base font-medium block"
          >
            {item.MENU}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      {/* Logo on the left */}
      <Link
        to="/"
        className="text-xl font-bold text-gray-800 hover:text-blue-500"
      >
        Recipes
      </Link>

      {/* Action Buttons on the right - Updated for mobile visibility */}
      <div className="flex items-center space-x-4 lg:hidden">
        {/* Updated to always show buttons */}
        {isLogin ? (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Desktop & Mobile Menu Toggle */}
      <div className="lg:hidden">
        <button onClick={toggleMenu} aria-label="Open Menu">
          {/* Menu Icon */}
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      {/* Centered Nav Menu for desktop */}
      <NavMenu isOpen={menuOpen} toggleMenu={toggleMenu} />

      {/* Action Buttons on the right */}
      <div className="hidden lg:flex items-center space-x-4">
         {isLogin ? (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;