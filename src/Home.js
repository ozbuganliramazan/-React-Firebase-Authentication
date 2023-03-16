import React from "react";
import { logout, auth, emailVerification } from "./Firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { async } from "@firebase/util";
import { logout as logoutHandel } from "./store/auth";
import UpdateProfile from "./components/UpdateProfile";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandel());
    navigate("/login", {
      replace: true,
    });
  };
 

  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="max-w-2xl mx-auto py-5">
        <h1 className="flex gap-4 items-center">
        {user.photoURL && <img src={user.photoURL} className="w-7 h-7 rounded-full" />}
          Oturumun açık ({user.email})
          <button
            onClick={handleLogout}
            className="h-10 rounded px-4 text-sm text-white bg-indigo-700"
          >
            Çıkış yap
          </button>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="h-10 rounded px-4 text-sm text-white bg-indigo-700"
            >
              E-posta Onayla
            </button>
          )}
        </h1>

        <UpdateProfile />
      </div>
    );
  }
  return (
    <div className="items-center justify-center grid gap-5">
      <Link  className=" cursor-pointer inline-flex items-center disabled:opacity-30 px4 py-2 border border-transparent text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:right-2 focus:ring-offset-2 focus:ring-indigo-500" to={"/register"}>Kayıt ol</Link>
      <Link  className=" cursor-pointer inline-flex items-center disabled:opacity-30  px4 py-2 border border-transparent text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:right-2 focus:ring-offset-2 focus:ring-indigo-500" to={"/login"}>Giriş yap</Link>
    </div>
  );
};

export default Home;
