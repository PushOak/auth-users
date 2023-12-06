import React, { useState } from "react";
import styles from "./auth.module.scss";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { AiOutlineMail } from "react-icons/ai";
import PasswordInput from "../../components/passwordInput/PasswordInput";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = () => {};

  const loginUser = () => {};

  return (
    <>
      <div className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <div className="--flex-center">
              <AiOutlineMail size={35} color="#999" />
            </div>
            <h2>Forgot Password</h2>

            <form onSubmit={loginUser}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Get Reset Password Email
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
