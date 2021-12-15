import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const newEnteredPassword = newPasswordInputRef.current.value;

    fetch(`${process.env.REACT_APP_UPDATE}`, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: newEnteredPassword,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      history.replace("/");
      return res.json().then((res) => {
        console.log(res);
      });
    });
  };
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordInputRef}
          minLength="7"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
