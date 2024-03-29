import React from "react";
import style from "./PageNav.module.css";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
const PageNav = () => {
  return (
    <nav className={style.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/login"} className={style.ctaLink}>
            login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
