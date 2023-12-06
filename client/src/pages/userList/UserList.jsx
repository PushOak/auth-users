import React from "react";
import "./userList.scss";
import PageMenu from "../../components/pageMenu/PageMenu";
import UserStats from "../../components/userStats/UserStats";

export default function UserList() {
  return (
    <>
      <section>
        <div className="container">
          <PageMenu />
          <UserStats />
        </div>
      </section>
    </>
  );
}
