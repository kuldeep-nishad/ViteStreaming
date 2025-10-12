import { Outlet } from "react-router"
import { Footer } from "../Fixlayout/Footer/FooterComp"
import { Sidebar } from "../Fixlayout/Header/HeaderComp"

export const Layout =()=>{

   return(
    <>
    
    <Sidebar/>
    <Outlet/>
    <Footer/>


    </>
   )

    
}