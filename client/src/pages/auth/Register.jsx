import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { TiUserAddOutline } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authService";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

  const { name, email, password, password2 } = formData;

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Check lower and uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNumbers(true);
    } else {
      setNumbers(false);
    }
    // Check for special characters
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSpecialCharacter(true);
    } else {
      setSpecialCharacter(false);
    }
    // Check for password length
    if (password.length > 5) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
  }, [password]);

  const registerUser = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required!");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters!");
    }
    if (!validateEmail) {
      return toast.error("Please enter a valid email!");
    }
    if (password !== password2) {
      return toast.error("Passwords don't match!");
    }

    const userData = {
      name,
      email,
      password,
    };

    console.log(userData);
  };

  return (
    <>
      <div className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <div className="--flex-center">
              <TiUserAddOutline size={35} color="#999" />{" "}
            </div>
            <h2>Register</h2>

            <form onSubmit={registerUser}>
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
                placeholder="Confirm password"
                value={password2}
                onChange={handleInputChange}
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Cannot paste into input field");
                  return false;
                }}
              />

              {/* Password Strength */}
              <Card cardClass={styles.group}>
                <ul className="form-list">
                  <li>
                    <span className={styles.indicator}>
                      {switchIcon(upperCase)}
                      &nbsp; Lowercase & Uppercase
                    </span>
                  </li>
                  <li>
                    <span className={styles.indicator}>
                      {switchIcon(numbers)}
                      &nbsp; Number(0-9)
                    </span>
                  </li>
                  <li>
                    <span className={styles.indicator}>
                      {switchIcon(specialCharacter)}
                      &nbsp; Special characters (!@#$%^&*)
                    </span>
                  </li>
                  <li>
                    <span className={styles.indicator}>
                      {switchIcon(passwordLength)}
                      &nbsp; At least 6 characters
                    </span>
                  </li>
                </ul>
              </Card>

              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>

            <span className={styles.register}>
              <Link to="/">Home</Link>
              <p> &nbsp; Already have an account? &nbsp; </p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
      </div>
    </>
  );
}
