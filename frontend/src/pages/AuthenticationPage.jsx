import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { SignupForm } from "../components/signup-form";
import { LoginForm } from "../components/login-form";

export default function AuthenticationPage() {
  const { type } = useParams();

  if (type !== "login" && type !== "signup") {
    return <Navigate to="/error" replace />;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {type === "login" ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}
