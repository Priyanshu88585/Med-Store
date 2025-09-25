import React, { useState, useEffect } from "react";
import "./css_files/Header.css";
import Logo from "../images/logo.png";
import { BsPersonPlusFill, BsPersonFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { RiShareForward2Line } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, setLogOut } from "../feautres/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function Header() {
  const { t } = useTranslation();
  const { cart } = useSelector((state) => state.allCart);
  const [open, setOpen] = useState(false);
  const userName = useSelector(selectUserName);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(!open);

  const logOut = () => {
    signOut(auth)
      .then(() => dispatch(setLogOut()))
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPhoto(user.photoURL);
        localStorage.setItem("name", user.displayName || "");
        localStorage.setItem("email", user.email || "");
        localStorage.setItem("photo", user.photoURL || "");
      }
    });
  }, []);

  return (
    <nav>
      <input id="nav-toggle" type="checkbox" />
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="logo" onClick={() => navigate("/")} />
      </div>

      {/* Nav Links */}
      <ul className="links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("header")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contactUs"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("headerContact")}
          </NavLink>
        </li>
      </ul>

      {/* Right Section */}
      <div className="icons font-bold flex mt-[21px] relative">
        {/* Profile / Login */}
        <div className="relative">
          <button onClick={handleOpen}>
            {userName ? (
              <img
                alt="user"
                src={photo || "https://via.placeholder.com/38"}
                width={38}
                className="rounded-full"
              />
            ) : (
              <BsPersonPlusFill size={32} className="text-tb" />
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 z-50 w-48 bg-white rounded-2xl shadow-lg font-['Cairo']">
              {userName ? (
                <Link
                  to="/account"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Hi, {userName}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Login
                </Link>
              )}

              <hr />

              <Link
                to="/account"
                className="flex px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                <BsPersonFill className="mr-2" size={20} /> Profile
              </Link>
              <Link
                to="/account"
                className="flex px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                <FiSettings className="mr-2" size={20} /> Settings
              </Link>

              <hr />

              <button
                onClick={logOut}
                className="flex w-full px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Logout
                <RiShareForward2Line className="ml-2" size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Cart */}
        <NavLink to="/Card" className="items-center ml-6">
          <div className="relative scale-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-10 w-10 text-tb"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 
                 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 
                 2.1-4.684 2.924-7.138a60.114 60.114 
                 0 00-16.536-1.84M7.5 14.25L5.106 
                 5.272M6 20.25a.75.75 0 11-1.5 
                 0 .75.75 0 011.5 0zm12.75 0a.75.75 
                 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span className="absolute -top-2 left-4 rounded-full bg-red-500 px-2 text-sm text-white">
              {cart.length}
            </span>
          </div>
        </NavLink>
      </div>

      {/* Burger menu */}
      <label htmlFor="nav-toggle" className="icon-burger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </label>
    </nav>
  );
}

export default Header;
