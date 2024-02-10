import { Outlet, useNavigate } from "react-router-dom";
import Wrapper from "./../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar } from "../components";
import { toggleSidebar } from "../redux/slices/sidebarSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { showSidebar } = useSelector((state) => state.sidebarStatus);

  useEffect(() => {}, [navigateTo]);

  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default DashboardLayout;
