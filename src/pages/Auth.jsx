import { useState }
from "react";

import {

  createUserWithEmailAndPassword,

  signInWithEmailAndPassword,

} from "firebase/auth";

import { auth }
from "../firebase";

import "../styles/dashboard.css";

function Auth() {

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    isLogin,
    setIsLogin,
  ] = useState(true);

  const [
    loading,
    setLoading,
  ] = useState(false);

  /* =========================
     HANDLE AUTH
  ========================= */

  const handleAuth =
    async () => {

      try {

        setLoading(true);

        if (isLogin) {

          await
          signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        } else {

          await
          createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
        }

      } catch (error) {

        alert(
          error.message
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1>
          💸 Expense Tracker
        </h1>

        <p className="auth-subtitle">

          Smart Personal
          Finance Dashboard

        </p>

        <h2>

          {
            isLogin
              ? "Welcome Back"
              : "Create Account"
          }

        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="auth-btn"
          onClick={handleAuth}
        >

          {
            loading
              ? "Loading..."
              : isLogin
              ? "Login"
              : "Create Account"
          }

        </button>

        <p
          className="switch-auth"
          onClick={() =>
            setIsLogin(
              !isLogin
            )
          }
        >

          {
            isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"
          }

        </p>

      </div>

    </div>
  );
}

export default Auth;