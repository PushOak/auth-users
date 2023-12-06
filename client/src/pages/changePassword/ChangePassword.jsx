import React, { useState } from "react";
import "./changePassword.scss";
import Card from "../../components/card/Card";
import profileImg from "../../assets/avatarr.png";
import PageMenu from "../../components/pageMenu/PageMenu";
import PasswordInput from "../../components/passwordInput/PasswordInput";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

export default function ChangePassword() {
  const [formData, setFormData] = useState(initialState);

  const { oldPassword, password, password2 } = formData;

  const handleInputChange = () => {};

  return (
    <>
      <section>
        <div className="container">
          <PageMenu />
          <h2>Change Password</h2>
          <div className="--flex-start change-password">
            <Card cardClass={"card"}>
              <>
                <form>
                  <p>
                    <label>Current Password:</label>
                    <PasswordInput
                      placeholder="Old Password"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={handleInputChange}
                    />
                  </p>

                  <p>
                    <label>New Password:</label>
                    <PasswordInput
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </p>

                  <p>
                    <label>Cofirm New Password:</label>
                    <PasswordInput
                      placeholder="Confirm Password"
                      name="password2"
                      value={password2}
                      onChange={handleInputChange}
                    />
                  </p>

                  <button className="--btn --btn-primary --btn-block">
                    Change Password
                  </button>
                </form>
              </>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
