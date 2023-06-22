import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLightBulb, HiLightBulb} from "react-icons/hi";
import LobbyLogo from "../../Multimedia/Logo Lobbylair.gif";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Redux/actions";
import SearchBar from "../SearchBar/SearchBar";

function NavItem({ href, text }) {
  return (
    <NavLink
      to={href}
      className="text-white text-lg font-bold hover:text-gray-300"
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

  const user = useSelector((state) => state.user);

  const id = user.id;

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
        <div className="flex items-center gap-[2.5rem]">
          <NavLink
            to="/home"
            className="w-[50px] h-[50px] bg-white rounded-full border-2 border-white inline-block overflow-hidden"
          >
            <img src={LobbyLogo} alt="LOBBYL" className="scale-125 flex items-center justify-center" />
          </NavLink>
          <SearchBar />
        </div>
        <div className="flex items-center gap-6 relative">
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
          </div>
          <NavItem href="/home" text="Home" />
          <NavItem href="/payment" text="Payment" />
          <NavItem href="/favorites" text="Favorites" />
          <div className="relative">
            <img
              src="https://source.unsplash.com/64x64/?person"
              alt=""
              width={40}
              height={40}
              style={{ borderRadius: "50%", cursor: "pointer" }}
              onClick={handleMenuToggle}
            />
            {showMenu && (
              <ul className="absolute top-16 right-0 bg-white p-1 rounded-lg  shadow-md border-2 border-gray-300 z-10 min-w-[10rem] flex flex-col gap-1">
                <li>
                  <ProfileItem 
                  href={`/profile/${id}`} 
                  text="Profile"
                  onClick={handleProfileClick} 
                />
                </li>
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

export default NavBar;
