import React from "react";
import "./header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const activeLink = ({ isActive }) => (isActive ? "active" : "");

export default function Header() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <nav>
          <div className="logo" onClick={goHome}>
            <MdLogin size={35} />
            <span>AUTH:USERS</span>
          </div>

          <ul className="home-links">
            <li className="--flex-fenter">
              <FaUserCircle size={20} />
              <p className="--color-white">Hi, Cat |</p>
            </li>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
            <li>
              <NavLink to="/profile" className={activeLink}>
                Profile
              </NavLink>
            </li>
            <li>
              <button className="--btn --btn-secondary">Logout</button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
