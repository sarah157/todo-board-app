import React, { useState, useEffect, useRef } from "react";
import { HiViewGrid } from "react-icons/hi";
import { useAuth } from "../context/auth-context";
import { useAlert } from "../context/alert-context";
import { Navigate, useLocation } from "react-router-dom";
import { prettyError } from "../helpers";

import * as auth from "../services/authService";

const Auth = () => {
  const SIGN_IN = "Sign In";
  const SIGN_UP = "Sign Up";
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const { uid } = useAuth();
  const { setAlert } = useAlert();
  const [mode, setMode] = useState(SIGN_UP);
  const [error, setError] = useState(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  useEffect(() => {
    setError(null);
    setAlert(null);
  }, [setAlert]);

  const toggleModeHandler = (mode) => {
    setMode(mode);
    setError(null);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === SIGN_IN) {
      auth
        .signIn(emailRef.current.value, passRef.current.value)
        .catch((err) => setError(prettyError(err.message)))
        .finally(() => setLoading(false));
    } else {
      auth
        .signUp(emailRef.current.value, passRef.current.value)
        .catch((err) => setError(prettyError(err.message)))
        .finally(() => setLoading(false));
    }
  };

  const handleGoogleSign = (e) => {
    e.preventDefault();
    setError(null);
    auth
      .googleAuth()
      .catch((err) => setError(prettyError(err.message)))
      .finally(() => setLoading(false));
  };

  if (uid) {
    return <Navigate to={state?.path || "/home"} />;
  }
  return (
    <div className="bg-gray-100 h-full pt-7">
      <div className="p-2 border mx-auto bg-white max-w-sm items-center">
        <div className="text-center font-thin mb-4">
          <h4 className="mt-3 mb-7 font-thin uppercase flex justify-center items-center">
            <HiViewGrid className="mt-0.5 mb-1 mx-1" />
            <span>Boards</span>
          </h4>
          <p>Please enter your email and password</p>
        </div>

        <form className="flex flex-col gap-y-3" onSubmit={submitFormHandler}>
          <input
            className="py-1 px-2 bg-gray-100"
            placeholder="Email"
            ref={emailRef}
            type="email"
            name="email"
          />
          <input
            className="py-1 px-2 bg-gray-100"
            placeholder="Password"
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
        {mode === SIGN_IN && (
          <p>
            Don't have an account?
            <span
              className="ml-1 underline cursor-pointer"
              onClick={() => toggleModeHandler(SIGN_UP)}
            >
              Sign Up
            </span>
          </p>
        )}
        {mode === SIGN_UP && (
          <p>
            Already have an account?
            <span
              className="ml-1 underline cursor-pointer"
              onClick={() => toggleModeHandler(SIGN_IN)}
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
