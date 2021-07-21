import React, { useState } from "react";
import "./Navbar.css";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavDropdown } from "react-bootstrap";
import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router";
import { getUsername, deleteTokens } from "../../auth/AuthToken";

const USER_NAME = "username";
const TOKEN_NAME = "token";

function Navbar() {
  const [click, setClick] = useState(false);
  const history = useHistory();
  const apolloClient = useApolloClient();

  const handleClick = () => {
    setClick(!click);
  };
  const closeMenu = () => {
    setClick(false);
  };

  const handleSignout = async () => {
    setClick(false);
    await apolloClient.clearStore();
    deleteTokens();
    history.push("/");
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/user/getuser">Users list</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/product/tags">Product tag</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={handleSignout}>
        <a href="/">Log out</a>
      </Menu.Item>
    </Menu>
  );

  const username = getUsername();
  console.log(username);
  return (
    <>
      <nav className="navbar">
        <div className="navbarContainer">
          <div className="menuIcon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          {username ? (
            <ul className="navMenu active">
              <li className="navItems">
                <a href="/" className="navLinks" onClick={closeMenu}>
                  Home
                </a>
              </li>
              <li className="navItems">
                <NavDropdown
                  className="navDropdown"
                  title={<span className="navItemDropDown">{username}</span>}
                >
                  <a href="/user/getuser" className="navLinksDropdown">
                    Users list
                  </a>
                  <a href="/product/tags" className="navLinksDropdown">
                    Product tags
                  </a>
                  <a
                    href="/user/login"
                    className="navLinksDropdown"
                    onClick={handleSignout}
                  >
                    Sign out
                  </a>
                </NavDropdown>
              </li>
            </ul>
          ) : (
            <ul className="navMenu active">
              <li className="navItems">
                <a href="/" className="navLinks" onClick={closeMenu}>
                  Home
                </a>
              </li>
              <li className="navItems">
                <a href="/user/login" className="navLinks" onClick={closeMenu}>
                  Sign in
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
