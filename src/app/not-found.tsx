import Link from "next/link";
import React from "react";
import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <img width={400} src="/images/404Image.jpg" alt="not found image" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <h3>이 페이지는 존재하지 않습니다. 다른 페이지를 검색해 보세요.</h3>
        </div>
        <div>
          <Link href="/">홈으로</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
