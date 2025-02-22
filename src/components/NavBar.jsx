import useAuth from "../hooks/useAuth";
import ToastMessage from "./ToastMessage";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function NavBar() {
  const { user, logoutUser, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleLogout = () => {
    logoutUser().then(() => {
      ToastMessage("Logout successfully!", { icon: "success" });
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("class", theme);
  }, [theme]);

  const handleChangeTheme = () => {
    const newTheme = !localStorage.getItem("theme")
      ? "dark"
      : localStorage.getItem("theme") === "light"
      ? "dark"
      : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("class", newTheme);
  };

  if (loading) return;
  return (
    <div className="h-14 w-full flex items-center  justify-between px-3  bg-primary dark:bg-[#0f0f0f]">
      <div className=" flex gap-5 items-center *:text-white">
        {/* <IoMenu className="text-white  text-xl" /> */}
        <h2 className="uppercase  text-xl text-white  font-semibold">
          Taskeep
        </h2>
      </div>
      <div className="flex items-center">
        <label className="swap swap-rotate mr-3  bg-littleWhite dark:text-white dark:bg-littleBlack shadow-md p-1 rounded-full  text-2xl">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onChange={handleChangeTheme} />

          {/* sun icon */}
          <svg
            className="swap-on h-7 w-7 fill-current "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <MdLightMode />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off h-7 w-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <MdDarkMode />
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
