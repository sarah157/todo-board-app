import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/auth-context";
import { Navigate, useLocation } from "react-router-dom";

import * as auth from "../services/authService";

const Auth = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const { uid } = useAuth();
  const [mode, setMode] = useState(state?.mode || "Sign In");
  const [error, setError] = useState(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  useEffect(() => {
    setError(null);
  }, []);

  const toggleModeHandler = (mode) => {
    setMode(mode);
    setError(null);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "Sign In") {
      auth
        .signIn(emailRef.current.value, passRef.current.value)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      auth
        .signUp(emailRef.current.value, passRef.current.value)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  };

  const handleGoogleSign = (e) => {
    e.preventDefault();
    setError(null);
    auth
      .googleAuth()
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  if (uid) {
    return <Navigate to={state?.path || "/home"} />;
  }
  return (
    <div className="bg-gray-100 h-full pt-7">
      <div className="p-2 border mx-auto bg-white max-w-sm items-center">
        <div className="text-center font-thin mb-4">
          <p className="mt-3 mb-7 font-semibold">WELCOME!</p>
          <p>Please enter your email and password</p>
          </div>

          <form className="flex flex-col gap-y-3" onSubmit={submitFormHandler}>
            <input
              className="p-0.5 bg-gray-100"
              placeholder="email"
              ref={emailRef}
              type="email"
              name="email"
            />
            <input
              className="p-0.5 bg-gray-100"
              placeholder="password"
              ref={passRef}
              type="password"
              name="password"
            />

            <button className="p-1 bg-gray-300 rounded-md focus:outline-none hover:bg-gray-400">
              {loading ? "Please wait..." : mode}
            </button>
          </form>
          <div className="h-4">
            {error && (
              <p className="text-center text-sm mt-1 text-red-500">{error}</p>
            )}
          </div>
 
        <div className="my-6 text-center w-full flex border-b">
          <span className=" -mb-2 mx-auto bg-white px-1 text-sm font-light text-gray-400">
            or
          </span>
        </div>
        <button
          className="p-2 my-6 bg-blue-500 hover:bg-blue-600 text-white w-full rounded-md"
          onClick={handleGoogleSign}
        >
          {mode} with Google
        </button>
      </div>
      <div className="flex font-thin text-sm mt-2 justify-center">
        {mode === "Sign In" && (
          <p>
            Don't have an account?
            <span
              className="ml-1 underline cursor-pointer"
              onClick={() => toggleModeHandler("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        )}
        {mode === "Sign Up" && (
          <p>
            Already have an account?
            <span
              className="ml-1 underline cursor-pointer"
              onClick={() => toggleModeHandler("Sign In")}
            >
              Sign In
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
