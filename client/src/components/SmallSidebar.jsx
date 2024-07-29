import Wrapper from "./../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { Logo, NavLinks } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/slices/sidebarSlice";

const SmallSidebar = () => {
  const dispatch = useDispatch();
  const { showSidebar } = useSelector((state) => state.sidebarStatus);

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
