import React from "react";
import "./header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { RESET, logout } from "../../redux/features/auth/authSlice";
import { ShowOnLogOut, ShowOnLogin } from "../protect/hiddenLink";

const activeLink = ({ isActive }) => (isActive ? "active" : "");

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    navigate("/");
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
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
            <ShowOnLogin>
              <li className="--flex-fenter">
                <FaUserCircle size={20} />
                <p className="--color-white">Hi, Cat |</p>
              </li>
            </ShowOnLogin>
            <ShowOnLogOut>
              <li>
                <button className="--btn --btn-primary" onClick={logoutUser}>
                  <Link to="/login">Login</Link>
                </button>
              </li>
            </ShowOnLogOut>
            <ShowOnLogin>
              <li>
                <NavLink to="/profile" className={activeLink}>
                  Profile
                </NavLink>
              </li>
              <li>
                <button className="--btn --btn-secondary">Logout</button>
              </li>
            </ShowOnLogin>
          </ul>
        </nav>
      </header>
    </>
  );
}
