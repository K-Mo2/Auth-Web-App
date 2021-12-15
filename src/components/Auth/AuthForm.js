import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitSignupHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsloading(true);
    let url;
    if (isLogin) {
      url = `${process.env.REACT_APP_SIGNIN}`;
    } else {
      url =
      `${process.env.REACT_APP_SIGNUP}`;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsloading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((res) => {
            let errorMessage = "Authentication Failed";
            if (res.error) {
              errorMessage = res.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        console.log(data);
        authCtx.login(data.idToken, expirationTime);
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitSignupHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading ...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
