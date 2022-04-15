import { useRef, useState, useEffect } from "react";
import { GrCheckmark, GrClose, GrCircleInformation } from "react-icons/gr";
import axios from '../api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,32}$/;
const REGISTER_URL = '/register';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMessage("");
  }, [user, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMessage("Entrée invalide");
      return;
    }
    try {
        const response = await axios.post(REGISTER_URL, 
            JSON.stringify({ user, password }),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            });
            setSuccess(true);
            setUser('');
            setPassword('');
            setMatchPassword('');
    } catch (err) {
        if (!err?.response) {
            setErrMessage('Pas de réponse du serveur');
        } else if (err.response?.status === 409) {
            setErrMessage('Pseudo déjà utilisé');
        } else {
            setErrMessage("L'inscription a échoué")
        }
        errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Se connecter</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMessage ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {" "}
            {errMessage}{" "}
          </p>
          <h1>AUTHENTIFICATION</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username :
              <span className={validName ? "valid" : "hide"}>
                <GrCheckmark />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <GrClose />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <GrCircleInformation />
              4 à 24 caractères. <br />
              Doit commencer par une lettre. <br />
              Les lettres, nombres, underscores et tirets sont acceptés.
            </p>

            <label htmlFor="password">
              Password :
              <span className={validPassword ? "valid" : "hide"}>
                <GrCheckmark />
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
                <GrClose />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                passwordFocus && !validPassword ? "instructions" : "offscreen"
              }
            >
              <GrCircleInformation />
              8 à 32 caractères. <br />
              Doit contenir au moins une lettre majuscule, une lettre minuscule,
              un nombre et un caractère spécial. <br />
              Caractères acceptés :{" "}
              <span aria-label="point d'exclamation">!</span>
              <span aria-label="arobase">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar">$</span>
              <span aria-label="pourcentage">%</span>
            </p>

            <label htmlFor="confirm_password">
              Confirm Password :
              <span className={validMatch && matchPassword ? "valid" : "hide"}>
                <GrCheckmark />
              </span>
              <span
                className={validMatch || !matchPassword ? "hide" : "invalid"}
              >
                <GrClose />
              </span>
            </label>
            <input
              type="password"
              id="confirm_password"
              onChange={(e) => setMatchPassword(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <GrCircleInformation />
              Doit correspondre au premier mot de passe.
            </p>

            <button
              disabled={
                !validName || !validPassword || !validMatch ? true : false
              }
            >
              S'inscrire
            </button>
          </form>
          <p>
            Vous avez déjà un compte ? <br />
            <span className="signInLink">
              {/*route pour s'authentifier */}
              <a href="#">S'authentifier</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
