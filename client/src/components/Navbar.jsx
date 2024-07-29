import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import { toggleSidebar } from "../redux/slices/sidebarSlice";
import { useDispatch } from "react-redux";
import { Logo } from "../components";
import { SITE_NAME, DASHBOARD } from "../constants/NAVBAR";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text text-3xl">{DASHBOARD}</h4>
        </div>
        <div className="btn-container font-semibold text-2xl">{SITE_NAME}</div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
