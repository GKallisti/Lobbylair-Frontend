import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLightBulb, HiLightBulb } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import LobbyLogo from "../../Multimedia/Logo Lobbylair.gif";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Redux/actions";
import SearchBar from "../SearchBar/SearchBar";

function NavItem({ href, text }) {
  return (
    <NavLink
      to={href}
      className="text-white text-lg font-bold hover:text-gray-300"
      activeClassName="text-gray-300"
    >
      {text}
    </NavLink>
  );
}

function ProfileItem({ href, text, onClick }) {
  return (
    <NavLink
      to={href}
      className="text-black text-lg font-bold hover:opacity-80 duration-200"
      onClick={onClick}
    >
      {text}
    </NavLink>
  );
}

const NavBar = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const imageDef =
    "https://firebasestorage.googleapis.com/v0/b/lobbylair-pf.appspot.com/o/Logo.webp?alt=media&token=ea0389a0-f0d5-4d8b-a9b4-c11af490c453";

  const user = useSelector((state) => state.user);

  const id = user.id;
  const isAdmin = user.isAdmin;

  const handleThemeChange = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    if (theme) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
    document.body.setAttribute("data-theme", theme ? "dark" : "light");
  }, [theme]);

  const handleLogout = () => {
    try {
      localStorage.setItem("isAuthenticated", false);
      dispatch(logOut());
      navigate("/");
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleProfileClick = () => {
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  return (
    <nav className="bg-[#1f2937] p-[1rem] sticky">
      <div className="flex justify-between items-center max-w-[1050px] mx-auto">
        <div className="flex items-center gap-6">
          <NavLink
            to="/home"
            className="w-[50px] h-[50px] bg-white rounded-full border-2 border-white inline-block overflow-hidden"
          >
            <img
              src={LobbyLogo}
              alt="LOBBYL"
              className="scale-125 flex items-center justify-center"
            />
          </NavLink>
          <SearchBar />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-[0.5rem]">
            {theme ? (
              <HiOutlineLightBulb
                size={20}
                color="white"
                onClick={handleThemeChange}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <HiLightBulb
                size={20}
                color="white"
                onClick={handleThemeChange}
                style={{ cursor: "pointer" }}
              />
              
            )}
            <span className="text-white text-lg font-bold hover:text-gray-300">
              {theme ? "Light" : "Dark"}
              </span>
              <NavLink
              to="/chat"
              className="ml-2 flex items-center text-white text-lg font-bold hover:text-gray-300"
              activeClassName="text-gray-300"
              >
              <AiOutlineMessage size={20} />
              <span className="ml-1">Chat</span>
            </NavLink>
          </div>
          <NavItem href="/home" text="Home" className="hidden md:block" />
          <NavItem
            href="/subscription"
            text="Subscription"
            className="hidden md:block"
          />
          <NavItem href="/favorites" text="Favorites" className="hidden md:block" />
          <div className="relative">
            {user.image?.length > 1 ? (
              <img
                src={user.image}
                alt=""
                className={`rounded-[2rem] h-10 w-10 cursor-pointer`}
                onClick={handleMenuToggle}
              />
            ) : (
              <img
                src={imageDef}
                alt=""
                className={`rounded-[2rem] h-10 w-10 invert-[.25] cursor-pointer`}
                onClick={handleMenuToggle}
              />
            )}
            {showMenu && (
              <ul className="absolute top-12 right-0 bg-white p-1 rounded-lg  shadow-md border-2 border-gray-300 z-10 min-w-[10rem] flex flex-col gap-1">
                <li>
                  <ProfileItem
                    href={`/profile/${id}`}
                    text="Profile"
                    onClick={handleProfileClick}
                  />
                </li>
                {isAdmin === true && (
                  <li>
                    <ProfileItem
                      href={"/admindashboard"}
                      text="Dashboard"
                      onClick={handleProfileClick}
                    />
                  </li>
                )}
                <li>
                  <ProfileItem text="Log Out" onClick={handleLogout} />
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar