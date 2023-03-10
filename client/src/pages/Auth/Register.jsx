import  {  useEffect, useRef, useState} from 'react';
import regex from '../../other/regex';
import axios from '../../other/axios';
import './Auth.styles.scss'
const REGISTER_URL = '/users'; 

const Registerpage = () => {
    const userRef = useRef(null);
    const errRef = useRef(null);

    const [check, setCheck] = useState(false);
    const [user, setUser] = useState('');
    const [userStart, setUserStart] = useState(false);
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [emailStart, setEmailStart] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [pwdStart, setPwdStart] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMachPwd] = useState(false);
    const [matchpwdStart, setMatchPwdStart] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
      userRef.current.focus();
    },[])

    useEffect(() => {
      setValidName(regex.USER.test(user));
    },[user])
    useEffect(() => {
      setValidEmail(regex.EMAIL.test(email));
    },[email])
    useEffect(() => {
      const result = regex.PWD.test(pwd);
      setValidPwd(result);
      const match = pwd === matchPwd;
      setValidMachPwd(match);
    },[pwd, matchPwd])

    useEffect(() => {
      setErrMsg('');
    },[pwd, user, matchPwd])

    const submitfunc = async (e) => {
      e.preventDefault();
      if (!regex.USER.test(user) || !regex.PWD.test(pwd) || !regex.EMAIL.test(email)){
        setErrMsg("Nepareizs pieteikums!");
        setSuccess(false);
        return;
      }
      try{
        await axios.post(
          REGISTER_URL,
          JSON.stringify({
            user_name: user,
            user_email: email,
            user_password: pwd
          }),
          {
            headers:{'Content-Type': 'application/json'},
            withCredentials: true
          }
          );
          setSuccess(true);
      } catch (err) {
        if (!err?.response){
          setErrMsg('Nav savienojuma ar serveri!');
        } else if (err.response?.status === 409) {
          setErrMsg(err.response.data.mesage)
        }else{
          setErrMsg("Registr??cija neizdev??s");
        }
      }
    }
  if(success) return (
        <section className='postpost_outer'>
        <div className='inerlogin'>
        <h2>Registr????an??s pabeigta</h2>
        <a href="login" className="login_signup xmazs">Ien??c</a>
        </div>
      </section>
  )
  return (
      <section className='postpost_outer'>
      <div className='inerlogin'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscrean"} aria-live="assertive">{errMsg}</p>
      <h2>Registr??jies</h2>
      <form className='mazs' onSubmit={submitfunc}>
      <label htmlFor="username" className='offscreen'>
          V??rds:
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autocomplete="new-password"
          className={!validName && !userFocus && userStart ? "error_input" : "normal_input"}
          onChange={(e) => setUser(e.target.value)}
          required
          placeholder='Lietot??jv??rds'
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => {setUserFocus(true);setUserStart(true)}}
          onBlur={() => setUserFocus(false)}
        ></input>
        <p id="uidnote" className={userFocus && !validName ? "instructions" : "offscreen"}>
          Lietot??jv??rdam j??b??t no 2 l??dz 39 simboliem garai<br></br> 
          Burti, cipari un domuz??mes ir at??autas
        </p>
        <label htmlFor="username" className='offscreen'>
          E-pasts:
        </label>
        <input
          type="email"
          id="username"
          autocomplete="new-password"
          className={!validEmail && !emailFocus && emailStart ? "error_input" : "normal_input"}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='E-pasts'
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => {setEmailFocus(true);setEmailStart(true)}}
          onBlur={() => setEmailFocus(false)}
        ></input>
        <p id="uidnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
          E-pastam j??b??t no 2 l??dz 39 simboliem garai<br></br> 
          Burti, cipari un domuz??mes ir at??autas
        </p>
        <label htmlFor="password" className='offscreen'>
          Parole:
          <span className={validPwd ? "valid" : "invalid"}>
          &#10006;
          </span>
          <span className={validPwd || !pwd ? "hide" : "ivalid"}>
          &#10004;
          </span> 
        </label>
        <input 
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          className={!validPwd && pwdStart ? "error_input" : "normal_input"}
          placeholder='Parole'
          autocomplete="new-password"
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => {setPwdFocus(true);setPwdStart(true)}}
          onBlur={() => setPwdFocus(false)}
        ></input> 
        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
          Parolei j??b??t no 2 l??dz 39 simboliem garai<br></br> 
          Burti, cipari un domuz??mes ir at??autas
          Pie??aujamie speci??lie simboli:
          <span aria-label='izsaukuma z??me'>!</span>
          <span aria-label='et z??me'>@</span>
          <span aria-label='rest??tes z??me'>#</span>
          <span aria-label='dol??ra z??me'>$</span>
          <span aria-label='procenta z??me'>%</span>
        </p>
        <label htmlFor="confirm_pwd" className='offscreen'>
            Apstriprin??t paroli:
            <span className={validMatchPwd && matchPwd ? "valid" : "hide"}>
              &#10006;
            </span>
            <span className={validMatchPwd || !matchPwd ? "hide" : "invalid"}>
              &#10004;
            </span>
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          className={!validMatchPwd && matchpwdStart ? "error_input" : "normal_input"}
          placeholder='Atk??rtota parole'
          aria-invalid={validMatchPwd ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => {setMatchPwdFocus(true);setMatchPwdStart(true)}}
          onBlur={() => setMatchPwdFocus(false)}
          ></input>
        <p id="confirmnote" className={matchPwdFocus && (!validMatchPwd || matchPwd === "") ? "instructions" : "offscreen"}>
          J??sakr??t ar otru paroli
        </p>
        <div className="login_lower">
          <div className="login_lower_iner">
              <input 
                type="checkbox" 
                id="checkrules" 
                required 
                aria-invalid={validMatchPwd ? "false" : "true"}
                onChange={() => setCheck(!check)}
                ></input>
               <label className='xmazs' htmlFor='checkrules'>Es piekr??tu <a href='/'>notiekumiem</a> un <a href='/'>priv??tuma politikai</a></label>
          </div>
        </div>
        <button disabled={!validName || !validPwd  || !validMatchPwd || !check ? true : false} className="login_submit mazs">
          Re??istr??ties
        </button>
        <a href="login" className="login_signup xmazs">Esi jau re??istr??jies? Ien??c</a>
      </form>
      </div>
    </section>
  )
}

export default Registerpage