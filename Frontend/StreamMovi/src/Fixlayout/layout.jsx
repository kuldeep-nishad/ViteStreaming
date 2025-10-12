import { Outlet } from "react-router-dom";
import SideNavbar  from "../Header/SideNavbar";
import { Footer } from "../Footer/FooterComp";



const Layout = () => {
  return (
   <div className="flex flex-col min-h-screen">
  <SideNavbar />          {/* fixed sidebar */}
  <div className="ml-16 flex-1 bg-gray-100">
    <Outlet />            {/* Homepage, Detail, etc. */}
  </div>
</div>

  );
};




export default Layout;
