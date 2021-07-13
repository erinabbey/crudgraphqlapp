import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "src/actions/auth.action";

import "./Navbar.css";

function Navbar() {
  const { authProps } = useSelector((state) => state);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const dispatch = useDispatch();

  const router = useRouter();

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  const handleClick = () => {
    setClick(!click);
  };
  const closeMenu = () => {
    setClick(false);
  };

  const handleSignout = () => {
    setClick(false);
    dispatch(logout());
    router.push("/auth/signin");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbarContainer">
          <div className="menuIcon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className="navMenu active">
            <li className="navItems">
              <a href="/" className="nav" onClick={closeMenu}>
                Home
              </a>
            </li>
            {authProps.isSignedIn ? (
              <li className="navItems">
                <NavDropdown
                  className="navDropdown"
                  title={
                    <span className="navItemDropDown">
                      {authProps && authProps.user.full_name}
                    </span>
                  }
                  id="nav-dropdown"
                >
                  <a
                    href="/auth/signin"
                    className="navLinksDropdown"
                    onClick={handleSignout}
                  >
                    Sign out
                  </a>
                </NavDropdown>
              </li>
            ) : (
              <li className="navItems">
                <a href="/auth/signin" className="navLinks" onClick={closeMenu}>
                  Sign in
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
