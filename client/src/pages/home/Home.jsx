import React from "react";
import "./home.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import loginImg from "../../assets/login.svg";

export default function Home() {
  return (
    <>
      <section className="container hero">
        <div className="hero-text">
          <h2>MERN Authentication</h2>
          <p>
            A powerful authentication and authorization system for user
            management
          </p>
          <p>
            Implementing User registration, authorizationm login, permissions,
            email notifications and etc. Testing contribution
          </p>
          <div className="hero-buttons --flex-start">
            <button className="--btn --btn-danger">Register</button>
            <button className="--btn --btn-primary">Login</button>
          </div>
        </div>

        <div className="hero-image">
          <img src={loginImg} alt="hero" />
        </div>
      </section>
    </>
  );
}
