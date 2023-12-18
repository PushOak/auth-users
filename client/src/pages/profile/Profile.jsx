import React, { useEffect, useState } from "react";
import "./profile.scss";
import Card from "../../components/card/Card";
import profileImg from "../../assets/avatarr.png";
import PageMenu from "../../components/pageMenu/PageMenu";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

export default function Profile() {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
    );
    
    const initialState = {
      name: user?.name || "",
      email: user?.mail || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
      photo: user?.photo || "",
    role: user?.role || "",
    isVerified: user?.isVerified || false,
  };
  
  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleImageChange = () => {};

  const handleInputChange = () => {};

  return (
    <>
      <section>
        <div className="container">
          {isLoading && <Loader />}
          <PageMenu />
          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              <>
                <div className="profile-photo">
                  <div>
                    <img src={profile?.photo} alt="profile-pic" />
                    <h3>Role: {profile.role}</h3>
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
                      value={profile?.name}
                      onChange={handleInputChange}
                    />
                  </p>

                  <p>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="name"
                      value={profile?.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </p>

                  <div>
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile?.phone}
                      onChange={handleInputChange}
                    />

                    <p>
                      <label>Bio:</label>
                      <textarea
                        name="bio"
                        cols="30"
                        rows="10"
                        value={profile?.bio}
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
