import React, { useState } from "react";
import "./profile.scss";
import Card from "../../components/card/Card";
import profileImg from "../../assets/avatarr.png";
import PageMenu from "../../components/pageMenu/PageMenu";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const initialState = {
  name: "Dima",
  email: "dima@gmail.com",
  phone: "",
  bio: "",
  photo: "",
  role: "",
  isVerified: false,
};

export default function Profile() {
  useRedirectLoggedOutUser("/login");
  const [profile, setProfile] = useState(initialState);

  const handleImageChange = () => {};

  const handleInputChange = () => {};

  return (
    <>
      <section>
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              <>
                <div className="profile-photo">
                  <div>
                    <img src={profileImg} alt="profile-pic" />
                    <h3>Role: Subscriber</h3>
                  </div>
                </div>
                <form>
                  <p>
                    <label>Change Photo:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </p>

                  <p>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                    />
                  </p>

                  <p>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="name"
                      value={profile.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </p>

                  <div>
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                    />

                    <p>
                      <label>Bio:</label>
                      <textarea
                        name="bio"
                        cols="30"
                        rows="10"
                        value={profile.bio}
                        onChange={handleInputChange}
                      ></textarea>
                    </p>
                  </div>

                  <button className="--btn --btn-primary --btn-block">
                    Update Profile
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
