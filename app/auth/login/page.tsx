import React from "react";
import LoginMain from "./main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Drive PDF",
};

function LoginPage() {
  return (
    <>
      <LoginMain />
    </>
  );
}

export default LoginPage;
