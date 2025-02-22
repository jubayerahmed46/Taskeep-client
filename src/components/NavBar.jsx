import { IoMenu } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import ToastMessage from "./ToastMessage";
import { useState } from "react";

function NavBar() {
  const { user, logoutUser, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logoutUser().then(() => {
      ToastMessage("Logout successfully!", { icon: "success" });
    });
  };

  if (loading) return;
  return (
    <div className="h-14 w-full flex items-center flex justify-between px-3  bg-primary ">
      <div className=" flex gap-5 items-center *:text-white">
        <IoMenu className="text-white  text-xl" />
        <h2 className="uppercase  text-xl text-white">Taskeep</h2>
      </div>
      <div className="flex items-center">
        <label className="swap swap-rotate mr-3  bg-littleWhite shadow-md p-1 rounded-full ">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          {/* sun icon */}
          <svg
            className="swap-on h-7 w-7 fill-current "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off h-7 w-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        <div className="relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-white text-2xl ring-1 ring-secondary font-mono uppercase w-9 aspect-square rounded-full flex justify-center items-center bg-black"
          >
            {user?.displayName && user.displayName[0]}
          </button>
          <div
            className={`absolute top-14 right-3 rounded-md p-3 min-w-80 bg-white shadow-md  ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <h2>Name: {user?.displayName} </h2>
            <h2>Email: {user?.email} </h2>
            <button
              onClick={handleLogout}
              className="bg-black text-white p-2 w-full rounded-md mt-4"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
