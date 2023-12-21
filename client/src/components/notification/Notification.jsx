import React from "react";
import "./notification.scss";
import { useDispatch } from "react-redux";
import {
  RESET,
  sendVerificationEmail,
} from "../../redux/features/auth/authSlice";

export default function Notification() {
  const dispatch = useDispatch();

  const resendEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET());
  };

  return (
    <>
      <div className="container">
        <div className="alert">
          <p>
            <b>Messsage:</b> &nbsp;
          </p>
          <p>
            To verify your account, check your email for a verification link.
            &nbsp;
          </p>
          <p className="v-link" onClick={resendEmail}>
            <b>Resend Link</b>
          </p>
        </div>
      </div>
    </>
  );
}
