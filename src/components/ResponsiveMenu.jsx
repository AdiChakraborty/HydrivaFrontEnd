import { FaUserCircle } from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { defaultProfileImg } from "../constants";

function ResponsiveMenu({ openNav, setOpenNav, profileFile }) {
  const navigation = useNavigate()
  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed top-0 bottom-0 z-20 flex h-screen w-[75%]
     flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}
    >
      <div>
        <div className=" flex items-center justify-start gap-3">
          {profileFile ? (
            <div>
              <img
                src={
                  profileFile
                    ? typeof profileFile === "object"
                      ? URL.createObjectURL(profileFile)
                      : profileFile
                    : defaultProfileImg
                }
                alt=""
                className="h-[50px] w-[5x0px] rounded-[50%] bg-contain cursor-pointer"
                onClick={() => navigation("/profile")}
              />
            </div>
          ) : (
            <FaUserCircle size={50} />
          )}
          <div>
            <h1>Hello</h1>
            {/* <h1 className="text-sm text-slate-500">Primium User</h1> */}
          </div>
        </div>
        <nav className="mt-5">
          <ul className="flex flex-col gap-7 text-xl font-semibold">
            <Link
              to={"/"}
              onClick={() => setOpenNav(false)}
              className="cursor-pointer "
            >
              <li>Home</li>
            </Link>
            <Link
              to={"/products"}
              onClick={() => setOpenNav(false)}
              className="cursor-pointer"
            >
              <li>Products</li>
            </Link>
            <Link
              to={"/about"}
              onClick={() => setOpenNav(false)}
              className="cursor-pointer"
            >
              <li>About</li>
            </Link>
            <Link
              to={"/contact"}
              onClick={() => setOpenNav(false)}
              className="cursor-pointer"
            >
              <li>Contact</li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ResponsiveMenu;
