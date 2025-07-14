import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import { AUTH_PATH } from "constant";

//          component : layout           //
export default function Container() {
    //          state : 현재 페이지의 path name         //
    const { pathname } = useLocation();

    //          render : layout 렌더링          //
    return (
        <>
            <Header />
            <Outlet />
            {pathname !== AUTH_PATH() && <Footer />}
        </>
    );
}
