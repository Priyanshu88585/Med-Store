import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  selectUserName,
  selectUserPic,
  selectUserEmail,
  setLogOut,
} from "../feautres/userSlice";

const Account = () => {
  const { t } = useTranslation();
  const [icon, setIcon] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);
  const pic = useSelector(selectUserPic);
  const email = useSelector(selectUserEmail);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIcon(user.photoURL);
      }
    });
  }, []);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setLogOut());
        navigate("/login"); // redirect after logout
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="p-8 font-['Cairo']">
      <div className="bg-white rounded overflow-hidden shadow-lg text-center">
        {/* Profile Section */}
        <div className="bg-slate-200 text-gray-600 p-6">
          <div className="w-24 mx-auto">
            <img
              src={icon || pic || "https://via.placeholder.com/80"}
              alt="profile"
              className="w-20 h-20 rounded-full mx-auto"
            />
          </div>
          <p className="pt-2 text-lg font-semibold">{userName || "Guest"}</p>
          <p className="text-sm">{email || "Not signed in"}</p>
        </div>

        {/* Welcome Message */}
        <div className="border-b">
          <p className="text-sm font-medium text-gray-600 p-6 text-center tracking-wide">
            {t("welcome")}
          </p>
        </div>

        {/* Actions */}
        <div className="text-gray-800 p-4 flex justify-between">
          <button
            className="flex items-center justify-center space-x-2 rounded-md border-2 border-blue-500 px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-500 hover:text-white"
            onClick={() => navigate("/")}
          >
            <span>{t("continue")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            onClick={logOut}
            className="flex items-center justify-center space-x-2 rounded-md border-2 border-red-500 px-4 py-2 font-medium text-red-600 transition hover:bg-red-500 hover:text-white"
          >
            <span>{t("SignOut")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
