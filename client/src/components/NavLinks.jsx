import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { toggleSidebar } from "../redux/slices/sidebarSlice";
import { useDispatch } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { LOGOUT } from "./../constants/NAVBAR_LINKS";

const NavLinks = ({ isBigSidebar }) => {
  const dispatch = useDispatch();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link min-w[200px] mx-auto flex gap-3 text-lg font-semibold"
            onClick={isBigSidebar ? null : () => dispatch(toggleSidebar())}
            end
          >
            <span className="icon">{icon}</span>
            <span>{text}</span>
          </NavLink>
        );
      })}
      <button
        type="submit"
        className="nav-link min-w[200px] mx-auto flex gap-3 text-lg font-semibold border-t-2"
        disabled
      >
        <span className="icon">{<CiLogout />}</span>
        <span>{LOGOUT}</span>
      </button>
    </div>
  );
};
export default NavLinks;
