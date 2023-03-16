import { async } from "@firebase/util";
import { useState } from "react";
import { update, auth } from "../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch(login({
      displayName: auth.currentUser.displayName,
        email:auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
    }));
  };
 

  return (
   <div className="grid gap-y-10">
 <form onSubmit={handleSubmit} className="gfrid gap-y-4 ">
      <h1 className="text-xl font-bold mb-4">Profili Güncelle</h1>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ad-soyad
        </label>
        <div className="mt-1">
          <input
            type={"text"}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="John doe"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fotoğraf
          </label>
          <div className="mt-1">
            <input
              type={"text"}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Fotoğraf"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className=" my-4 cursor-pointer inline-flex items-center disabled:opacity-30  px4 py-2 border border-transparent text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:right-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Güncelle
        </button>
      </div>
    </form>
   </div>
  );
};
export default UpdateProfile;
