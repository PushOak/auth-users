import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function pageMenu() {
  return (
    <>
      <div>
        <nav className="--btn-google --p --mb">
          <ul className="home-links">
            <li>
              <NavLink to="/profile">
                Profile
              </NavLink>
            </li>

            <li>
              <NavLink to="/change-password">
                Change Password
              </NavLink>
            </li>

            <li>
              <NavLink to="/users">
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
