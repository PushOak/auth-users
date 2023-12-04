import React from "react";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { BiLogIn } from "react-icons/bi";

export default function Login() {
  return (
    <>
      <div className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <div className="--flex-center">
              <BiLogIn size={35} color="#999" />
            </div>
            <h2>Login</h2>
            <div className="--flex-center">
              <button className="--btn --btn-google">Login With Google</button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
