import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import "./style.css";
import Footer  from "../components/Footer/Footer";
import HeaderForm from "../components/HeaderForm/HeaderForm";

const Layout = () => {
  let getKey = React.useCallback((location, matches) => {
    let match = matches.find((m) => m.handle?.scrollMode);
    if (match?.handle?.scrollMode === "pathname") {
      return location.pathname;
    }
    return location.key;
  }, []);
  return (
    <>

      
      <HeaderForm/>
      <main className="main">
        <Outlet />
      </main>
     <Footer />
      <ScrollRestoration getKey={getKey} />
    </>
  );
};

export default Layout;