import React, { useState } from "react";
import styles from "./auth.module.scss";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { MdPassword } from "react-icons/md";
import PasswordInput from "../../components/passwordInput/PasswordInput";

const initialState = {
  password: "",
  password2: "",
};

export default function ResetPassword() {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;

  const handleInputChange = () => {};

  const loginUser = () => {};

  return (
    <>
      <div className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <div className="--flex-center">
              <MdPassword size={35} color="#999" />
            </div>
            <h2>Reset Password</h2>

            <form onSubmit={loginUser}>
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
                Reset Password
              </button>

              <div className={styles.links}>
                <p>
                  <Link to="/">- Home</Link>
                </p>
                <p>
                  <Link to="/register">Register -</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}
