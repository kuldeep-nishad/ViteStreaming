import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { SiThemoviedatabase } from "react-icons/si"; // import the icon
import { useNavigate } from "react-router-dom";
import "../CSS/SideNavbar.css";

const SideNavbar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", icon: <FaHome />, link: "/" },
    { name: "Search", icon: <IoSearch />, link: "/search" },
    { name: "Account", icon: <FaUser />, link: "/Account" },
  ];

  const handleClick = (link) => {
    if (link === "/account" && !localStorage.getItem("token")) {
      navigate("/Account");
    } else {
      navigate(link);
    }
  };

  return (
    <div className="side-navbar fixed top-0 left-0 h-screen w-16 flex flex-col justify-between z-50">

      <div>
        <div className="logo inline-flex size-16 items-center justify-center">
          {/* Replace L with the movie database icon */}
          <SiThemoviedatabase className="text-4xl text-yellow-400" />
        </div>

        <div className="mt-4 border-t border-gray-100">
          <ul className="space-y-2 px-2 py-4">
            {menuItems.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => handleClick(item.link)}
                  className="group relative flex justify-center rounded-md px-3 py-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600 w-full"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="invisible absolute start-full top-1/2 ms-3 -translate-y-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:visible">
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logout */}
      <div className="logout-section sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="group relative flex justify-center rounded-md px-3 py-2 text-gray-500 hover:bg-red-50 hover:text-red-600 w-full"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="invisible absolute start-full top-1/2 ms-3 -translate-y-1/2 whitespace-nowrap rounded bg-red-600 px-2 py-1 text-xs text-white group-hover:visible">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;

