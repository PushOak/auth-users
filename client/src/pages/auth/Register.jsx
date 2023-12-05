import React, { useState } from "react";
import styles from "./auth.module.scss";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { TiUserAddOutline } from "react-icons/ti";
import PasswordInput from "../../components/passwordInput/PasswordInput";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);

  const { name, email, password, password2 } = formData;

  const handleInputChange = () => {};

  const loginUser = () => {};

  return (
    <>
      <div className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <div className="--flex-center">
              <TiUserAddOutline size={35} color="#999" />{" "}
            </div>
            <h2>Register</h2>

            <form onSubmit={loginUser}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleInputChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleInputChange}
                required
              />

              <PasswordInput
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
              />

              <PasswordInput
                name="password2"
                placeholder="Conmfirm password"
                value={password2}
                onChange={handleInputChange}
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>

            <span className={styles.register}>
              <Link to="/">Home</Link>
              <p> &nbsp; Already have an account? &nbsp; </p>
              <Link to="/register">Login</Link>
            </span>
          </div>
        </Card>
      </div>
    </>
  );
}
