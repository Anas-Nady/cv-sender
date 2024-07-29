import Wrapper from "./../assets/wrappers/BigSidebar";
import { Logo, NavLinks } from "../components";
import { useSelector } from "react-redux";

const BigSidebar = () => {
  const { showSidebar } = useSelector((state) => state.sidebarStatus);

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header className="flex justify-center items-center">
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
